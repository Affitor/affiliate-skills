# Social Data Providers

API providers for social engagement data (views, likes, comments, shares) across platforms.
Referenced by: `trending-content-scout`, `content-angle-ranker`, `competitor-spy`, and all S2 content skills.

**All APIs are OPTIONAL.** Every skill works with `web_search` + `web_fetch` alone.
APIs provide more accurate data and higher volume — but the core insights (winning formats,
content gaps, engagement patterns) are available either way.

---

## How to Configure

Add to your conversation context, project instructions, or CLAUDE.md:

```yaml
social_data_config:
  youtube:
    provider: "rapidapi"
    api_key: "YOUR_RAPIDAPI_KEY"
    host: "youtube-api49.p.rapidapi.com"

  tiktok:
    provider: "rapidapi"
    api_key: "YOUR_RAPIDAPI_KEY"
    host: "tiktok-api23.p.rapidapi.com"

  x:
    provider: "rapidapi"
    api_key: "YOUR_RAPIDAPI_KEY"
    host: "twitter-api45.p.rapidapi.com"

  reddit:
    provider: "rapidapi"
    api_key: "YOUR_RAPIDAPI_KEY"
    host: "reddit-scraper2.p.rapidapi.com"
```

Configure only the platforms you need. Missing platforms fall back to `web_search`.

---

## Provider Options by Platform

### YouTube

| Provider | Free Tier | Speed | Data Quality | Setup |
|----------|-----------|-------|-------------|-------|
| **YouTube Data API v3** | 10,000 units/day | Fast | ★★★★★ | [console.cloud.google.com](https://console.cloud.google.com) → Enable YouTube Data API v3 → Create API key |
| **RapidAPI youtube-api49** | ~100 req/mo | Fast | ★★★★★ | [rapidapi.com/ytjar/api/youtube-api49](https://rapidapi.com/ytjar/api/youtube-api49) → Subscribe → Copy key |
| **SerpAPI** | 100 searches/mo | Fast | ★★★★ | [serpapi.com](https://serpapi.com) → Sign up → `engine: youtube` |
| **Apify YouTube Scraper** | $5 free credit/mo | Medium | ★★★★ | [apify.com/bernardo/youtube-scraper](https://apify.com/bernardo/youtube-scraper) |
| **web_search (no API)** | Unlimited | Slow | ★★ | No setup needed |

**Config examples:**

```yaml
# YouTube Data API v3 (official — best free option)
youtube:
  provider: "youtube-data-api"
  api_key: "AIzaSy..."
  # Search: GET https://www.googleapis.com/youtube/v3/search?part=snippet&q={keyword}&maxResults=50&type=video&key={api_key}
  # Details: GET https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id={videoIds}&key={api_key}

# RapidAPI
youtube:
  provider: "rapidapi"
  api_key: "YOUR_RAPIDAPI_KEY"
  host: "youtube-api49.p.rapidapi.com"
  # Search: GET /api/search?q={keyword}&maxResults=50
  # Details: GET /api/video/info?videoId={id}

# SerpAPI
youtube:
  provider: "serpapi"
  api_key: "YOUR_SERPAPI_KEY"
  # Search: GET https://serpapi.com/search?engine=youtube&search_query={keyword}
```

**Data available per video:**
- `title`, `description`, `channel`, `published_date`, `thumbnail`
- `views`, `likes`, `comments` (from statistics)
- `duration` (from contentDetails)
- Shares: not available via API — estimated from engagement ratio

---

### TikTok

| Provider | Free Tier | Speed | Data Quality | Setup |
|----------|-----------|-------|-------------|-------|
| **RapidAPI tiktok-api23** | ~100 req/mo | Fast | ★★★★ | [rapidapi.com/flavor-flavor-default/api/tiktok-api23](https://rapidapi.com) → Subscribe |
| **RapidAPI TikTok Creative Center** | ~100 req/mo | Fast | ★★★★ | Ads/trending data — good for format analysis |
| **Apify TikTok Scraper** | $5 free credit/mo | Medium | ★★★★ | [apify.com/clockworks/tiktok-scraper](https://apify.com/clockworks/tiktok-scraper) |
| **TikTok Research API** | Application required | Fast | ★★★★★ | [developers.tiktok.com](https://developers.tiktok.com) — academic/business access only |
| **web_search (no API)** | Unlimited | Slow | ★★ | No setup needed |

**Config examples:**

```yaml
# RapidAPI
tiktok:
  provider: "rapidapi"
  api_key: "YOUR_RAPIDAPI_KEY"
  host: "tiktok-api23.p.rapidapi.com"
  # Search: GET /api/search/video?keyword={keyword}
  # Detail: GET /api/post/detail?videoId={id}

# Apify
tiktok:
  provider: "apify"
  api_key: "YOUR_APIFY_TOKEN"
  actor_id: "clockworks~tiktok-scraper"
  # Runs actor with input: { searchQueries: [keyword], resultsPerPage: 50 }
```

**Data available per video:**
- `title` (desc), `creator`, `published_date`, `thumbnail`, `video_link`
- `views` (playCount), `likes` (diggCount), `comments` (commentCount), `shares` (shareCount)
- `duration`

---

### X (Twitter)

| Provider | Free Tier | Speed | Data Quality | Setup |
|----------|-----------|-------|-------------|-------|
| **RapidAPI twitter-api45** | ~100 req/mo | Fast | ★★★★ | [rapidapi.com](https://rapidapi.com) → Subscribe |
| **X API v2 (Basic)** | $100/mo | Fast | ★★★★★ | [developer.x.com](https://developer.x.com) — official, paid |
| **Apify Twitter Scraper** | $5 free credit/mo | Medium | ★★★★ | [apify.com/apidojo/twitter-scraper](https://apify.com/apidojo/twitter-scraper) |
| **SerpAPI** | 100 searches/mo | Fast | ★★★ | `engine: twitter` — search results only |
| **web_search (no API)** | Unlimited | Slow | ★★ | No setup needed |

**Config examples:**

```yaml
# RapidAPI
x:
  provider: "rapidapi"
  api_key: "YOUR_RAPIDAPI_KEY"
  host: "twitter-api45.p.rapidapi.com"
  # Search: GET /search.php?query={keyword}&search_type=Top

# X API v2 (official)
x:
  provider: "x-api-v2"
  bearer_token: "YOUR_BEARER_TOKEN"
  # Search: GET https://api.x.com/2/tweets/search/recent?query={keyword}&tweet.fields=public_metrics
```

**Data available per tweet:**
- `text`, `author`, `created_at`
- `views` (impression_count), `likes` (like_count), `retweets` (retweet_count), `replies` (reply_count)
- `quotes` (quote_count)
- Photos/media URLs

---

### Reddit

| Provider | Free Tier | Speed | Data Quality | Setup |
|----------|-----------|-------|-------------|-------|
| **Reddit API (official)** | Free (100 req/min) | Fast | ★★★★★ | [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps) → Create app → OAuth2 |
| **RapidAPI reddit-scraper2** | ~100 req/mo | Fast | ★★★ | [rapidapi.com](https://rapidapi.com) → Subscribe |
| **Apify Reddit Scraper** | $5 free credit/mo | Medium | ★★★★ | [apify.com/trudax/reddit-scraper](https://apify.com/trudax/reddit-scraper) |
| **web_search (no API)** | Unlimited | Slow | ★★ | No setup needed |

**Config examples:**

```yaml
# Reddit API (official — recommended, it's free)
reddit:
  provider: "reddit-api"
  client_id: "YOUR_CLIENT_ID"
  client_secret: "YOUR_CLIENT_SECRET"
  # Search: GET https://oauth.reddit.com/search?q={keyword}&sort=top&t=month
  # Returns: score (upvotes), num_comments, created_utc

# RapidAPI
reddit:
  provider: "rapidapi"
  api_key: "YOUR_RAPIDAPI_KEY"
  host: "reddit-scraper2.p.rapidapi.com"
  # Search: GET /search_posts_v3?query={keyword}&sort=RELEVANCE
```

**Data available per post:**
- `title`, `selftext`, `author`, `subreddit`, `created_utc`, `url`
- `score` (upvotes - downvotes), `num_comments`
- `upvote_ratio` — useful for quality signal
- No share count (Reddit doesn't track shares)

---

### Multi-platform Options

| Provider | Platforms | Best For | Free Tier |
|----------|-----------|----------|-----------|
| **SerpAPI** | All (via search) | Quick cross-platform search results | 100 searches/mo |
| **Apify** | All (via actors) | Deep scraping with full data | $5 free credit/mo |
| **SocialBlade API** | YT, TT, X, IG | Creator/channel analytics | Limited free |
| **Phantom Buster** | All | Automated data extraction | 14-day trial |

---

## No API? No Problem.

When no API is configured, skills fall back to `web_search` + `web_fetch`. Here's what changes:

| Capability | With API | Without API (web_search) |
|------------|----------|--------------------------|
| Content volume | 50+ results per platform | 10-20 results |
| View counts | Exact numbers | Approximate (from search snippets: "150K views") |
| Likes/Comments/Shares | Exact numbers per content | Usually unavailable or very approximate |
| Engagement score | Accurate calculation | Estimated from available signals |
| Format detection | From structured data | From title/description analysis |
| Speed | 1-3 seconds per platform | 5-15 seconds per platform |
| Rate limits | Depends on plan | No limits |
| Cost | Free tier or paid | Free |

**What you still get without API:**
- ✅ Which content titles get featured in search (= high performing)
- ✅ View count approximations (YouTube shows views in snippets)
- ✅ Format patterns (comparison vs review vs tutorial — detectable from titles)
- ✅ Top creators (who appears most in results)
- ✅ Content gaps (topics with few/no results)
- ✅ Recency signals (when content was published)

**These patterns are the most valuable insights.** Exact engagement numbers are nice-to-have, not need-to-have. The difference between a video with 100K views and 150K views rarely changes your content strategy. The difference between "comparisons dominate" and "tutorials dominate" does.

---

## Adding a Custom Provider

Have an API not listed here? Configure it with field mapping:

```yaml
social_data_config:
  youtube:
    provider: "custom"
    base_url: "https://your-api.example.com"
    api_key: "YOUR_KEY"
    headers:
      Authorization: "Bearer {api_key}"
    search:
      endpoint: "/v1/youtube/search"
      method: "GET"
      params:
        query_param: "q"         # which param name holds the search query
        limit_param: "limit"     # which param name holds max results
        sort_param: "order"      # which param name holds sort order
        sort_values:
          views: "viewCount"
          date: "date"
          relevance: "relevance"
    response_mapping:
      items_path: "data.videos"         # JSON path to results array
      title: "snippet.title"            # JSON path within each item
      url: "snippet.url"
      creator: "snippet.channelTitle"
      views: "statistics.viewCount"
      likes: "statistics.likeCount"
      comments: "statistics.commentCount"
      shares: "statistics.shareCount"   # set to null if unavailable
      published_date: "snippet.publishedAt"
      duration: "contentDetails.duration"
      thumbnail: "snippet.thumbnails.high.url"
```

Skills will use this mapping to normalize responses from any API into the standard
`ContentItem` schema used across the engagement analysis workflow.

---

## Engagement Score Formula

Used consistently across all skills that analyze social data:

```
engagement_score = (likes × 2 + comments × 3 + shares × 5) / max(views, 1) × 1000
```

| Component | Weight | Why |
|-----------|--------|-----|
| Shares × 5 | Highest | Strongest viral signal — viewer stakes their reputation |
| Comments × 3 | High | High-intent action — takes effort to type |
| Likes × 2 | Medium | Low-effort but still positive signal |
| ÷ views | Normalize | Makes new content (1K views) comparable to old content (1M views) |
| × 1000 | Scale | Produces readable numbers in 0-100 range typically |

**Interpreting scores:**
- **50+** — Exceptional engagement. Content struck a nerve.
- **30-50** — Strong engagement. Proven format/angle.
- **15-30** — Good engagement. Above average.
- **5-15** — Average engagement. Standard content.
- **<5** — Low engagement. Views without interaction.

**Platform-specific notes:**
- **Reddit:** No share count. Formula becomes: `(score × 2 + comments × 3) / max(score, 1) × 1000`. `score` = upvotes − downvotes.
- **X:** Use `retweets` as shares, `replies` as comments, `likes` as likes.
- **TikTok:** All four metrics available. Most balanced engagement data.
- **YouTube:** No native share count via API. Estimate: `shares ≈ comments × 0.5` (conservative).

---

## Quick Recommendation by Use Case

| Your Situation | Recommended Setup |
|---|---|
| **Just starting, no budget** | No config needed. web_search works fine. |
| **Want better YouTube data** | YouTube Data API v3 (free, 10K units/day) |
| **Want multi-platform data** | RapidAPI with one key covers YT + TT + X + Reddit |
| **Heavy usage / production** | YouTube Data API v3 + TikTok RapidAPI + Reddit official API |
| **Academic research** | Apply for TikTok Research API + YouTube Data API v3 |
| **Agency / multiple clients** | Apify (flexible, per-run pricing) or SerpAPI (search-based) |
