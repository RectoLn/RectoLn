const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// 获取所有留言，按时间倒序排序
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: '获取留言失败' });
  }
});

// 添加新留言
router.post('/', async (req, res) => {
  const { name, content } = req.body;
  if (!content || content.trim() === '') {
    return res.status(400).json({ error: '留言内容不能为空' });
  }
  try {
    const msg = new Message({
      name: name && name.trim() !== '' ? name.trim() : '匿名',
      content: content.trim(),
    });
    await msg.save();
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ error: '保存留言失败' });
  }
});

// 删除留言（后台管理用）
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: '未找到该留言' });
    }
    res.json({ message: '删除成功' });
  } catch (err) {
    res.status(500).json({ error: '删除失败' });
  }
});

module.exports = router;
