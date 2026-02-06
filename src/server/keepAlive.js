const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot is alive");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🌐 Web service running on port ${PORT}`);
});
