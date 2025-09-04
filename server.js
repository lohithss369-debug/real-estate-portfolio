const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend
app.use(express.static(path.join(__dirname)));

// Proxy to Google Sheets API (kept safe in Render Env variable)
app.get("/api/properties", async (req, res) => {
  try {
    const response = await fetch(process.env.API_URL);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
