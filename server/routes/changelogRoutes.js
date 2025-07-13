// server/routes/changelogRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const logFile = path.join(__dirname, '../../server/data/update-log.json');

// 读取日志数据
router.get('/', (req, res) => {
  fs.readFile(logFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: '读取日志失败' });
    res.json(JSON.parse(data));
  });
});

// 新增日志
router.post('/', (req, res) => {
  const { date, content } = req.body;
  if (!date || !content) return res.status(400).json({ message: '参数不完整' });

  fs.readFile(logFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: '读取日志失败' });

    const logs = JSON.parse(data);
    logs.unshift({ date, content }); // 新日志放最前
    fs.writeFile(logFile, JSON.stringify(logs, null, 2), err => {
      if (err) return res.status(500).json({ message: '写入失败' });
      res.json({ message: '添加成功' });
    });
  });
});

// 删除日志（根据索引）
router.delete('/:index', (req, res) => {
  const idx = parseInt(req.params.index);
  fs.readFile(logFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: '读取失败' });
    const logs = JSON.parse(data);
    if (idx < 0 || idx >= logs.length) return res.status(400).json({ message: '索引无效' });

    logs.splice(idx, 1);
    fs.writeFile(logFile, JSON.stringify(logs, null, 2), err => {
      if (err) return res.status(500).json({ message: '写入失败' });
      res.json({ message: '删除成功' });
    });
  });
});

// 修改日志（按索引）
router.put('/:index', (req, res) => {
  const idx = parseInt(req.params.index);
  const { date, content } = req.body;

  if (!date || !content) {
    return res.status(400).json({ message: '参数不完整' });
  }

  fs.readFile(logFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: '读取失败' });

    const logs = JSON.parse(data);
    if (idx < 0 || idx >= logs.length) {
      return res.status(400).json({ message: '索引无效' });
    }

    logs[idx] = { date, content };

    fs.writeFile(logFile, JSON.stringify(logs, null, 2), err => {
      if (err) return res.status(500).json({ message: '写入失败' });
      res.json({ message: '修改成功' });
    });
  });
});


module.exports = router;
