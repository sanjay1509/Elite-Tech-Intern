const express = require("express");
const Pizza = require("../models/Pizza");
const router = express.Router();

// Middleware to check admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Access denied" });
  next();
};

// Add a new pizza
router.post("/add", isAdmin, async (req, res) => {
  const { name, base, sauce, cheese, veggies, price, stock } = req.body;
  const newPizza = new Pizza({ name, base, sauce, cheese, veggies, price, stock });
  await newPizza.save();
  res.json({ message: "Pizza added successfully" });
});

// Edit pizza
router.put("/edit/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  await Pizza.findByIdAndUpdate(id, req.body);
  res.json({ message: "Pizza updated successfully" });
});

// Delete pizza
router.delete("/delete/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  await Pizza.findByIdAndDelete(id);
  res.json({ message: "Pizza deleted successfully" });
});

// View all pizzas
router.get("/", async (req, res) => {
  const pizzas = await Pizza.find();
  res.json(pizzas);
});

module.exports = router;
