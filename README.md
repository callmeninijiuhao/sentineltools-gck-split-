# PubMatic Onboarding Validator Dashboard

Internal dashboard for **Publisher Development** and **Customer Success** teams to validate mobile applications during the publisher onboarding process.

## Tools

### Pub Onboarding Validator
Accepts a Google Play / Apple App Store URL, Bundle ID, or App ID. Crawls the store to identify the developer, discovers all apps under that developer, extracts developer websites, and validates `app-ads.txt` existence against IAB standards.

### Seller Domain Shooter
Fetches a competitor's `sellers.json` and searches for a specific publisher entity to verify supply path presence and troubleshoot domain mismatches.

## Tech Stack

- **React 19** + TypeScript
- **Tailwind CSS** (PubMatic brand theme)
- **Vite**
- **React Router DOM** (HashRouter)

## Development

```bash
# Start frontend
npm run dev

# Start proxy server (optional, port 3001)
cd server && npm install && npm start
```

## Notes

- This tool relies on public CORS proxies to fetch data from Google Play and the App Store. Occasional failures may occur if proxies are under high load or if store DOM structures change.
- The optional local proxy (`server/`) provides more reliable CORS handling than public alternatives.

---
*Internal Tool — Version 1.0.0 Alpha*
