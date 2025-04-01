const express = require('express');
const { getAllOrders, updateOrderStatus, manageInventory, getSalesReport } = require('../controllers/adminController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/orders', verifyToken, verifyAdmin, getAllOrders);
router.put('/order/:id', verifyToken, verifyAdmin, updateOrderStatus);
router.post('/inventory', verifyToken, verifyAdmin, manageInventory);
router.get('/sales', verifyToken, verifyAdmin, getSalesReport);

module.exports = router;
