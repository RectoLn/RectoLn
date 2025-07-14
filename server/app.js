const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// 路由模块
const postRoutes = require('./routes/postRoutes');
const messageRoutes = require('./routes/messageRoutes');
const logRoutes = require('./routes/logRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(bodyParser.json());

// API 路由挂载
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/logs', logRoutes);

// 静态文件服务（用于托管前端页面）
app.use(express.static('public'));

// 连接 MongoDB 数据库
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ 已连接数据库');
  app.listen(PORT, () => {
    console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ 数据库连接失败', err);
});
