const express = require("express");
const app = express();

const PORT = process.env.PORT; // JANGAN fallback manual di Render

app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});
