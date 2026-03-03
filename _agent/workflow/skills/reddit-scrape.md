---
description: Scrape Reddit for recommended places in Japan
---

# Reddit Scrape — Japan Places Agent

## Mission
Search Reddit for recommended places to visit in Japan. Extract structured data about each place and write it to the shared data file.

## Instructions

### Step 1: Navigate to Reddit and Search
1. Go to https://www.reddit.com
2. Search for the following queries one by one:
   - `"best places in Japan"`
   - `"Japan hidden gems"`
   - `"must visit Japan"`
   - `"Tokyo recommendations"`
   - `"Kyoto must see"`
   - `"Osaka food recommendations"`
   - `"Japan off the beaten path"`
3. Focus on posts from these subreddits:
   - r/JapanTravel
   - r/Tokyo
   - r/japanlife
   - r/japan
   - r/solotravel (Japan-related posts)

### Step 2: Extract Place Data
For each place mentioned in popular posts (high upvotes, many comments):

1. **שם המקום** — The exact name (in English or Japanese if available)
2. **קטגוריה** — Classify into one of:
   - אוכל (food/restaurants/cafes)
   - תצפית (viewpoints/scenic spots)
   - מוזיאון (museums/galleries)
   - חיי לילה (bars/clubs/nightlife)
   - אחר (temples, parks, shopping, etc.)
3. **סנטימנט** — Based on the comments:
   - חיובי מאוד — Overwhelmingly positive, many people recommend
   - חיובי — Generally positive
   - מעורב — Mixed opinions
   - שלילי — Generally negative / "overrated"
4. **תיאור קצר** — 1-2 sentences summarizing what Redditors say
5. **סיווג משוער** — Based on frequency of mentions:
   - מיינסטרים — Mentioned in many posts, well-known tourist spot
   - נישתי — Mentioned rarely, local/hidden gem

### Step 3: Write to Shared File
Open the file `data/raw-places.md` and add your findings under the `## Reddit Findings` section.

**Use this exact format for each place:**

```markdown
### [Place Name]
- **מקור:** Reddit
- **קטגוריה:** [אוכל / תצפית / מוזיאון / חיי לילה / אחר]
- **סנטימנט:** [חיובי מאוד / חיובי / מעורב / שלילי]
- **תיאור קצר:** [Your summary]
- **סיווג משוער:** [מיינסטרים / נישתי] - [explanation]
```

### Rules
- **DO NOT** edit or delete existing entries from other agents
- **DO NOT** add duplicate places that already exist in the file (check first!)
- Aim for at least **15-20 unique places** across different categories
- Focus on quality over quantity — only include places with real community discussion
- If a place is mentioned in multiple subreddits/threads, note this in the description
- Prioritize posts from the last 2 years for recency
