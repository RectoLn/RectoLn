const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { type: String, default: '匿名' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
