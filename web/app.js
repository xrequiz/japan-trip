// --- Configuration ---

const DATA_URL = './data/unified-places.json';

// Normalize granular/foreign categories into display categories
const CATEGORY_NORMALIZE = {
    // Foreign restaurant types → אוכל
    'Izakaya-restaurant': 'אוכל', 'Tonkatsu-restaurant': 'אוכל', 'Tempura-restaurant': 'אוכל',
    'Tempura-restaurant\u200f': 'אוכל',
    'Restaurant med japanske karryretter': 'אוכל', 'Restaurant med speciale i udon-nudler': 'אוכל',
    'Restaurant med "running sushi"': 'אוכל', 'Japansk restaurant': 'אוכל',
    'Yakiniku-restaurant': 'אוכל', 'Sushirestaurant': 'אוכל', 'Indisk restaurant': 'אוכל',
    'Soba-nuddelbar': 'אוכל', 'Restaurant': 'אוכל', 'Ramen-restaurant': 'אוכל',
    'Italiensk restaurant': 'אוכל', 'Halalrestaurant': 'אוכל', 'Yakitori-restaurant': 'אוכל',
    'Katsudon-restaurant': 'אוכל', 'Koreansk restaurant': 'אוכל', 'Fiskerestaurant': 'אוכל',
    'Teppanyaki-restaurant': 'אוכל', 'Nepalesisk restaurant': 'אוכל',
    'Restaurant, der serverer tempura donburi': 'אוכל', 'Bageri': 'אוכל',
    'Okonomiyaki-restaurant': 'אוכל', 'Pizzeria': 'אוכל',
    'Restaurant med kyllingeretter': 'אוכל', 'Kaiseki-restaurant': 'אוכל',
    'Friturestegt kylling-takeaway': 'אוכל', 'Shabu Shabu-restaurant': 'אוכל',
    'Japansk konfekturebutik': 'אוכל', 'Isbutik': 'אוכל',
    'Japansk restaurant med egnsretter fra Kyoto': 'אוכל', 'Monjayaki-restaurant': 'אוכל',
    'Asiatisk restaurant': 'אוכל', 'Sukiyaki- og Shabu Shabu-restaurant': 'אוכל',
    'Fugu-rstaurant': 'אוכל', 'Restaurant med takeaway': 'אוכל', 'Vegansk restaurant': 'אוכל',
    'Bod': 'אוכל', 'Dumpling-restaurant': 'אוכל',
    'Restaurant med speciale i vesterlandske retter med japansk tilsnit': 'אוכל',
    'Syokudo- og teishoku-restaurant': 'אוכל',
    '🍜 אוכל ומסעדות': 'אוכל', 'שוק / אוכל רחוב': 'אוכל',
    // Bars / nightlife → חיי לילה
    'Bar': 'חיי לילה', 'Vinbar': 'חיי לילה', 'Sportsbar': 'חיי לילה',
    'Pub': 'חיי לילה', 'Værtshus': 'חיי לילה',
    'Værtshus med udendørs udskænkning': 'חיי לילה', 'סיור / בירה': 'חיי לילה',
    // Nature / parks → טבע ופארקים
    'טבע': 'טבע ופארקים', 'פארק': 'טבע ופארקים',
    'פארק / טבע': 'טבע ופארקים', 'פארק / אגם': 'טבע ופארקים',
    'פארק / היסטוריה': 'טבע ופארקים', 'פארק / ספורט': 'טבע ופארקים',
    'פארק / חוף': 'טבע ופארקים', 'פארק / פריחה': 'טבע ופארקים',
    'פארק / סתיו': 'טבע ופארקים', 'פארק אורבני': 'טבע ופארקים',
    'פארק / תצפית': 'טבע ופארקים', 'פארק / נהר': 'טבע ופארקים',
    'פארק / יער': 'טבע ופארקים', 'פארק / נוף': 'טבע ופארקים',
    'פארק / אירועים': 'טבע ופארקים', 'פארק / פרחים': 'טבע ופארקים',
    'פארק / תרבות': 'טבע ופארקים', 'פארק / ים': 'טבע ופארקים',
    'פארק / משפחות': 'טבע ופארקים', 'פארק / גשר': 'טבע ופארקים',
    'פארק / אחוזה': 'טבע ופארקים', 'פארק / אורבני': 'טבע ופארקים',
    'פארק / מים': 'טבע ופארקים', 'פארק / זיכרון': 'טבע ופארקים',
    'פארק / טרופי': 'טבע ופארקים', 'פארק גג / בילוי': 'טבע ופארקים',
    'גן יפני': 'טבע ופארקים', 'גן בוטני': 'טבע ופארקים',
    'גן יפני (חינם)': 'טבע ופארקים', 'גן מעוצב': 'טבע ופארקים',
    'גן גג': 'טבע ופארקים', 'גן / היסטוריה': 'טבע ופארקים',
    'גן / אחוזה': 'טבע ופארקים', 'גן נושאי': 'טבע ופארקים',
    'גן חיות': 'טבע ופארקים',
    'טבע / פריחה': 'טבע ופארקים', 'טבע / השראה': 'טבע ופארקים',
    'טבע / צפרות': 'טבע ופארקים', 'טבע / שמורה': 'טבע ופארקים',
    'טבע עירוני': 'טבע ופארקים', 'אגם / טבע': 'טבע ופארקים',
    'טיילת / פארק': 'טבע ופארקים', 'היסטוריה / פארק': 'טבע ופארקים',
    'טבע, גנים ופנאי': 'טבע ופארקים', '🌿 טבע, גנים ופנאי': 'טבע ופארקים',
    // Temples → מקדש
    'מקדש / היסטוריה': 'מקדש', 'מקדש / טבע': 'מקדש', 'מקדש / צילום': 'מקדש',
    'מקדש / נוף': 'מקדש', 'מקדש / פריחה': 'מקדש', 'אדריכלות / דת': 'מקדש',
    // Museums → מוזיאון
    'מוזיאון / אמנות': 'מוזיאון', 'מוזיאון / היסטוריה': 'מוזיאון',
    'מוזיאון / מדע': 'מוזיאון', 'מוזיאון / ילדים': 'מוזיאון',
    'מוזיאון / ספורט': 'מוזיאון', 'מוזיאון / חלל': 'מוזיאון',
    'מוזיאון / אנימה': 'מוזיאון', 'מוזיאון / תעשייה': 'מוזיאון',
    'מוזיאון / עיצוב': 'מוזיאון', 'מוזיאון / הנדסה': 'מוזיאון',
    'מוזיאון / צילום': 'מוזיאון', 'מוזיאון / אדריכלות': 'מוזיאון',
    'מוזיאון / תרבות': 'מוזיאון', 'מוזיאון / רכבות': 'מוזיאון',
    'מוזיאון / מסורת': 'מוזיאון', 'מוזיאון / שעונים': 'מוזיאון',
    'מוזיאון / ארכיאולוגיה': 'מוזיאון', 'מוזיאון / אופנה': 'מוזיאון',
    'מוזיאון / בירה': 'מוזיאון', 'מוזיאון / דואר': 'מוזיאון',
    'מוזיאון / כסף': 'מוזיאון', 'מוזיאון / תקשורת': 'מוזיאון',
    'מוזיאון / בולים': 'מוזיאון', 'מוזיאון / גן': 'מוזיאון',
    'מוזיאון / ספרות': 'מוזיאון', 'מוזיאון / מנגה': 'מוזיאון',
    'מוזיאון / אומנות': 'מוזיאון', 'מוזיאון / תה': 'מוזיאון',
    'מוזיאון / טכנולוגיה': 'מוזיאון', 'מוזיאון / מוזיקה': 'מוזיאון',
    'מוזיאון / ספרים': 'מוזיאון', 'מוזיאון פתוח': 'מוזיאון',
    'גלריה / אמנות': 'מוזיאון', 'גלריה / עיצוב': 'מוזיאון',
    'גלריה / צילום': 'מוזיאון', 'גלריה / טכנולוגיה': 'מוזיאון',
    'גלריה / אדריכלות': 'מוזיאון', 'גלריה / אמנות רחוב': 'מוזיאון',
    'אמנות / טיילת': 'מוזיאון',
    // Shopping → שופינג
    'שופינג / אנימה': 'שופינג', 'שופינג / תרבות': 'שופינג',
    'שופינג / דמויות': 'שופינג', 'שופינג / אספנות': 'שופינג',
    'שופינג / ארכיטקטורה': 'שופינג', 'שופינג / אמנות': 'שופינג',
    'שופינג / עיצוב': 'שופינג', 'שופינג / זול': 'שופינג',
    'שופינג / פארם': 'שופינג', 'שופינג / ממתקים': 'שופינג',
    'שופינג / גיימינג': 'שופינג', 'שופינג / מנגה': 'שופינג',
    'שופינג / בילוי': 'שופינג', 'שופינג / טיילת': 'שופינג',
    'שופינג / ספרים': 'שופינג', 'רחוב / שופינג': 'שופינג',
    'קניון / בילוי': 'שופינג',
    // Observation → תצפית
    'תצפית / מגדל': 'תצפית', 'תצפית (חינם)': 'תצפית',
    'תצפית / נוף': 'תצפית', 'תצפית / גשר': 'תצפית',
    'תצפית / אמנות': 'תצפית', 'תצפית / שוק': 'תצפית',
    'תצפית / פריחה': 'תצפית',
    // History → היסטוריה ותרבות
    'אתר היסטורי': 'היסטוריה ותרבות', 'היסטוריה / פריחה': 'היסטוריה ותרבות',
    'רחוב / היסטוריה': 'היסטוריה ותרבות', 'רחוב / תרבות פופ': 'היסטוריה ותרבות',
    'רחוב / שוק': 'היסטוריה ותרבות', 'רחוב / שיטוט': 'היסטוריה ותרבות',
    'רחוב / וינטג\'': 'היסטוריה ותרבות', 'רחוב / בילוי': 'היסטוריה ותרבות',
    '⛩️ היסטוריה, דת ותרבות': 'היסטוריה ותרבות',
    // Attractions → אטרקציה
    'אטרקציות': 'אטרקציה', 'אטרקציה אורבנית': 'אטרקציה',
    'אטרקציה / דיגיטל': 'אטרקציה', 'אטרקציה / בילוי': 'אטרקציה',
    'אטרקציה / ספורט': 'אטרקציה', 'אטרקציה / ילדים': 'אטרקציה',
    'אטרקציה / תצפית': 'אטרקציה', 'אטרקציה / סרטים': 'אטרקציה',
    'אטרקציה / תרבות': 'אטרקציה', 'אטרקציה / אנימה': 'אטרקציה',
    'אטרקציה / פארק': 'אטרקציה', 'אטרקציה / גיימינג': 'אטרקציה',
    'אטרקציה / פסטיבל': 'אטרקציה', 'אטרקציה / ארמון': 'אטרקציה',
    'אטרקציה / גן': 'אטרקציה', 'אטרקציה / אמנות': 'אטרקציה',
    'אטרקציה / צילום': 'אטרקציה', 'אטרקציה / טכנולוגיה': 'אטרקציה',
    'אטרקציה / מד"ב': 'אטרקציה', 'אטרקציה / היסטוריה': 'אטרקציה',
    'אטרקציה / נסיעה': 'אטרקציה', 'אקווריום': 'אטרקציה',
    'אקווריום / מופע': 'אטרקציה',
    '🏯 אטרקציות ונוף': 'אטרקציה', '🎮 גיימינג ובידור': 'אטרקציה',
    '🎌 חוויות ייחודיות': 'אטרקציה',
    // Leisure → פנאי ורילקס
    '♨️ אונסן ורגיעה': 'פנאי ורילקס',
    // Other mapped categories
    'צילום': 'אטרקציה', '📸 ספוטים לצילום': 'אטרקציה',
    '🚉 תחבורה ונקודות ציון': 'אחר',
};

const sentimentMap = {
    "חיובי מאוד": 10, "חיובי": 8, "מעורב": 5, "ניטרלי": 6, "שלילי": 2
};

const CATEGORY_ICONS = {
    'אוכל': 'fa-solid fa-utensils text-orange-500',
    'תצפית': 'fa-solid fa-binoculars text-blue-500',
    'חיי לילה': 'fa-solid fa-martini-glass-citrus text-purple-500',
    'שופינג': 'fa-solid fa-bag-shopping text-pink-500',
    'מוזיאון': 'fa-solid fa-building-columns text-gray-500',
    'מקדש': 'fa-solid fa-vihara text-red-600',
    'טבע ופארקים': 'fa-solid fa-tree text-green-500',
    'פנאי ורילקס': 'fa-solid fa-spa text-teal-500',
    'אטרקציה': 'fa-solid fa-ticket text-yellow-500',
    'אטרקציות': 'fa-solid fa-ticket text-yellow-500',
    'היסטוריה ותרבות': 'fa-solid fa-landmark text-amber-700',
    'אחר': 'fa-solid fa-location-dot text-brand-pink'
};

const TAILWIND_COLOR_MAP = {
    'text-orange-500': '#f97316',
    'text-blue-500': '#3b82f6',
    'text-purple-500': '#a855f7',
    'text-pink-500': '#ec4899',
    'text-gray-500': '#6b7280',
    'text-red-600': '#dc2626',
    'text-green-500': '#22c55e',
    'text-teal-500': '#14b8a6',
    'text-yellow-500': '#eab308',
    'text-amber-700': '#b45309'
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1542051812871-75ec3120b607?q=80&w=800&auto=format&fit=crop";

const HOTELS = [
    { name: "המלון שלנו בטוקיו", lat: 35.6938, lng: 139.7034, city: "Shinjuku" },
    { name: "המלון שלנו באוסקה", lat: 34.6687, lng: 135.5013, city: "Namba" },
    { name: "המלון שלנו בקיוטו", lat: 35.0037, lng: 135.7584, city: "Kyoto Central" }
];

// --- Global State ---

let allPlaces = [];
const STATE = {
    places: [],
    filteredPlaces: [],
    filters: {
        region: 'All',
        tokyoWard: 'All',
        category: 'All',
        search: '',
        scoreThreshold: 50
    },
    visibleCount: 20,
    categoryLimits: {}
};

let map = null;
const markers = [];
const layers = {};
let isMapVisible = false;

// --- Data Processing ---

function calculateWeightedScore(place) {
    const wSentiment = 0.5;
    const wProminence = 0.3;
    const wNiche = 0.2;

    const sentiment = (place.sentiment || '').trim();
    const sentimentScore = (sentimentMap[sentiment] || 6) * 10;

    const mentions = place.mentionCount || (place.sources ? place.sources.length : 1);
    const prominenceScore = Math.min(mentions * 20, 100);

    const isNiche = place.classification === 'נישתי' || (place.categories && place.categories.includes('נישתי'));
    const classificationScore = isNiche ? 100 : 70;

    return Math.round(
        (sentimentScore * wSentiment) + (prominenceScore * wProminence) + (classificationScore * wNiche)
    );
}

function processPlace(place) {
    // Extract actual category and ignore classifiers like 'נישתי', 'מיינסטרים'
    let rawCat = place.category || (place.categories && place.categories.length > 0 ? place.categories.find(c => c !== 'נישתי' && c !== 'מיינסטרים') : null) || 'אחר';
    let cat = CATEGORY_NORMALIZE[rawCat] || rawCat;
    if (!CATEGORY_ICONS[cat]) cat = 'אחר';

    // Auto-assign region from cities
    let reg = place.region || 'Other';
    const cityList = place.cities || (place.city ? [place.city] : []);
    const cityStr = cityList.join(', ').toLowerCase();

    if (cityStr.includes('tokyo') || cityStr.includes('טוקיו')) reg = 'Tokyo';
    else if (cityStr.includes('kyoto') || cityStr.includes('קיוטו')) reg = 'Kyoto';
    else if (cityStr.includes('osaka') || cityStr.includes('אוסקה')) reg = 'Osaka';
    else if (cityStr.includes('hakone') || cityStr.includes('האקונה')) reg = 'Hakone';

    // Resolve coordinates
    let lat = place.lat !== undefined ? place.lat : null;
    let lng = place.lng !== undefined ? place.lng : null;
    if (place.coordinates) {
        if (typeof place.coordinates.lat !== 'undefined') lat = place.coordinates.lat;
        else if (typeof place.coordinates.latitude !== 'undefined') lat = place.coordinates.latitude;

        if (typeof place.coordinates.lng !== 'undefined') lng = place.coordinates.lng;
        else if (typeof place.coordinates.longitude !== 'undefined') lng = place.coordinates.longitude;
    }

    let descriptionText = place.real_description || place.description || (place.descriptions && place.descriptions.length > 0 ? place.descriptions[0].text : '');

    let recommender = null;
    const fallbackDesc = place.descriptions && place.descriptions.length > 0 ? place.descriptions[0].text : '';
    const match = fallbackDesc.match(/מקום נהדר ש(.+?) אימת/);
    if (match) {
        recommender = match[1];
    }

    if (!recommender && place.sources && place.sources.length > 0) {
        const sourceStr = place.sources.join(' ').toLowerCase();
        if (sourceStr.includes('itay')) recommender = 'איתי';
        else if (sourceStr.includes('jessy') || sourceStr.includes('jesse')) recommender = "ג'סי";
        else if (sourceStr.includes('misha')) recommender = 'מישה';
        else if (sourceStr.includes('japantorii') || sourceStr.includes('japan torii')) recommender = 'Japan Torii';
        else if (sourceStr.includes('tiktok') || sourceStr.includes('instagram')) recommender = 'רשתות חברתיות';
        else if (sourceStr.includes('reddit')) recommender = 'Reddit';
        else if (sourceStr.includes('youtube')) recommender = 'YouTube';
        else if (sourceStr.includes('timeout')) recommender = 'TimeOut';
        else if (sourceStr.includes('japan times')) recommender = 'Japan Times';
        else if (sourceStr.includes('navitime')) recommender = 'Navitime';
        else if (sourceStr.includes('japan wonder travel')) recommender = 'Japan Wonder';
        else if (sourceStr.includes('google maps')) recommender = 'Google Maps';
        else if (sourceStr.includes('בלוגים')) recommender = 'בלוגרים למטיילים';
    }

    if (!recommender) {
        recommender = 'צוות אינווסטיגטור';
    }

    if (!descriptionText) descriptionText = 'אין תיאור זמין.';

    const isNiche = place.classification === 'נישתי' || (place.categories && place.categories.includes('נישתי'));

    return {
        ...place,
        name: place.primaryName || (place.names && place.names[0]) || place.name || 'Unknown Place',
        description: descriptionText,
        recommender: recommender,
        city: place.cities ? place.cities.join(', ') : (place.city || ''),
        classification: isNiche ? 'נישתי' : (place.classification || 'מיינסטרים'),
        lat,
        lng,
        region: reg,
        category: cat,
        rankScore: place.gemini_score || calculateWeightedScore(place),
        recommendation: place.gemini_recommendation || ''
    };
}

// --- UI Helpers ---

function getCategoryIcon(cat) {
    return CATEGORY_ICONS[cat] || CATEGORY_ICONS['אחר'];
}

function getCategoryColor(cat) {
    const iconClass = getCategoryIcon(cat);
    const colorClass = iconClass.split(' ').find(c => c.startsWith('text-'));
    return colorClass ? colorClass.replace('text-', '') : 'brand-pink';
}

function getUnsplashFallback(cat) {
    const images = {
        'אוכל': 'https://images.unsplash.com/photo-1580828369019-22204642dd21?w=800&q=80',
        'מקדש': 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80',
        'טבע ופארקים': 'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=800&q=80',
        'שופינג': 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=800&q=80',
    };
    return images[cat] || DEFAULT_IMAGE;
}

function resolveColor(tailwindClass) {
    return TAILWIND_COLOR_MAP[tailwindClass] || '#FF4D85';
}

// --- System Messages (Toast) ---

function showMessage(text) {
    const box = document.getElementById('messageBox');
    document.getElementById('messageContent').innerText = text;
    box.classList.remove('hidden');
    setTimeout(() => box.classList.remove('opacity-0'), 10);
    setTimeout(() => {
        box.classList.add('opacity-0');
        setTimeout(() => box.classList.add('hidden'), 300);
    }, 3000);
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupEventListeners();
    loadData();
});

async function loadData() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Unified data is a dictionary where keys are place IDs
        const uniquePlaces = Object.values(data);
        console.log(`Loaded ${uniquePlaces.length} unique places from unified data`);

        // Process and sort
        allPlaces = uniquePlaces
            .map(processPlace)
            .sort((a, b) => b.rankScore - a.rankScore);

        STATE.places = allPlaces;
        STATE.filteredPlaces = [...allPlaces];

        setupCategories();
        setupTokyoWards();
        applyFilters();
        showMessage(`נטענו ${allPlaces.length} המלצות בהצלחה`);

    } catch (error) {
        console.error("Data load failed:", error);
        showMessage("שגיאה בטעינת הנתונים.");
        setupCategories();
        applyFilters();
    }
}

// --- UI Building ---

function setupCategories() {
    const catSet = new Set(allPlaces.map(p => p.category));
    const catContainer = document.getElementById('categoryFilters');
    const toggleContainer = document.getElementById('mapLayerToggles');

    // Build category filter buttons using DocumentFragment
    const catFragment = document.createDocumentFragment();

    // "All" button
    const allBtn = document.createElement('button');
    allBtn.className = "filter-btn cat-btn active flex items-center shrink-0 gap-2 px-5 py-2 rounded-full whitespace-nowrap font-medium transition-all bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 data-[active=true]:bg-brand-pink data-[active=true]:text-white text-sm";
    allBtn.dataset.cat = "All";
    allBtn.innerHTML = `<i class="fa-solid fa-border-all"></i> הכל`;
    catFragment.appendChild(allBtn);

    const toggleFragment = document.createDocumentFragment();

    Array.from(catSet).sort().forEach(cat => {
        if (!cat) return;
        const iconClasses = getCategoryIcon(cat);
        const icon = iconClasses.split(' ')[1];

        // Category button
        const btn = document.createElement('button');
        btn.className = "filter-btn cat-btn flex items-center shrink-0 gap-2 px-5 py-2 rounded-full whitespace-nowrap font-medium transition-all bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 data-[active=true]:bg-brand-pink data-[active=true]:text-white text-sm";
        btn.dataset.cat = cat;
        btn.innerHTML = `<i class="fa-solid ${icon}"></i> ${cat}`;
        catFragment.appendChild(btn);

        // Map layer toggle
        const label = document.createElement('label');
        label.className = "flex items-center justify-between p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors";
        label.innerHTML = `
            <div class="flex items-center gap-2 text-sm">
                <i class="${iconClasses}"></i> <span>${cat}</span>
            </div>
            <div class="relative inline-flex items-center">
                <input type="checkbox" class="sr-only peer toggle-checkbox" checked data-layer="${cat}">
                <div class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-brand-pink dark:bg-gray-600 transition-colors"></div>
                <div class="absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:-translate-x-5"></div>
            </div>
        `;
        toggleFragment.appendChild(label);
    });

    catContainer.innerHTML = '';
    catContainer.appendChild(catFragment);
    toggleContainer.innerHTML = '';
    toggleContainer.appendChild(toggleFragment);
}

function setupTokyoWards() {
    const wards = new Set();
    allPlaces.forEach(p => {
        if (p.region === 'Tokyo') {
            const cityStr = p.city || '';
            if (cityStr.includes('Tokyo - ')) {
                wards.add(cityStr.split('Tokyo - ')[1].trim());
            } else {
                wards.add('Other Wards (שאר טוקיו)');
            }
        }
    });

    const container = document.getElementById('tokyoWardFilters');
    if (!container) return;

    const fragment = document.createDocumentFragment();

    const allBtn = document.createElement('button');
    allBtn.className = "filter-btn ward-btn active shrink-0 px-4 py-1.5 rounded-full whitespace-nowrap font-medium transition-all bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 data-[active=true]:bg-brand-pink data-[active=true]:text-white text-sm";
    allBtn.dataset.ward = "All";
    allBtn.setAttribute('data-active', 'true');
    allBtn.innerText = "כל אזורי טוקיו";
    fragment.appendChild(allBtn);

    Array.from(wards).sort((a, b) => {
        if (a.includes('Other')) return 1;
        if (b.includes('Other')) return -1;
        return a.localeCompare(b);
    }).forEach(ward => {
        const btn = document.createElement('button');
        btn.className = "filter-btn ward-btn shrink-0 px-4 py-1.5 rounded-full whitespace-nowrap font-medium transition-all bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 data-[active=true]:bg-brand-pink data-[active=true]:text-white text-sm";
        btn.dataset.ward = ward;
        btn.innerText = ward;
        fragment.appendChild(btn);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
}

function setupEventListeners() {
    // Theme
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        STATE.filters.search = e.target.value.toLowerCase();
        applyFilters();
    });

    // Score Threshold Slider
    const scoreSlider = document.getElementById('scoreThreshold');
    if (scoreSlider) {
        scoreSlider.addEventListener('input', (e) => {
            document.getElementById('thresholdVal').innerText = e.target.value;
            STATE.filters.scoreThreshold = parseInt(e.target.value, 10);
            applyFilters();
        });
    }

    // Region Filters
    document.querySelectorAll('[data-region]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('[data-region]').forEach(b => b.removeAttribute('data-active'));
            const target = e.currentTarget;
            target.setAttribute('data-active', 'true');
            STATE.filters.region = target.dataset.region;

            // Toggle Tokyo Wards visibility
            const wardsContainer = document.getElementById('tokyoWardsContainer');
            if (wardsContainer) {
                if (STATE.filters.region === 'Tokyo') {
                    wardsContainer.classList.remove('hidden');
                } else {
                    wardsContainer.classList.add('hidden');
                    // Reset ward filter
                    STATE.filters.tokyoWard = 'All';
                    document.querySelectorAll('[data-ward]').forEach(b => b.removeAttribute('data-active'));
                    const allWardBtn = document.querySelector('[data-ward="All"]');
                    if (allWardBtn) allWardBtn.setAttribute('data-active', 'true');
                }
            }

            applyFilters();
        });
    });

    // Tokyo Ward Filters
    const wardContainer = document.getElementById('tokyoWardFilters');
    if (wardContainer) {
        wardContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-ward]');
            if (btn) {
                document.querySelectorAll('[data-ward]').forEach(b => b.removeAttribute('data-active'));
                btn.setAttribute('data-active', 'true');
                STATE.filters.tokyoWard = btn.dataset.ward;
                applyFilters();
            }
        });
    }

    // Category Filters (delegated)
    document.getElementById('categoryFilters').addEventListener('click', (e) => {
        const btn = e.target.closest('[data-cat]');
        if (btn) {
            document.querySelectorAll('[data-cat]').forEach(b => b.removeAttribute('data-active'));
            btn.setAttribute('data-active', 'true');
            STATE.filters.category = btn.dataset.cat;
            applyFilters();
        }
    });

    // Default active states
    document.querySelector('[data-region="All"]').setAttribute('data-active', 'true');

    // Load More
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.classList.add('hidden');
    }

    // View Toggle
    document.getElementById('toggleMapBtn').addEventListener('click', toggleMapView);

    // Filter Reset
    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.getElementById('searchInput').value = '';
            STATE.filters.search = '';
            if (scoreSlider) {
                scoreSlider.value = 50;
                document.getElementById('thresholdVal').innerText = 50;
                STATE.filters.scoreThreshold = 50;
            }
            document.querySelector('[data-region="All"]').click();
            document.querySelector('[data-cat="All"]').click();
        });
    }

    // Map Filter Mobile Toggle
    const mapFilterToggleBtn = document.getElementById('mapFilterToggleBtn');
    if (mapFilterToggleBtn) {
        mapFilterToggleBtn.addEventListener('click', () => {
            const content = document.getElementById('mapFilterContent');
            const icon = document.getElementById('mapFilterIcon');
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.classList.add('rotate-180');
            } else {
                content.classList.add('hidden');
                icon.classList.remove('rotate-180');
            }
        });
    }

    // Map Layer Toggles (delegated)
    document.getElementById('mapLayerToggles').addEventListener('change', (e) => {
        if (e.target.classList.contains('toggle-checkbox')) {
            const cat = e.target.dataset.layer;
            const isChecked = e.target.checked;
            if (layers[cat] && map) {
                if (isChecked) {
                    map.addLayer(layers[cat]);
                } else {
                    map.removeLayer(layers[cat]);
                }
            }
        }
    });
}

// --- Filtering & State ---

function applyFilters() {
    const { region, category, search, scoreThreshold, tokyoWard } = STATE.filters;

    let sumScores = 0;

    STATE.filteredPlaces = STATE.places.filter(p => {
        const matchRegion = region === 'All' || p.region === region;
        const matchCategory = category === 'All' || p.category === category;
        const matchSearch = !search || p.name.toLowerCase().includes(search) || (p.description && p.description.toLowerCase().includes(search));
        const matchScore = (p.rankScore || 0) >= scoreThreshold;

        let matchTokyoWard = true;
        if (region === 'Tokyo' && tokyoWard !== 'All') {
            const cityStr = p.city || '';
            let placeWard = 'Other Wards (שאר טוקיו)';
            if (cityStr.includes('Tokyo - ')) {
                placeWard = cityStr.split('Tokyo - ')[1].trim();
            }
            matchTokyoWard = placeWard === tokyoWard;
        }

        const passes = matchRegion && matchCategory && matchSearch && matchScore && matchTokyoWard;
        if (passes) {
            sumScores += (p.rankScore || 0);
        }
        return passes;
    });

    STATE.visibleCount = 20;
    STATE.categoryLimits = {};

    document.getElementById('placeCount').textContent = STATE.filteredPlaces.length;

    // Update Stats
    const statTotalEl = document.getElementById('statTotal');
    const statFilteredEl = document.getElementById('statFiltered');
    const statAvgEl = document.getElementById('statAvg');

    if (statTotalEl) statTotalEl.innerText = STATE.places.length;
    if (statFilteredEl) statFilteredEl.innerText = STATE.filteredPlaces.length;
    if (statAvgEl) {
        const avg = STATE.filteredPlaces.length > 0 ? Math.round(sumScores / STATE.filteredPlaces.length) : 0;
        statAvgEl.innerText = avg;
    }

    renderGallery();

    if (map) {
        updateMapMarkers();
    }
}

// --- Rendering ---

function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    const emptyState = document.getElementById('emptyState');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    if (loadMoreBtn) loadMoreBtn.classList.add('hidden');

    grid.innerHTML = '';

    if (STATE.filteredPlaces.length === 0) {
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
        return;
    }

    grid.classList.remove('hidden');
    emptyState.classList.add('hidden');
    emptyState.classList.remove('flex');

    // Group ALL filtered places
    const grouped = {};
    const isTokyoView = STATE.filters.region === 'Tokyo';

    STATE.filteredPlaces.forEach(place => {
        let groupKey = place.category;

        // If Tokyo region is selected, group by area (ward) instead of category
        if (isTokyoView) {
            const cityStr = place.city || '';
            if (cityStr.includes('Tokyo - ')) {
                groupKey = cityStr.split('Tokyo - ')[1].trim();
            } else {
                groupKey = 'Other Wards (שאר טוקיו)';
            }
        }

        if (!grouped[groupKey]) {
            grouped[groupKey] = [];
        }
        grouped[groupKey].push(place);
    });

    const fragment = document.createDocumentFragment();

    // Custom sort to put "Other Wards" at the end if we are in Tokyo view
    const sortedGroups = Object.keys(grouped).sort((a, b) => {
        if (isTokyoView) {
            if (a.includes('Other Wards')) return 1;
            if (b.includes('Other Wards')) return -1;
        }
        return a.localeCompare(b);
    });

    sortedGroups.forEach(groupName => {
        const places = grouped[groupName];
        let iconClasses = getCategoryIcon(groupName);
        if (isTokyoView) {
            iconClasses = "fa-solid fa-location-dot text-brand-pink";
        }

        const section = document.createElement('div');
        section.className = "category-section w-full";

        section.innerHTML = `
            <div class="flex items-center justify-between mb-4 px-2">
                <h3 class="text-2xl font-black flex items-center gap-3 text-brand-dark dark:text-white">
                    <i class="${iconClasses}"></i> ${groupName} 
                    <span class="text-sm font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">${places.length}</span>
                </h3>
                <div class="flex gap-2 relative z-20">
                    <button class="scroll-right-btn w-10 h-10 rounded-full bg-white dark:bg-brand-card shadow hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-brand-pink transition-colors">
                        <i class="fa-solid fa-chevron-right pl-1"></i>
                    </button>
                    <button class="scroll-left-btn w-10 h-10 rounded-full bg-white dark:bg-brand-card shadow hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-brand-pink transition-colors">
                        <i class="fa-solid fa-chevron-left pr-1"></i>
                    </button>
                </div>
            </div>
            <!-- Added hardware acceleration classes: transform-gpu, will-change-scroll -->
            <div class="category-scroll flex overflow-x-auto gap-6 pb-6 px-2 scrollbar-hide touch-pan-x transform-gpu" style="will-change: scroll-position; -webkit-overflow-scrolling: touch;">
            </div>
        `;

        const scrollContainer = section.querySelector('.category-scroll');
        const scrollLeftBtn = section.querySelector('.scroll-left-btn');
        const scrollRightBtn = section.querySelector('.scroll-right-btn');

        // Note: the card is w-[85vw] on mobile, w-[320px] on sm, w-[350px] on lg. Gap is 24px (gap-6).
        // A scroll amount of roughly 360-380px is good for moving one card horizontally.
        const scrollAmount = window.innerWidth < 640 ? window.innerWidth * 0.85 : 374;

        // RTL: Left arrow scrolls content right (negative left), Right arrow scrolls content left (positive left)
        scrollLeftBtn.addEventListener('click', () => {
            // using scrollBy smooth here is fine because it's a discrete button click
            scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        // Allow vertical mouse-wheel to scroll horizontally, adjusted for RTL
        // Note: Using `scrollLeft` directly without `behavior: smooth` is crucial for mousewheels, 
        // as chaining `smooth` calls on continuous wheel events makes the scroll feel "stuck".
        // Using passive: false since we call preventDefault()
        scrollContainer.addEventListener('wheel', (e) => {
            // Only capture vertical scrolls
            if (e.deltaY !== 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                scrollContainer.scrollLeft -= e.deltaY;
            }
        }, { passive: false });

        places.forEach(place => {
            const hasCoords = place.lat && place.lng;
            const mapLink = hasCoords
                ? `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`
                : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + (place.city || ''))}`;

            const card = document.createElement('div');
            // Added hardware acceleration classes: transform-gpu
            card.className = "place-card flex-none w-[85vw] sm:w-[320px] lg:w-[350px] bg-white dark:bg-brand-card rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 group relative flex flex-col h-full transform-gpu transition-transform duration-300 hover:-translate-y-1";

            const imgSrc = place.imageUrl || getUnsplashFallback(place.category);

            card.innerHTML = `
                <div class="relative h-48 card-img-wrapper shrink-0">
                    <img src="${imgSrc}" alt="${place.name}" loading="lazy" class="w-full h-full object-cover card-img">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    <div class="absolute top-3 right-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-gray-800 dark:text-white shadow-sm">
                        <i class="${getCategoryIcon(place.category)}"></i> ${place.category}
                    </div>
                    
                    <button class="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/50 hover:bg-white backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-brand-pink transition-all">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>
                
                <div class="p-5 flex flex-col flex-grow">
                    <h3 class="font-extrabold text-xl mb-1 truncate" title="${place.name}">${place.name}</h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
                        <i class="fa-solid fa-location-dot"></i> ${place.city || 'לא ידוע'} 
                        ${hasCoords ? '' : '<span class="text-[10px] opacity-50 ml-2">(מיקום משוער)</span>'}
                    </p>
                    <div class="flex items-center gap-2 mb-3">
                        <div class="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-bold w-10 h-10 rounded-lg flex items-center justify-center shadow-md">
                        ${place.rankScore || '-'}
                    </div>
                    <div class="flex flex-col">
                        ${place.recommendation ? `<span class="text-xs font-bold ${place.rankScore >= 90 ? 'text-yellow-500' : place.rankScore >= 80 ? 'text-green-500' : place.rankScore >= 70 ? 'text-blue-500' : 'text-gray-400'}">${place.recommendation}</span>` : ''}
                        <span class="text-[10px] text-gray-400 dark:text-gray-500">${place.sentiment || ''}</span>
                    </div>
                </div>
                    ${place.recommender ? `
                    <div class="mb-3 inline-flex items-center gap-1.5 bg-brand-pink/10 text-brand-pink px-2.5 py-1 rounded-md w-fit shadow-sm">
                        <i class="fa-solid fa-user-check text-xs"></i>
                        <span class="text-xs font-bold">מומלץ ע"י ${place.recommender}</span>
                    </div>
                    ` : ''}
                    <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 leading-relaxed">${place.description || 'אין תיאור זמין.'}</p>
                    
                    <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                        <span class="text-xs font-medium px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                            ${place.classification || 'כללי'}
                        </span>
                        <a href="${mapLink}" target="_blank" class="text-brand-pink font-bold hover:text-pink-600 transition-colors flex items-center gap-1 text-sm">
                            נווט <i class="fa-solid fa-arrow-left text-xs"></i>
                        </a>
                    </div>
                </div>
            `;

            // Click to fly on map
            card.addEventListener('click', (e) => {
                if (e.target.closest('a') || e.target.closest('button')) return;

                if (hasCoords) {
                    if (!isMapVisible) toggleMapView();
                    setTimeout(() => {
                        if (map) {
                            map.flyTo([place.lat, place.lng], 16);
                            if (layers[place.category]) {
                                layers[place.category].eachLayer((m) => {
                                    const pos = m.getLatLng();
                                    if (pos.lat === place.lat && pos.lng === place.lng) {
                                        m.openPopup();
                                    }
                                });
                            }
                        }
                    }, 100);
                } else {
                    showMessage("אין קואורדינטות קבועות למקום זה, נסו את כפתור הניווט");
                }
            });

            scrollContainer.appendChild(card);
        });

        fragment.appendChild(section);
    });

    grid.appendChild(fragment);
}

// --- Map View Logic ---

function toggleMapView() {
    isMapVisible = !isMapVisible;
    const mapContainer = document.getElementById('mapContainer');
    const galleryGrid = document.getElementById('galleryGrid');
    const toggleMapText = document.getElementById('toggleMapText');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    if (isMapVisible) {
        mapContainer.classList.remove('hidden');
        setTimeout(() => mapContainer.classList.remove('opacity-0'), 10);

        galleryGrid.classList.add('hidden');
        // FREE UP MEMORY: Clear the innerHTML of gallery when map is open to drop thousands of nodes
        galleryGrid.innerHTML = '';

        if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
        toggleMapText.textContent = "תצוגת גלריה";

        if (!map) {
            initMap();
        } else {
            map.invalidateSize();
        }
        updateMapMarkers();
    } else {
        mapContainer.classList.add('opacity-0');
        setTimeout(() => mapContainer.classList.add('hidden'), 300);

        galleryGrid.classList.remove('hidden');
        toggleMapText.textContent = "תצוגת מפה";

        // RESTORE GALLERY: re-render the cards when coming back from map view
        renderGallery();
    }
}

function initMap() {
    map = L.map('map', { zoomControl: false }).setView([35.6762, 139.6503], 11);
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
    }).addTo(map);

    // Initialize layer groups for each category
    const catSet = new Set(allPlaces.map(p => p.category));
    catSet.forEach(cat => {
        if (cat) layers[cat] = L.layerGroup().addTo(map);
    });

    // Add hotel markers
    const hotelIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
            <div class="marker-pin" style="background:#1e293b; width:40px; height:40px; margin:-20px 0 0 -20px; border:2px solid #FF4D85;"></div>
            <i class="fa-solid fa-bed text-brand-pink" style="font-size: 16px; color: #FF4D85 !important; z-index: 10; margin-top:-6px;"></i>
        `,
        iconSize: [40, 56],
        iconAnchor: [20, 56],
        popupAnchor: [0, -50]
    });

    HOTELS.forEach(hotel => {
        L.marker([hotel.lat, hotel.lng], { icon: hotelIcon, zIndexOffset: 1000 }).addTo(map)
            .bindPopup(`
                <div dir="rtl" class="text-center font-sans p-1">
                    <h4 class="font-black text-xl mb-1 text-brand-pink">${hotel.name}</h4>
                    <p class="text-sm text-gray-500">${hotel.city}</p>
                </div>
            `);
    });
}

function updateMapMarkers() {
    if (!map) return;

    Object.values(layers).forEach(layer => layer.clearLayers());

    const bounds = L.latLngBounds();
    let hasValidCoords = false;

    const mapPlaces = STATE.filteredPlaces.filter(p => p.lat && p.lng);

    mapPlaces.forEach(place => {
        const cat = place.category;
        const iconClasses = getCategoryIcon(cat);
        const colorHtml = iconClasses.split(' ').find(c => c.startsWith('text-'));
        const colorHex = colorHtml ? resolveColor(colorHtml) : '#FF4D85';

        const customIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `
                <div class="marker-pin" style="background:${colorHex}"></div>
                <i class="${iconClasses} text-white" style="font-size: 12px; color: white !important; z-index: 10;"></i>
            `,
            iconSize: [30, 42],
            iconAnchor: [15, 42],
            popupAnchor: [0, -40]
        });

        const marker = L.marker([place.lat, place.lng], { icon: customIcon });

        marker.bindPopup(`
            <div dir="rtl" class="font-sans min-w-[200px] p-1">
                <span class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">${cat}</span>
                <h4 class="font-black text-lg mb-2 text-brand-dark">${place.name}</h4>
                ${place.recommender ? `
                <div class="mb-2 inline-flex items-center gap-1 bg-brand-pink/10 text-brand-pink px-2 py-0.5 rounded-md w-fit shadow-sm">
                    <i class="fa-solid fa-user-check text-[10px]"></i>
                    <span class="text-[10px] font-bold">מומלץ ע"י ${place.recommender}</span>
                </div>
                ` : ''}
                <p class="text-sm text-gray-600 line-clamp-2 mb-3">${place.description || ''}</p>
                <a href="https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}" target="_blank" class="block w-full text-center bg-brand-pink text-white rounded py-2 text-sm font-bold">נווט חזרה</a>
            </div>
        `);

        if (!layers[cat]) {
            // If we somehow encounter a new category not in layers, create it and add to map
            layers[cat] = L.layerGroup().addTo(map);
        }
        layers[cat].addLayer(marker);

        bounds.extend([place.lat, place.lng]);
        hasValidCoords = true;
    });

    if (hasValidCoords && isMapVisible) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
}

// --- Theme Setup ---

function initTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    if (document.documentElement.classList.contains('dark')) {
        localStorage.theme = 'dark';
    } else {
        localStorage.theme = 'light';
    }
}
