const express = require("express");
const path = require("path");
const fetch = require("node-fetch"); // CommonJS import
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend (index.html, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// API proxy (so API_URL is hidden in env var)
app.get("/api/properties", async (req, res) => {
  try {
    if (!process.env.API_URL) {
      return res.status(500).json({ error: "API_URL is not set in environment variables" });
    }

    const response = await fetch(process.env.API_URL);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch data from API. Status: ${response.status}`,
      });
    }

    const text = await response.text();

    try {
      const data = JSON.parse(text); // parse as JSON
      res.json(data);
    } catch (parseErr) {
      console.error("Invalid JSON from API:", text);
      res.status(500).json({
        error: "Invalid JSON response from API",
        raw: text, // send raw for debugging
      });
    }
  } catch (err) {
    console.error("Fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch data", details: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
