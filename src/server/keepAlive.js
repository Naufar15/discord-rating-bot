const express = require("express");

module.exports = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.get("/", (req, res) => res.send("✅ Discord bot is running smoothly!"));

  app.listen(PORT, () => console.log(`🌐 Web service running on port ${PORT}`));
};
