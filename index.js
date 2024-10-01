const express = require('express');
const axios = require('axios');  // For fetching live data or feed
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Sample endpoint to retrieve live feed (replace with actual feed logic)
app.get('/live-feed', async (req, res) => {
    try {
        // Replace with the actual live feed source URL or logic
        const response = await axios.get('LIVE_FEED_URL', {
            responseType: 'stream'
        });
        
        // Stream the live feed to the client
        response.data.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching live feed' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
