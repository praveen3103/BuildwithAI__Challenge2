const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Disable caching for JS and CSS so browsers always get fresh files after deploy
app.use((req, res, next) => {
  if (req.path.endsWith('.js') || req.path.endsWith('.css')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Secure API config endpoint — key never exposed in client code
app.get('/api/config', (req, res) => {
  res.json({ geminiApiKey: process.env.GEMINI_API_KEY });
});

app.listen(port, () => {
  console.log(`ElectionIQ server running on port ${port}`);
});
