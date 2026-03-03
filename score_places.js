const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'web', 'data');
const parts = [
    path.join(dataDir, 'analyzed-places-part1.json'),
    path.join(dataDir, 'analyzed-places-part2.json'),
    path.join(dataDir, 'analyzed-places-part3.json'),
    path.join(dataDir, 'analyzed-places-part4.json'),
    path.join(dataDir, 'analyzed-places-part5.json')
];

const highKeywords = ['must', 'breathtaking', 'unreal', 'world class', 'best', 'incredible', 'amazing', 'perfect', 'insane', 'life changing', 'magic', 'סטודיו', 'חובה', 'מדהים', 'עוצר נשימה', 'הכי טוב', 'מושלם', 'טירוף', 'מרהיב', 'אייקוני', 'life changing experience', 'bucket list', 'heaven', 'iconic', 'legendary', 'unmissable', 'once in a lifetime', 'אגדי', 'פעם בחיים'];
const lowKeywords = ['crowded', 'expensive', 'touristy', 'overrated', 'skip', 'צפוף', 'יקר', 'עשן', 'תיירותי', 'תור ארוך', 'למרות', 'קשה להיכנס', 'מוגבלים', 'disappointing', 'mediocre', 'average', 'מאכזב', 'בינוני'];
const uniqueKeywords = ['unique', 'hidden gem', 'secret', 'authentic', 'אותנטי', 'נדיר', 'ייחודי', 'סודי', 'פחות מוכר', 'לא ידוע', 'אנדרגראונד', 'off the beaten path', 'local favorite', 'locals only', 'מקומיים', 'חבוי'];

const sentimentMap = {
    "חיובי מאוד": 10, "חיובי": 7, "מעורב": 4, "ניטרלי": 5, "שלילי": 1
};

function scorePlace(place) {
    let score = 65; // Lower base score to allow wider spread
    let reasons = [];

    const desc = (place.description || '').toLowerCase();
    const classReason = (place.classificationReason || '').toLowerCase();
    const combinedText = desc + " " + classReason;

    // --- High enthusiasm keywords ---
    let matchHigh = 0;
    highKeywords.forEach(kw => {
        if (combinedText.includes(kw)) matchHigh += 1;
    });
    if (matchHigh > 0) {
        // Escalating bonus: more matches = disproportionately higher score
        const bonus = matchHigh <= 2 ? matchHigh * 4 : 8 + (matchHigh - 2) * 3;
        score += bonus;
        reasons.push(`Contains ${matchHigh} highly enthusiastic keyword(s).`);
    }

    // --- Low / warning keywords ---
    let matchLow = 0;
    lowKeywords.forEach(kw => {
        if (combinedText.includes(kw)) matchLow += 1;
    });
    if (matchLow > 0) {
        score -= matchLow * 5;
        reasons.push('Contains words indicating crowds, high cost, or long lines.');
    }

    // --- Unique / hidden gem keywords ---
    let matchUnique = 0;
    uniqueKeywords.forEach(kw => {
        if (combinedText.includes(kw)) matchUnique += 1;
    });
    if (matchUnique > 0) {
        const bonus = matchUnique <= 2 ? matchUnique * 4 : 8 + (matchUnique - 2) * 3;
        score += bonus;
        reasons.push('Highlighted as a unique, hidden, or authentic gem.');
    }

    // --- Sentiment bonus ---
    const sentiment = (place.sentiment || '').trim();
    const sentimentVal = sentimentMap[sentiment];
    if (sentimentVal !== undefined) {
        if (sentimentVal >= 9) {
            score += 8;
            reasons.push('Very positive sentiment.');
        } else if (sentimentVal >= 7) {
            score += 4;
            reasons.push('Positive sentiment.');
        } else if (sentimentVal <= 2) {
            score -= 6;
            reasons.push('Negative sentiment.');
        }
    }

    // --- Mention count bonus ---
    const mentions = place.mentionCount || 1;
    if (mentions >= 5) {
        score += 6;
        reasons.push(`Mentioned ${mentions} times across sources.`);
    } else if (mentions >= 3) {
        score += 3;
        reasons.push(`Mentioned ${mentions} times.`);
    }

    // --- Source bonus ---
    if (place.source && place.source.includes('Reddit')) {
        score += 4;
        reasons.push('Reddit recommendation - tends to be more genuine.');
    } else if (place.source && place.source.includes('Google Maps')) {
        const ratingMatch = combinedText.match(/⭐ ?(4\.\d)/);
        if (ratingMatch) {
            const rating = parseFloat(ratingMatch[1]);
            if (rating >= 4.8) {
                score += 7;
                reasons.push(`Exceptional Google Maps rating (${rating}).`);
            } else if (rating >= 4.5) {
                score += 3;
                reasons.push(`Very good Google Maps rating (${rating}).`);
            }
        }
    } else if ((place.source && place.source.includes('TikTok')) || combinedText.includes('viral') || combinedText.includes('ויראלי')) {
        score += 3;
        reasons.push('Viral and highly popular on social media.');
    }

    // --- Classification bonus/penalty ---
    if (place.classification === 'מיינסטרים') {
        score -= 3;
        reasons.push('Mainstream attraction (likely more crowded).');
    } else if (place.classification === 'נישתי') {
        score += 5;
        reasons.push('Niche attraction (often a more unique/personal experience).');
    }

    // --- Description length bonus (more detailed = better curated) ---
    if (desc.length > 300) {
        score += 3;
        reasons.push('Detailed description available.');
    }

    // Clamp to [40, 100]
    if (score > 100) score = 100;
    if (score < 40) score = 40;

    return { score: Math.round(score), reasons: reasons.join(' ') };
}

// --- Process all parts ---
let totalPlaces = 0;
const scoreDist = {};

parts.forEach((partPath, i) => {
    let raw = fs.readFileSync(partPath, 'utf8');
    // Remove BOM if present
    if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);

    const data = JSON.parse(raw);

    data.places.forEach(place => {
        const result = scorePlace(place);
        place.gemini_score = result.score;
        place.gemini_score_reason = result.reasons;

        if (place.gemini_score >= 90) place.gemini_recommendation = "Highly Recommended";
        else if (place.gemini_score >= 80) place.gemini_recommendation = "Strongly Recommended";
        else if (place.gemini_score >= 70) place.gemini_recommendation = "Recommended";
        else place.gemini_recommendation = "Moderate Recommendation";

        // Track distribution
        const bucket = Math.floor(result.score / 10) * 10;
        scoreDist[bucket] = (scoreDist[bucket] || 0) + 1;
    });

    data.places.sort((a, b) => b.gemini_score - a.gemini_score);
    totalPlaces += data.places.length;

    // Count recommendations for this part
    const recs = {};
    data.places.forEach(p => {
        recs[p.gemini_recommendation] = (recs[p.gemini_recommendation] || 0) + 1;
    });

    console.log(`Part ${i + 1}: ${data.places.length} places | ${JSON.stringify(recs)}`);

    fs.writeFileSync(partPath, JSON.stringify(data, null, 4), 'utf8');
});

console.log(`\nTotal: ${totalPlaces} places scored`);
console.log('Score distribution:', JSON.stringify(scoreDist, Object.keys(scoreDist).sort((a, b) => a - b)));
