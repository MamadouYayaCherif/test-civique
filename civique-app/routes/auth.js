const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  req.session.user = req.body.email;
  res.redirect("/");
});

module.exports = router;