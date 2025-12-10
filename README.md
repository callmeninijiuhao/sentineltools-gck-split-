# PubMatic Onboarding Validator Dashboard

A professional, client-side dashboard designed for **Publisher Development** and **Solution Engineering** teams. This tool automates the process of validating mobile applications for `app-ads.txt` compliance and metadata integrity during the publisher onboarding process.

## 🚀 Key Features

### 1. Multi-Platform Analysis
The tool accepts various input formats to identify and crawl publisher data from Google Play and the Apple App Store:
*   **Store URLs:** Full URLs to specific apps (e.g., `https://play.google.com/store/apps/details?id=...`).
*   **Android Bundle IDs:** (e.g., `com.example.app`).
*   **iOS App IDs:** (e.g., `id123456789` or just `123456789`).

### 2. Deep Crawler Logic
Unlike simple scrapers, this tool replicates human browsing behavior to ensure complete data discovery:
*   **Developer Identity:** Automatically identifies the developer profile from a single app input.
*   **Pagination Support:** Intelligently finds and crawls "See All" or "See More" links on developer profiles to discover apps hidden behind pagination or sub-categories.
*   **Smart Website Extraction:** Uses heuristic text matching (e.g., locating "App Support" or "Developer Contact" sections) to find the correct developer website, filtering out privacy policies and email links.
*   **Physical Address Extraction:** Scrapes developer physical addresses from Google Play for verification purposes.

### 3. IAB-Compliant ads.txt Validation
The tool strictly follows IAB protocols to validate `app-ads.txt`:
*   **Root Domain Logic:** If a developer website is a subdomain (e.g., `games.studio.com`), the tool checks both the full domain and the root domain (eTLD+1 approximation, e.g., `studio.com/app-ads.txt`).
*   **Standard Checks:** Verifies `https://`, `http://`, and `www.` variants.
*   **Content Verification:** Ensures the returned content is a valid text file and not a redirect to an HTML page (Soft 404).

### 4. Robust Serverless Architecture
The application runs entirely in the browser but simulates server-grade reliability:
*   **Multi-Proxy Fallback:** Rotates between multiple CORS proxies (`corsproxy.io`, `allorigins`, `codetabs`) to bypass browser security restrictions.
*   **Jitter & Retry:** Implements random network delays (jitter) and retry logic to avoid rate limiting by App Stores.
*   **Batch Processing:** Processes apps in concurrent batches (limit: 5) to maintain performance without overwhelming the network.

## 🛠 Tech Stack

*   **Frontend:** React 19, TypeScript
*   **Styling:** Tailwind CSS (Custom PubMatic Brand Theme)
*   **Icons:** Lucide React
*   **Routing:** React Router DOM
*   **Logic:** DOMParser for client-side HTML parsing

## 🎨 Brand Guidelines

The UI follows PubMatic's corporate identity:
*   **Primary Colors:** PubMatic Blue (`#0072CE`), Navy (`#002E5D`), Teal (`#00A5E0`).
*   **Typography:** Open Sans (Clean, geometric sans-serif).
*   **Layout:** Responsive sidebar, card-based content, and professional data tables.

## 📦 Usage

1.  **Select Module:** Navigate to **PUB DEV > Pub Onboarding Validator**.
2.  **Enter Input:** Paste a Store URL or ID in the search bar.
3.  **Analyze:** Click "Analyze".
    *   *Phase 1:* The tool identifies the developer.
    *   *Phase 2:* It scans the developer page for all apps.
    *   *Phase 3:* It visits every app page to extract the specific website.
    *   *Phase 4:* It validates the `app-ads.txt` URL.
4.  **Review:** View the results table showing App Name, Store URL, Developer Website, computed ads.txt URL, and validation status (Success/Failed).

## ⚠️ Note on Proxies

This tool relies on public CORS proxies to fetch data from Google and Apple. While the **Multi-Proxy Fallback** system is robust, occasional failures may occur if all proxies are under high load or if the App Store changes its DOM structure.

---
*Internal Tool - Version 1.0.0 Alpha*