const Wishlist = require("../models/wishlistModel");

exports.getWishlist = async (req, res) => {
  const items = await Wishlist.getWishlist(req.user.id);
  res.json(items);
};

exports.add = async (req, res) => {
  const { productId } = req.body;
  await Wishlist.addToWishlist(req.user.id, productId);
  res.json({ message: "Added to wishlist" });
};

exports.remove = async (req, res) => {
  const { productId } = req.params;
  await Wishlist.removeFromWishlist(req.user.id, productId);
  res.json({ message: "Removed from wishlist" });
};
