const fs = require('fs');
const https = require('https');
const path = require('path');

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const DATA_PATH = path.join(__dirname, '../data/unified-places.json');
const BACKUP_PATH = path.join(__dirname, '../data/unified-places.json.bak');

if (!API_KEY) {
    console.error("Error: GOOGLE_MAPS_API_KEY environment variable is missing.");
    console.error("Please run the script as: GOOGLE_MAPS_API_KEY=your_key node fetch_missing_coords.js");
    process.exit(1);
}

// Function to fetch coordinates from Google Maps Find Place API
function fetchCoordinates(query) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({ textQuery: query });
        const options = {
            hostname: 'places.googleapis.com',
            path: '/v1/places:searchText',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': API_KEY,
                'X-Goog-FieldMask': 'places.location'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.places && parsed.places.length > 0) {
                        const loc = parsed.places[0].location;
                        resolve({ lat: loc.latitude, lng: loc.longitude });
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

// Delay helper for rate limiting
const delay = ms => new Promise(res => setTimeout(res, ms));

async function main() {
    console.log("Loading data from", DATA_PATH);
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

    // Create a backup before making any changes
    fs.writeFileSync(BACKUP_PATH, JSON.stringify(data, null, 2), 'utf8');
    console.log("Backup created at", BACKUP_PATH);

    const places = Object.values(data);
    let missingCount = 0;

    // Find how many need processing
    const toProcess = places.filter(p => !p.coordinates || !p.coordinates.lat || !p.coordinates.lng);
    console.log(`Found ${toProcess.length} places missing coordinates. Starting fetch...`);

    let updatedCount = 0;
    let notFoundCount = 0;
    let errorCount = 0;

    for (let i = 0; i < toProcess.length; i++) {
        const place = toProcess[i];

        // Prepare search query
        const placeName = place.primaryName || (place.names && place.names[0]) || place.name || '';
        let cityObj = place.cities;
        let cityStr = Array.isArray(cityObj) ? cityObj.join(', ') : (typeof cityObj === 'object' ? (cityObj.english || cityObj.hebrew || Object.values(cityObj)[0]) : String(cityObj || ''));
        if (typeof cityStr === 'object') cityStr = cityStr.english || cityStr.hebrew || '';

        const query = `${placeName} ${cityStr} Japan`.trim();

        try {
            process.stdout.write(`[${i + 1}/${toProcess.length}] Searching for: "${query}" ... `);
            const location = await fetchCoordinates(query);

            if (location) {
                console.log(`FOUND (${location.lat}, ${location.lng})`);
                if (!place.coordinates) place.coordinates = {};
                place.coordinates.lat = location.lat;
                place.coordinates.lng = location.lng;
                updatedCount++;
            } else {
                console.log(`NOT FOUND`);
                notFoundCount++;
            }

            // Save progress every 50 items
            if ((i + 1) % 50 === 0) {
                fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
                console.log(`--- Progress saved at ${i + 1} items ---`);
            }

            // Rate limit (Google allows 50-100 QPS, but let's be safe with 100ms)
            await delay(100);

        } catch (err) {
            console.log(`ERROR: ${err.message}`);
            errorCount++;
            await delay(1000); // Wait longer on error
        }
    }

    // Final save
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
    console.log("\n--- COMPLETED ---");
    console.log(`Updated: ${updatedCount}`);
    console.log(`Not Found: ${notFoundCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log("Database updated successfully.");
}

main().catch(console.error);
