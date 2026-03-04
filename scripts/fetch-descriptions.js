const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'web', 'data', 'unified-places.json');

// Attempt to extract the API key from one of the image URLs
function getApiKey(data) {
    const defaultKey = process.env.GOOGLE_API_KEY || null;
    if (defaultKey) return defaultKey;

    for (const key in data) {
        const place = data[key];
        if (place.imageUrl && place.imageUrl.includes('&key=')) {
            const urlObj = new URL(place.imageUrl);
            const apiKey = urlObj.searchParams.get('key');
            if (apiKey) return apiKey;
        }
    }
    return null;
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Ensure the Google Maps API key is available
async function main() {
    try {
        console.log("Loading unified-places.json...");
        const rawData = fs.readFileSync(DATA_PATH, 'utf8');
        const data = JSON.parse(rawData);

        const API_KEY = getApiKey(data);
        if (!API_KEY) {
            console.error("Could not find GOOGLE_API_KEY in environment or existing image URLs.");
            process.exit(1);
        }

        console.log("Found Google API Key, proceeding...");

        let placesToUpdate = 0;
        let successCount = 0;
        let failCount = 0;

        for (const [id, place] of Object.entries(data)) {
            // Check if we need to fetch a real description
            if (place.real_description) continue;
            // Also skip if we can't search for it properly
            if (!place.name && !place.primaryName && !(place.names && place.names.length > 0)) continue;

            const name = place.primaryName || (place.names && place.names[0]) || place.name;
            const city = place.cities ? place.cities.join(' ') : (place.city || '');
            let searchQuery = `${name} ${city}`;

            let lat = place.coordinates?.lat || place.coordinates?.latitude || place.lat;
            let lng = place.coordinates?.lng || place.coordinates?.longitude || place.lng;

            placesToUpdate++;

            console.log(`[${placesToUpdate}] Fetching description for: ${name}...`);

            try {
                // 1. Find Place to get Place ID
                let placeSearchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(searchQuery)}&inputtype=textquery&fields=place_id&language=iw&key=${API_KEY}`;

                if (lat && lng) {
                    placeSearchUrl += `&locationbias=point:${lat},${lng}`;
                }

                const searchRes = await fetch(placeSearchUrl);
                const searchData = await searchRes.json();

                if (searchData.status === 'OK' && searchData.candidates && searchData.candidates.length > 0) {
                    const placeId = searchData.candidates[0].place_id;

                    // 2. Fetch Place Details
                    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=editorial_summary,reviews&language=iw&key=${API_KEY}`;
                    const detailsRes = await fetch(detailsUrl);
                    const detailsData = await detailsRes.json();

                    if (detailsData.status === 'OK' && detailsData.result) {
                        const result = detailsData.result;
                        let newDescription = null;

                        // Prefer editorial summary
                        if (result.editorial_summary && result.editorial_summary.overview) {
                            newDescription = result.editorial_summary.overview;
                        }
                        // Fallback to the top positive review if long enough
                        else if (result.reviews && result.reviews.length > 0) {
                            const goodReview = result.reviews.find(r => r.rating >= 4 && r.text && r.text.length > 40);
                            if (goodReview) {
                                newDescription = `"${goodReview.text}"`;
                            }
                        }

                        if (newDescription) {
                            console.log(`  -> OK! Found: ${newDescription.substring(0, 50)}...`);
                            place.real_description = newDescription;
                            successCount++;
                        } else {
                            console.log(`  -> Failed to find suitable summary or review.`);
                            // Optionally mark it to avoid retrying in the future
                            place.real_description = place.description || 'אין מידע נוסף זמין.';
                            failCount++;
                        }
                    } else {
                        console.log(`  -> Error fetching details: ${detailsData.status}`);
                        place.real_description = place.description || 'אין מידע נוסף זמין.';
                        failCount++;
                    }
                } else {
                    console.log(`  -> Could not find place via text search. Status: ${searchData.status}`);
                    place.real_description = place.description || 'אין עליו מידע נוסף ב-Google Maps.';
                    failCount++;
                }

            } catch (err) {
                console.error(`  -> Network/Parse Error: ${err.message}`);
                failCount++;
            }

            // Save frequently so we don't lose data on crash
            if (placesToUpdate % 20 === 0) {
                fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
                console.log(`[Checkpoint] Saved ${placesToUpdate} operations...`);
            }

            // Respect API rate limits
            await sleep(150);
        }

        // Final save
        fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
        console.log(`\nDone! Successfully updated ${successCount} places. Failed to find descriptions for ${failCount} places.`);

    } catch (e) {
        console.error("Fatal Error:", e);
    }
}

main();
