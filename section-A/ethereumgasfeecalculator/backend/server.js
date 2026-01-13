// Load API key from environment variable
const API_KEY = process.env.API_KEY;

const server = http.createServer(async(req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Proxy API endpoint
    if (req.url === '/api/eth-price') {
        try {
            const https = require('https');
            const apiUrl = 'https://api.freecryptoapi.com/v1/getData?symbol=ETH';

            https.get(apiUrl, {
                headers: { 'Authorization': `Bearer ${API_KEY}` }
            }, (apiRes) => {
                let data = '';
                apiRes.on('data', chunk => {
                    data += chunk;
                });
                apiRes.on('end', () => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(data);
                });
            }).on('error', (err) => {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
            });
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: error.message }));
        }
        return;
    }

    res.writeHead(404);
    res.end('Not found');
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});