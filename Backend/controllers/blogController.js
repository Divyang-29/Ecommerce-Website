const Blog = require("../models/blogModel");

/* GET ALL BLOGS */
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.getAll();
  res.json(blogs);
};

/* SEARCH BLOGS */
exports.searchBlogs = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);
  const results = await Blog.search(q);
  res.json(results);
};

/* BLOG DETAIL */
exports.getBlogDetail = async (req, res) => {
  const blog = await Blog.getBySlug(req.params.slug);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.json(blog);
};

/* ✅ CREATE BLOG (ADMIN) */
exports.createBlog = async (req, res) => {
  const { title, excerpt, content, image_url, author } = req.body;

  if (!title || !excerpt || !content || !image_url) {
    return res.status(400).json({ message: "All fields required" });
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const blog = await Blog.create({
    title,
    slug,
    excerpt,
    content,
    image_url,
    author,
  });

  res.status(201).json(blog);
};
