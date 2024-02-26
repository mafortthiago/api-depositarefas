const express = require("express");
const router = express();

router.get("/", (req, res) => {
  res.send("teste1");
});

module.exports = router;
