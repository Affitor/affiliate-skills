# Flywheel Connections — Master Map

The Affitor Flywheel is a closed-loop system where analytics feedback flows back to research, creating continuous improvement across all 50 skills.

```
  S1 RESEARCH ──▶ S2 CONTENT ──▶ S3 BLOG & SEO ──▶ S4 OFFERS & LANDING
       ▲                                                    │
       │                                                    ▼
       │                                              S5 DISTRIBUTION
       │                                                    │
       └──────────── S6 ANALYTICS ◀─────────────────────────┘
                          │
                          ▼
                    S7 AUTOMATION → SCALE
                          │
                    S8 META (across all)
```

## Connection Map

### S1 Research → S2 Content
| From Skill | To Skill | Data Flowing |
|---|---|---|
| affiliate-program-search | viral-post-writer | `recommended_program` (product data) |
| affiliate-program-search | twitter-thread-writer | `recommended_program` (product data) |
| affiliate-program-search | reddit-post-writer | `recommended_program` (product data) |
| affiliate-program-search | tiktok-script-writer | `recommended_program` (product data) |
| affiliate-program-search | content-pillar-atomizer | `recommended_program` (product data) |
| niche-opportunity-finder | viral-post-writer | `niche_analysis` (angles, audience) |
| monopoly-niche-finder | content-pillar-atomizer | `monopoly_niche` (unique positioning) |
| purple-cow-audit | viral-post-writer | `remarkability_score` (what makes it shareable) |
| competitor-spy | viral-post-writer | `competitor_gaps` (content opportunities) |
| trending-content-scout | viral-post-writer | `pattern_analysis` (winning formats, hooks, benchmark) |
| trending-content-scout | tiktok-script-writer | `top_content` (top TikTok examples + engagement data) |
| trending-content-scout | twitter-thread-writer | `top_content` (top X threads + engagement data) |
| trending-content-scout | reddit-post-writer | `top_content` (top Reddit posts + engagement data) |
| trending-content-scout | content-pillar-atomizer | `platform_averages` (platform engagement for allocation) |
| trending-content-scout | content-angle-ranker | `full output` (all data for angle scoring) |
| content-angle-ranker | viral-post-writer | `recommended_angle` (best angle + format + hook) |
| content-angle-ranker | tiktok-script-writer | `recommended_angle` (TikTok-specific angle) |
| content-angle-ranker | affiliate-blog-builder | `recommended_angle` (blog-specific angle) |
| content-angle-ranker | comparison-post-writer | `recommended_angle` (if angle is a comparison) |

### S1 Research (internal)
| From Skill | To Skill | Data Flowing |
|---|---|---|
| trending-content-scout | competitor-spy | `top_creators` (who's dominating this keyword) |
| competitor-spy | trending-content-scout | `competitor_urls` (channels/profiles to analyze) |
| trending-content-scout | keyword-cluster-architect | `engagement_data` (per-keyword engagement for cluster prioritization) |
| traffic-analyzer | affiliate-program-search | `traffic_score` (program website health as evaluation factor) |
| traffic-analyzer | competitor-spy | `traffic_sources` (competitor traffic breakdown) |
| traffic-analyzer | niche-opportunity-finder | `traffic_data` (validates niche demand) |
| competitor-spy | traffic-analyzer | `competitor_domains` (domains to analyze) |
| affiliate-program-search | traffic-analyzer | `program_urls` (program websites to evaluate) |

### S2 Content (internal — new)
| From Skill | To Skill | Data Flowing |
|---|---|---|
| content-research-brief | viral-post-writer | `research_brief` (sources, data points, angles) |
| content-research-brief | affiliate-blog-builder | `research_brief` (deep research for long-form) |
| content-research-brief | tiktok-script-writer | `key_stats` (data-backed hooks for scripts) |
| content-research-brief | infographic-generator | `master_data` (stats for visualization) |
| content-research-brief | content-pillar-atomizer | `research_brief` (pillar to atomize) |
| viral-post-writer | infographic-generator | `post_content` (create visual for the post) |
| affiliate-blog-builder | infographic-generator | `article_data` (stats for featured image) |
| trending-content-scout | content-research-brief | `trending_topics` (topics to research deeper) |
| infographic-generator | social-media-scheduler | `infographic_spec` (image ready to schedule) |

### S2 Content → S3 Blog & SEO
| From Skill | To Skill | Data Flowing |
|---|---|---|
| viral-post-writer | affiliate-blog-builder | `post_content` (expand into long-form) |
| content-pillar-atomizer | keyword-cluster-architect | `content_pillars` (topic clusters to target) |
| viral-post-writer | comparison-post-writer | `product` (featured product data) |

### S3 Blog & SEO → S4 Landing
| From Skill | To Skill | Data Flowing |
|---|---|---|
| affiliate-blog-builder | landing-page-creator | `products_featured` (for comparison pages) |
| keyword-cluster-architect | landing-page-creator | `target_keywords` (SEO-optimized headlines) |
| content-moat-calculator | grand-slam-offer | `authority_gaps` (what to emphasize in offers) |
| affiliate-blog-builder | bonus-stack-builder | `products_featured` (products needing bonuses) |

### S4 Landing → S5 Distribution
| From Skill | To Skill | Data Flowing |
|---|---|---|
| landing-page-creator | bio-link-deployer | `landing_page` (URL to add to link hub) |
| landing-page-creator | email-drip-sequence | `landing_page` (link destination for emails) |
| landing-page-creator | github-pages-deployer | `landing_page.html` (file to deploy) |
| grand-slam-offer | email-drip-sequence | `offer_copy` (offer framing for email) |
| bonus-stack-builder | email-drip-sequence | `bonus_stack` (bonus details for email sequence) |
| value-ladder-architect | email-drip-sequence | `value_ladder` (sequence of offers) |

### S5 Distribution → S6 Analytics
| From Skill | To Skill | Data Flowing |
|---|---|---|
| bio-link-deployer | conversion-tracker | `deployed_links` (URLs to track) |
| email-drip-sequence | conversion-tracker | `email_links` (links in emails to track) |
| social-media-scheduler | performance-report | `scheduled_posts` (posts to measure) |
| github-pages-deployer | seo-audit | `deployed_url` (site to audit) |

### S6 Analytics → S1 Research (FEEDBACK LOOP — closes the flywheel)
| From Skill | To Skill | Data Flowing |
|---|---|---|
| conversion-tracker | affiliate-program-search | `top_converting_niches` → search for more programs in winning niches |
| performance-report | niche-opportunity-finder | `performance_data` → identify which niches perform best |
| performance-report | trending-content-scout | `your_metrics` → compare your content vs scout benchmark |
| performance-report | content-angle-ranker | `winning_angles` → which of your angles actually performed |
| seo-audit | monopoly-niche-finder | `ranking_data` → find niches where you're already winning |
| ab-test-generator | purple-cow-audit | `winning_variants` → what resonates = what's remarkable |
| internal-linking-optimizer | content-decay-detector | `link_structure` → pages with weak links may be decaying |

### S6 Analytics → S3 Blog (SEO FEEDBACK LOOP)
| From Skill | To Skill | Data Flowing |
|---|---|---|
| seo-audit | keyword-cluster-architect | `ranking_gaps` → keyword opportunities |
| seo-audit | content-decay-detector | `declining_pages` → content needing refresh |
| internal-linking-optimizer | affiliate-blog-builder | `link_suggestions` → internal linking targets |
| performance-report | content-moat-calculator | `content_performance` → moat progress |

### S7 Automation (scales patterns from S6)
| From Skill | To Skill | Data Flowing |
|---|---|---|
| content-repurposer | content-pillar-atomizer | `repurposed_content` → atomize further |
| proprietary-data-generator | affiliate-blog-builder | `proprietary_data` → unique content angles |
| proprietary-data-generator | content-moat-calculator | `data_assets` → moat strengtheners |
| multi-program-manager | commission-calculator | `managed_programs` → calculate portfolio earnings |

### S8 Meta (orchestrates all stages)
| From Skill | To Skill | Data Flowing |
|---|---|---|
| skill-finder | any skill | `matched_skill` → route to right skill |
| funnel-planner | all stages | `roadmap` → week-by-week execution plan |
| compliance-checker | all content skills | `compliance_status` → pass/fail gate |
| self-improver | all skills | `improvement_suggestions` → skill quality upgrades |
| category-designer | monopoly-niche-finder | `category_definition` → reframe the niche |
| category-designer | grand-slam-offer | `category_framing` → position offer as category king |

## chain_metadata

Every skill output includes this metadata block for agent orchestration:

```yaml
chain_metadata:
  skill_slug: string        # e.g., "affiliate-program-search"
  stage: string             # e.g., "research"
  timestamp: string         # ISO 8601
  suggested_next: string[]  # e.g., ["viral-post-writer", "landing-page-creator"]
```

Agents use `suggested_next` to auto-chain skills without user intervention. The flywheel ensures `suggested_next` for S6 skills always includes S1 skills.
