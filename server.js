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
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
