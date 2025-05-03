const express = require('express');
const dns = require('dns').promises;

async function fetchModule() {
    return (await import('node-fetch')).default;
}

const app = express();
const PORT = 5000;
const DOMAIN = 'google.com';

app.get('/geo-location', async (req, res) => {
    try {
        const fetch = await fetchModule();
        const addresses = await dns.lookup(DOMAIN);
        const ip = addresses.address;

        const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
        const geoData = await geoResponse.json();
        console.log('Geolocation data:', geoData);
        res.json(geoData); // Returns only the geolocation data
    } catch (error) {
        console.error('Error fetching geolocation:', error);
        res.status(500).json({ error: 'Failed to get geolocation' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});