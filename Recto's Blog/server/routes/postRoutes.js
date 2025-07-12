const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// ✅ 获取所有文章（支持分类过滤）
// 例如：GET /api/posts?category=Tech
router.get('/', async (req, res) => {
  const { category } = req.query;
  const query = category ? { category } : {};

  try {
    const posts = await Post.find(query).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 获取所有分类（不重复）
// GET /api/posts/categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Post.distinct('category');
    res.json(categories.filter(Boolean)); // 去除空字符串
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 获取单篇文章
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: '文章未找到' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 发布新文章
router.post('/', async (req, res) => {
  const { title, summary, content, coverImage, category } = req.body;
  const newPost = new Post({ title, summary, content, coverImage, category });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ 编辑文章
router.put('/:id', async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ 删除文章（可选）
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: '已删除文章' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
