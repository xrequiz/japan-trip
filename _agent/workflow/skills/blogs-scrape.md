---
description: Scrape travel blogs and forums for recommended places in Japan
---

# Blogs & Forums Scrape — Japan Places Agent

## Mission
Search travel blogs, forums, and guide websites for recommended places in Japan. Extract structured data about each place and write it to the shared data file.

## Instructions

### Step 1: Search for Blog Posts and Forum Threads
1. Use Google to search for travel blog posts and forum discussions:
   - `"best places to visit in Japan" site:tripadvisor.com`
   - `"Japan travel guide" best restaurants`
   - `"hidden gems Japan" blog`
   - `"Japan itinerary" must visit`
   - `"off the beaten path Japan"`
   - `"best food in Tokyo" blog`
   - `"Kyoto local recommendations"`
   - `"Japan travel tips" forum`
2. Visit well-known travel sites:
   - TripAdvisor Japan forum
   - Lonely Planet Thorn Tree forum (Japan)
   - Japan-Guide.com
   - TokyoCheapo.com
   - TimeOut Tokyo / Osaka
   - The Whole World Is A Playground (Japan posts)
   - No Borders Japan
3. Prioritize posts from the last 2 years

### Step 2: Extract Place Data
For each recommended place found in blogs/forums:

1. **שם המקום** — The exact name of the place
2. **קטגוריה** — Classify into one of:
   - אוכל (restaurants/street food/food markets/cafes)
   - תצפית (viewpoints/scenic spots/photo locations)
   - מוזיאון (museums/galleries/cultural centers)
   - חיי לילה (bars/izakayas/nightlife areas)
   - אחר (temples/shrines/parks/shopping/experiences/day trips)
3. **סנטימנט** — Based on the blog/forum tone:
   - חיובי מאוד — Blogger calls it "must visit", "best in Japan", etc.
   - חיובי — Positive recommendation
   - מעורב — Mentioned with caveats ("good but crowded", "expensive but worth it")
   - שלילי — "Overrated", "skip this"
4. **תיאור קצר** — 1-2 sentences summarizing the blogger's/forum's opinion
5. **סיווג משוער:**
   - מיינסטרים — Featured in most major travel guides, well-known
   - נישתי — Featured in "hidden gem" or "off beaten path" lists

### Step 3: Write to Shared File
Open the file `data/raw-places.md` and add your findings under the `## Blog & Forum Findings` section.

**Use this exact format for each place:**

```markdown
### [Place Name]
- **מקור:** בלוגים
- **קטגוריה:** [אוכל / תצפית / מוזיאון / חיי לילה / אחר]
- **סנטימנט:** [חיובי מאוד / חיובי / מעורב / שלילי]
- **תיאור קצר:** [Your summary]
- **סיווג משוער:** [מיינסטרים / נישתי] - [explanation]
```

### Rules
- **DO NOT** edit or delete existing entries from other agents
- **DO NOT** add duplicate places that already exist in the file (check first!)
- Aim for at least **15-20 unique places** across different categories
- Cross-reference multiple blogs — a place mentioned by 3+ bloggers is stronger evidence
- Note the source blog/forum in your description for traceability
- Blogs have bias — note if a post seems sponsored or affiliate-driven
- Focus on actionable recommendations (with enough detail to actually find the place)
- Include places from different regions, not just Tokyo
