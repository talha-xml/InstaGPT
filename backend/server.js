const { startBrowser, closeBrowser } = require('./src/services/instagramBrowser');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'InstaGPT Backend is running!',
    status: 'success'
  });
});

app.post('/api/instagram/browser/start', async (req, res) => {
  try {
    const result = await startBrowser();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/instagram/browser/close', async (req, res) => {
  try {
    const result = await closeBrowser();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`InstaGPT server running on port ${PORT}`);
});
