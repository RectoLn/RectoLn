const express = require('express');
const router = express.Router();
const Logs = require('../models/Logs'); // ✅ 建议变量名和模型名一致

// 获取所有日志
router.get('/', async (req, res) => {
  try {
    const logs = await Logs.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: '获取日志失败', error: err.message });
  }
});

// 添加日志
router.post('/', async (req, res) => {
  const { date, content } = req.body;
  if (!date || !content) {
    return res.status(400).json({ message: '请提供完整的 date 和 content' });
  }

  try {
    const newLog = new Logs({ date, content });
    const saved = await newLog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: '添加失败', error: err.message });
  }
});

// 删除日志
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Logs.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: '日志未找到' });
    res.json({ message: '✅ 已删除日志' });
  } catch (err) {
    res.status(500).json({ message: '删除失败', error: err.message });
  }
});

// 修改日志
router.put('/:id', async (req, res) => {
  const { date, content } = req.body;
  if (!date || !content) {
    return res.status(400).json({ message: '请提供完整的 date 和 content' });
  }

  try {
    const updated = await Logs.findByIdAndUpdate(req.params.id, { date, content }, { new: true });
    if (!updated) return res.status(404).json({ message: '日志未找到' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: '修改失败', error: err.message });
  }
});

module.exports = router;
