const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static('./'));

// API endpoint to provide the key securely to the frontend
// In a real production app, the frontend shouldn't even know the key,
// instead the frontend would send the prompt to this backend, and the backend
// would make the request to Gemini. But for simplicity in this static app,
// we'll just serve the key so app.js can fetch it.
app.get('/api/config', (req, res) => {
    res.json({
        geminiApiKey: process.env.GEMINI_API_KEY
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
