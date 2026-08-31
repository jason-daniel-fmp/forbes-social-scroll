# Mobile app structure

```
src/
  app/                  # App shell — navigation & global types
  features/             # One folder per user-facing vertical
    landing/            # Mode picker (Trends, Home, Financial Recovery)
    trends/             # General article scroll
    home/               # Home buying journey + goal picker
    financial-recovery/ # Debt relief journey
  shared/               # Cross-feature code reused by multiple verticals
    feed/               # Feed item types & visibility rules
    journey/            # Journey state, WebView orchestration, persistence
    screens/            # ScrollFeed & ArticleScreen
    assets/             # Static assets (author avatars)
    types/              # Ambient TS declarations
```

Each feature follows the same internal layout:

```
features/<name>/
  screens/    # React Native screens for this feature
  data/       # Mock JSON + typed loaders
  feed/       # buildFeedItems.ts (+ tests)
  context/    # Feature-specific state (only when needed)
  index.ts    # Public exports
```
