const express = require('express');
const dns = require('dns').promises;
const fetch = require('node-fetch');

const app = express();
const PORT = 5000;
const DOMAIN = 'google.com'; // Hardcoded website

app.get('/geo-location', async (req, res) => {
    try {
        // Get IP address of the hardcoded domain
        const addresses = await dns.lookup(DOMAIN);
        const ip = addresses.address;

        // Fetch geolocation data
        const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
        const geoData = await geoResponse.json();

        res.json({
            domain: DOMAIN,
            ip,
            location: geoData,
        });
    } catch (error) {
        console.error('Error fetching geolocation:', error);
        res.status(500).json({ error: 'Failed to get geolocation' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});