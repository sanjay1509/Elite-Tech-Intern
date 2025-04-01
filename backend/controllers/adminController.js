const Order = require('../models/Order');
const Pizza = require('../models/Pizza');

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('pizzaId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await Order.findByIdAndUpdate(id, { status });
    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Manage inventory (Add/Update/Delete Pizzas)
exports.manageInventory = async (req, res) => {
  const { name, price, description, imageUrl, action } = req.body;
  try {
    if (action === 'add') {
      const pizza = new Pizza({ name, price, description, imageUrl });
      await pizza.save();
      res.json({ message: 'Pizza added successfully' });
    } else if (action === 'update') {
      await Pizza.findOneAndUpdate({ name }, { price, description, imageUrl });
      res.json({ message: 'Pizza updated successfully' });
    } else if (action === 'delete') {
      await Pizza.findOneAndDelete({ name });
      res.json({ message: 'Pizza deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get sales report
exports.getSalesReport = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'Delivered' });
    const totalSales = orders.reduce((acc, order) => acc + order.totalAmount, 0);
    res.json({ totalSales, orderCount: orders.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
