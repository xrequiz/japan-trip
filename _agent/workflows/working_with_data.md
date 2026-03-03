---
description: How to work with place data in this project
---

# Working with Place Data

To work efficiently with place data in this project, **always use the unified data file instead of raw individual data sources**. 

## The Unified Data File
The unified data file is located at:
`web/data/unified-places.json`

This file contains the consolidated, normalized, and merged data from all other scattered JSON files in the `web/data` directory (such as `analyzed-places.json`, `japantorii-places.json`, and creator-specific lists). 

Using this single file guarantees that:
- You are not missing data for a specific location.
- You have all accumulated descriptions and external links for a location.
- You avoid iterating over duplicated places.

## File Structure
The `unified-places.json` file is a dictionary/object mapped by a unique location ID (a normalized lowercase string of the place name).
Each entry follows this schema:

```json
{
  "place-id-string": {
    "id": "place-id-string",
    "primaryName": "The Main Name of the Place",
    "names": ["Name 1", "Name 2"],
    "coordinates": {"lat": 12.34, "lng": 56.78},
    "categories": ["Category A", "Category B"],
    "sources": ["source-file1.json", "Reddit"],
    "descriptions": [
      {"text": "A description of the place", "source": "source-file1.json"}
    ],
    "links": ["https://maps.google.com/...", "https://website.com"],
    "folders": ["Folder A"],
    "sentiment": "חיובי",
    "cities": ["Tokyo"]
  }
}
```

## Adding New Data
If you need to introduce new raw data or a new JSON list to the project:
1. Place the new raw JSON file into the `web/data/` directory.
2. Run the integration script to regenerate the unified file:
   ```bash
   node web/scripts/integrate_data.js
   ```
3. The new data will be automatically merged into `web/data/unified-places.json`.

**Do not manually edit `unified-places.json`**, as it is an auto-generated file. If you need to fix a parsing issue, update the `web/scripts/integrate_data.js` script and re-run it.
