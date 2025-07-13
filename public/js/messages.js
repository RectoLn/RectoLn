// public/js/admin-messages.js
const messageList = document.getElementById('messageList');
const status = document.getElementById('status');
document.getElementById('homeLink').addEventListener('click', () => {
    const confirmExit = confirm('将退出发布者模式并返回首页，是否继续？');
    if (confirmExit) {
      window.location.href = '/index.html';
    }
  });
// 加载留言
async function loadMessages() {
  try {
    const res = await fetch('/api/messages');
    const messages = await res.json();

    if (!Array.isArray(messages)) throw new Error('格式错误');

    messageList.innerHTML = '';

    messages.forEach((msg) => {
      const item = document.createElement('div');
      item.className = 'message-item';

      const content = document.createElement('div');
      content.className = 'message-content';

      // 使用 createdAt 替代错误的 msg.date
      const formattedDate = msg.createdAt
        ? new Date(msg.createdAt).toLocaleString()
        : '无时间信息';

      content.innerHTML = `
        <strong>${msg.name}</strong> (${formattedDate})<br/>
        ${msg.content}
      `;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '删除';
      deleteBtn.className = 'delete-btn';
      deleteBtn.onclick = () => deleteMessage(msg._id);

      item.appendChild(content);
      item.appendChild(deleteBtn);
      messageList.appendChild(item);
    });
  } catch (err) {
    messageList.innerHTML = '<p style="color:red;">留言加载失败</p>';
    console.error(err);
  }
}



// 删除留言
async function deleteMessage(id) {
  if (!confirm('确定要删除这条留言吗？')) return;

  try {
    const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    const result = await res.json();

    if (res.ok) {
      status.textContent = '✅ 删除成功';
      loadMessages();
    } else {
      status.textContent = '❌ 删除失败: ' + (result.message || '未知错误');
    }
  } catch (err) {
    status.textContent = '❌ 删除出错';
    console.error(err);
  }
}

window.onload = loadMessages;
