const mongoose = require("mongoose");

const PizzaSchema = new mongoose.Schema({
  name: String,
  base: String,
  sauce: String,
  cheese: String,
  veggies: [String],
  price: Number,
  stock: { type: Number, default: 50 }, // Stock management
});

module.exports = mongoose.model("Pizza", PizzaSchema);
