const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');
const outputFile = path.join(dataDir, 'unified-places.json');

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== 'unified-places.json');

const unifiedMap = new Map();

function normalizeId(name) {
    if (!name) return 'unknown';
    // Convert to lowercase, remove all non-alphanumeric/non-language characters
    return name.toLowerCase().replace(/[\s\-_,.'"\(\)\[\]！？!@#$%^&*+=<>/:;]/g, '');
}

function processArray(arr, sourceFile) {
    if (!Array.isArray(arr)) return;
    for (const item of arr) {
        if (!item || typeof item !== 'object') continue;

        const name = item.name || '';
        if (!name) continue;

        const id = normalizeId(name);
        if (id === 'unknown' || id === '') continue;

        if (!unifiedMap.has(id)) {
            unifiedMap.set(id, {
                id,
                names: new Set(),
                coordinates: null,
                categories: new Set(),
                sources: new Set(),
                descriptions: [],
                links: new Set(),
                folders: new Set(),
                sentiment: null,
                cities: new Set()
            });
        }

        const entry = unifiedMap.get(id);

        entry.names.add(name.trim());
        entry.sources.add(sourceFile);
        if (item.source) entry.sources.add(item.source);

        if (item.lat && item.lng) {
            entry.coordinates = { lat: parseFloat(item.lat), lng: parseFloat(item.lng) };
        } else if (item.coordinates && item.coordinates.lat) {
            entry.coordinates = { lat: parseFloat(item.coordinates.lat), lng: parseFloat(item.coordinates.lng) };
        }

        if (item.category) entry.categories.add(item.category);
        if (item.classification) entry.categories.add(item.classification);

        if (item.description) {
            entry.descriptions.push({ text: item.description, source: sourceFile });
        }
        if (item.descriptions && Array.isArray(item.descriptions)) {
            for (const desc of item.descriptions) {
                if (desc.text) entry.descriptions.push({ text: desc.text, source: desc.source || sourceFile });
            }
        }

        if (item.googleMapsUrl) entry.links.add(item.googleMapsUrl);
        if (item.website) entry.links.add(item.website);
        if (item.fromUrl) entry.links.add(item.fromUrl);

        if (item.folder) entry.folders.add(item.folder);
        if (item.sentiment && !entry.sentiment) entry.sentiment = item.sentiment;
        if (item.city) entry.cities.add(item.city);
    }
}

for (const file of files) {
    try {
        const filePath = path.join(dataDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (Array.isArray(data)) {
            processArray(data, file);
        } else if (data && Array.isArray(data.places)) {
            processArray(data.places, file);
        } else {
            console.log(`Skipping ${file}: Not an array or doesn't have a places array`);
        }
    } catch (e) {
        console.error(`Error processing ${file}:`, e.message);
    }
}

const result = {};
for (const [id, value] of unifiedMap.entries()) {
    result[id] = {
        id: value.id,
        primaryName: Array.from(value.names)[0],
        names: Array.from(value.names),
        coordinates: value.coordinates,
        categories: Array.from(value.categories),
        sources: Array.from(value.sources),
        descriptions: value.descriptions,
        links: Array.from(value.links),
        folders: Array.from(value.folders),
        sentiment: value.sentiment,
        cities: Array.from(value.cities)
    };
}

fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
console.log(`Successfully merged ${files.length} files into unified-places.json`);
console.log(`Total unique places: ${unifiedMap.size}`);
