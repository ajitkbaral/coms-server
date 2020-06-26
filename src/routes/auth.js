const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  if (
    req.body.email === "admin@admin.com" &&
    req.body.password === "password"
  ) {
    return res.send(true);
  }
  return res.status(400).send(false);
});

module.exports = router;
