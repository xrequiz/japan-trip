---
description: Scrape Google Maps for highly-rated places in Japan
---

# Google Maps Scrape — Japan Places Agent

## Mission
Search Google Maps for highly-rated and reviewed places in Japan. Extract structured data about each place and write it to the shared data file.

## Instructions

### Step 1: Navigate to Google Maps and Search
1. Go to https://www.google.com/maps
2. Search for places in the following Japanese cities/areas:
   - Tokyo (東京)
   - Kyoto (京都)
   - Osaka (大阪)
   - Hiroshima (広島)
   - Nara (奈良)
   - Hakone (箱根)
   - Kamakura (鎌倉)
   - Nikko (日光)
3. For each city, search for:
   - "best restaurants" / "top restaurants"
   - "things to do"
   - "top attractions"
   - "hidden gems"
   - "best viewpoints"
   - "best nightlife"
   - "museums"

### Step 2: Extract Place Data
For each highly-rated place (4.0+ stars with 500+ reviews):

1. **שם המקום** — The exact name as shown on Google Maps
2. **קטגוריה** — Classify into one of:
   - אוכל (restaurants/cafes/bakeries/food markets)
   - תצפית (viewpoints/observation decks/scenic spots)
   - מוזיאון (museums/art galleries)
   - חיי לילה (bars/izakayas/clubs/entertainment)
   - אחר (temples/shrines/parks/shopping/experiences)
3. **סנטימנט** — Based on Google reviews:
   - חיובי מאוד — 4.5+ stars with consistent praise
   - חיובי — 4.0-4.4 stars, generally good reviews
   - מעורב — 3.5-3.9 stars or polarizing reviews
   - שלילי — Below 3.5 or many negative recent reviews
4. **תיאור קצר** — 1-2 sentences summarizing the review consensus (include star rating and review count)
5. **סיווג משוער** — Based on review count and type:
   - מיינסטרים — 5000+ reviews, appears in top tourist lists
   - נישתי — Under 2000 reviews, local favorite, off main tourist path

### Step 3: Write to Shared File
Open the file `data/raw-places.md` and add your findings under the `## Google Maps Findings` section.

**Use this exact format for each place:**

```markdown
### [Place Name]
- **מקור:** Google Maps
- **קטגוריה:** [אוכל / תצפית / מוזיאון / חיי לילה / אחר]
- **סנטימנט:** [חיובי מאוד / חיובי / מעורב / שלילי]
- **תיאור קצר:** [Your summary — include ⭐ rating and review count]
- **סיווג משוער:** [מיינסטרים / נישתי] - [explanation]
```

### Rules
- **DO NOT** edit or delete existing entries from other agents
- **DO NOT** add duplicate places that already exist in the file (check first!)
- Aim for at least **15-20 unique places** across different cities and categories
- Include the star rating (e.g., ⭐ 4.7) and approximate review count in the description
- Pay attention to RECENT reviews — a place might have high overall rating but declining quality
- Balance between different cities — don't only list Tokyo places
- Include a mix of tourist attractions and local favorites
