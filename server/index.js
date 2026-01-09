import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;

// Enable CORS for all origins (or restrict to your frontend domain)
app.use(cors());

// Security Configuration
const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://brainprinter.io', // Your production domain
    // Add your EC2 public IP or DNS if acceptable
];

// Content Security Policy: Only allow fetching these types of data
const ALLOWED_PATTERNS = [
    /.*\/sellers\.json$/i,           // sellers.json files
    /.*\/app-ads\.txt$/i,            // app-ads.txt files
    /^https?:\/\/play\.google\.com\//i, // Google Play Store
    /^https?:\/\/apps\.apple\.com\//i,  // Apple App Store
    /^https?:\/\/itunes\.apple\.com\//i // iTunes API
];

// Middleware: Validate Origin
app.use((req, res, next) => {
    const origin = req.headers.origin;
    // Allow requests with no origin (like curl) only if you want to support scripts, 
    // but for browser security, strict checking is better.
    // For now, we allow if origin matches or if it's undefined (server-to-server), 
    // BUT you should lock this down further in production if possible.
    if (origin && !ALLOWED_ORIGINS.some(o => origin.startsWith(o))) {
        // Log warning but maybe don't block yet to avoid breaking if domain is slightly different
        console.warn(`Blocked request from unauthorized origin: ${origin}`);
        // return res.status(403).json({ error: 'Unauthorized Origin' }); 
        // Uncomment line above to enforce STRICT origin check
    }
    next();
});

// Proxy Endpoint
app.get('/proxy', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'Missing "url" query parameter' });
    }

    const targetUrl = decodeURIComponent(url);

    // Security Check: URL Whitelist
    const isAllowed = ALLOWED_PATTERNS.some(pattern => pattern.test(targetUrl));
    if (!isAllowed) {
        console.warn(`Blocked proxy request for disallowed URL: ${targetUrl}`);
        return res.status(403).json({ error: 'URL not allowed by proxy policy' });
    }

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            return res.status(response.status).send(`Target server returned ${response.status}`);
        }

        const text = await response.text();
        res.send(text);
    } catch (error) {
        console.error(`Proxy error for ${targetUrl}:`, error.message);
        res.status(500).json({ error: 'Failed to fetch content', details: error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Proxy server running on port ${PORT}`);
});
