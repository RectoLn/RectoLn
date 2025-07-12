const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String, // 图片路径或 URL
  },
  category: {
    type: String,
  },  // 可选：文章分类   
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Post', postSchema);
