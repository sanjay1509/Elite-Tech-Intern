const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [{ pizza: String, quantity: Number }],
  totalAmount: Number,
  status: { type: String, enum: ["Pending", "In Kitchen", "Out for Delivery"], default: "Pending" },
  paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
});

module.exports = mongoose.model("Order", OrderSchema);
