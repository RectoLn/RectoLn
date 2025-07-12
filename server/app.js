const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');
const messageRoutes = require('./routes/messageRoutes');  // 新增：留言路由

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 路由
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);  // 新增：挂载留言路由

// 静态文件支持（前端页面）
app.use(express.static('public'));

// 数据库连接
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ 已连接数据库');
  app.listen(PORT, () => console.log(`🚀 服务器运行在 http://localhost:${PORT}`));
}).catch(err => {
  console.error('❌ 数据库连接失败', err);
});
