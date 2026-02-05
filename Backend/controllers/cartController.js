const Cart = require("../models/cartModel");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.getOrCreateCart(req.user.id);
    const items = await Cart.getCartItems(cart.id);
    res.json({ cart, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load cart" });
  }
};
