const express = require("express");
const app = express();

// Render mengirimkan nomor port melalui environment variable
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ Bot is Alive");
});

app.listen(PORT, () => {
  console.log(`🌐 Web Server listening on port ${PORT}`);
});
