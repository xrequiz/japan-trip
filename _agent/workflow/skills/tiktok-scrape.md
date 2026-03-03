---
description: Scrape TikTok and Instagram for trending places in Japan
---

# 🔥 TikTok & Instagram Scrape — Japan Trend Hunter Agent

## Mission
Search TikTok and Instagram for viral/trending content about places to visit in Japan. Identify the most popular ("mainstream") spots, analyze whether the hype is justified, and write structured data to the shared file.

## Instructions

// turbo-all

### Step 1: Search for Viral Content
Search the web for TikTok and Instagram content under these hashtags and queries:

**Tokyo:**
- `#TokyoEats` `#TokyoFood` `#TokyoFoodie`
- `#SecretTokyo` `#HiddenTokyo`
- `#TokyoMustDo` `#TokyoTravel` `#TokyoGuide`
- `#TokyoNightlife` `#GoldenGai`
- `#Shibuya` `#Shinjuku` `#Harajuku` `#Akihabara`

**Kyoto:**
- `#KyotoTravel` `#KyotoTemples` `#KyotoFood`
- `#FushimiInari` `#Arashiyama`

**Osaka:**
- `#OsakaFood` `#OsakaStreetFood` `#Dotonbori`

**General:**
- `#JapanTravel` `#JapanFood` `#JapanMustVisit`
- `#JapanHiddenGems` `#JapanBucketList` `#JapanItinerary`

Also search for:
- `"places to visit in Japan TikTok"`
- `"Japan must visit Instagram"`
- `"Japan bucket list viral"`
- `"best Japan spots TikTok 2025"`

Focus on content with high engagement (likes, comments, shares, views).

### Step 2: Identify Recurring (Viral) Places
Pay special attention to places that appear across **multiple** videos/posts by different creators — these are the "mainstream" viral spots. Look for:
- Places featured by 3+ different creators
- Places with 100K+ combined views
- Places tagged by top travel influencers

### Step 3: Analyze Sentiment
For each place, analyze the caption and comments to determine sentiment:
- **חיובי מאוד**: "best ever", "must go", "life changing", "worth the wait", "speechless"
- **חיובי**: "really good", "nice place", "recommend", "had a great time"
- **מעורב**: "good but crowded", "worth it but expensive", "overrated but still nice", "long wait"
- **שלילי**: "tourist trap", "not worth the hype", "overpriced", "skip this", "waste of time"

### Step 4: Categorize Each Place
Classify into one of:
- **אוכל** — Restaurants, street food, cafes, bakeries
- **תצפית** — Viewpoints, rooftops, towers, photo spots
- **מוזיאון** — Museums, galleries, exhibitions
- **חיי לילה** — Bars, clubs, nightlife districts
- **קניות** — Markets, shopping streets, unique stores
- **טבע** — Parks, gardens, hiking trails
- **מקדשים** — Temples, shrines, religious sites
- **חוויה** — Unique experiences, workshops, attractions

### Step 5: Write to Shared File
Open `data/raw-places.md` and add findings under the `## TikTok Findings` section.

**Use this exact format for each place:**

```markdown
### [Place Name in English] ([Japanese name if known])
- **מקור:** TikTok / Instagram
- **קטגוריה:** [אוכל / תצפית / מוזיאון / חיי לילה / קניות / טבע / מקדשים / חוויה]
- **סנטימנט:** [חיובי מאוד / חיובי / מעורב / שלילי]
- **תיאור קצר:** [1-2 sentences summarizing creators' and commenters' opinions]
- **סיווג משוער:** [מיינסטרים / נישתי] - [short explanation why]
```

### Rules
- **DO NOT** edit or delete existing entries from other agents
- **DO NOT** add duplicate places that already exist in the file (check first!)
- Minimum **5 places**, aim for **15-20 unique places** across different categories
- Pay attention to comments — they reveal if a place is truly worth visiting
- Note if a place is frequently featured across multiple creators
- TikTok/Instagram tend to amplify "instagrammable" spots — note this in assessments
- Be critical: analyze whether the hype is justified based on comments and reviews
- Focus on recent content for maximum relevancy
