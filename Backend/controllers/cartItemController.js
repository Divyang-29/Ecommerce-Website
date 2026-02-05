const Cart = require("../models/cartModel");
const CartItem = require("../models/cartItemModel");

exports.addItem = async (req, res) => {
  const { product_id, size, color, quantity, price } = req.body;

  if (!product_id || !price) {
    return res.status(400).json({
      message: "Product and price required",
    });
  }

  const cart = await Cart.getOrCreateCart(req.user.id);

  await CartItem.addItem({
    cart_id: cart.id,
    product_id,
    size,
    color,
    quantity: quantity || 1,
    price,
  });

  res.json({ message: "Item added to cart" });
};

exports.updateQuantity = async (req, res) => {
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({
      message: "Quantity must be at least 1",
    });
  }

  await CartItem.updateQuantity(req.params.id, quantity);
  res.json({ message: "Quantity updated" });
};

exports.deleteItem = async (req, res) => {
  await CartItem.deleteItem(req.params.id);
  res.json({ message: "Item removed from cart" });
};
