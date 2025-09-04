const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend (index.html, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// API proxy (so API_URL is hidden in env var)
app.get("/api/properties", async (req, res) => {
  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch(process.env.API_URL);

    const text = await response.text(); // read raw response

    try {
      const data = JSON.parse(text); // try parsing as JSON
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
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
