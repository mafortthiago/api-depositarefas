const express = require("express");
const router = express();

router.use("/api/user", require("./UserRoutes"));
router.use("/api/post", require("./PostRoutes"));
router.get("/", (req, res) => {
    res.send("Api depositarefas! :) ");
});

module.exports = router;
