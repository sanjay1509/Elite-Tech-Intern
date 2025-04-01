const express = require("express");
const router = express.Router();

// Dummy Order Route
router.get("/", (req, res) => {
  res.send("Order API is working!");
});

module.exports = router;
