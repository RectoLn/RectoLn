// public/js/changelog.js

const form = document.getElementById('logForm');
const logDateInput = document.getElementById('logDate');
const logContentInput = document.getElementById('logContent');
const logList = document.getElementById('logList');
const status = document.getElementById('status');

let logs = [];
let editingIndex = -1;

// 加载日志列表
async function loadLogs() {
  try {
    const res = await fetch('/api/changelog');
    if (!res.ok) throw new Error('加载失败');
    logs = await res.json();
    renderLogs();
  } catch (e) {
    logList.innerHTML = '<p style="color:#d00;">加载日志失败，请刷新重试。</p>';
  }
}

// 渲染日志列表
function renderLogs() {
  if (logs.length === 0) {
    logList.innerHTML = '<p>暂无更新日志</p>';
    return;
  }

  logList.innerHTML = '';
  logs.forEach((log, i) => {
    const item = document.createElement('div');
    item.className = 'log-item';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'log-content';
    contentDiv.textContent = `${log.date} - ${log.content}`;

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'log-buttons';

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '编辑';
    editBtn.onclick = () => startEdit(i); // ✅ 添加事件

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '删除';
    deleteBtn.onclick = () => deleteLog(i); // ✅ 添加事件

    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);

    item.appendChild(contentDiv);
    item.appendChild(buttonGroup);
    logList.appendChild(item);
  });
}

// 开始编辑
function startEdit(index) {
  editingIndex = index;
  logDateInput.value = logs[index].date;
  logContentInput.value = logs[index].content;
  status.textContent = `✏️ 编辑中：${logs[index].date}`;
}

// 删除日志
async function deleteLog(index) {
  if (!confirm('确认删除该日志吗？')) return;
  try {
    const res = await fetch(`/api/changelog/${index}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('删除失败');
    await loadLogs();
    status.textContent = '🗑️ 删除成功';
    form.reset();
    editingIndex = -1;
  } catch (e) {
    status.textContent = '❌ 删除失败';
  }
}

// 新增日志
async function addLog(log) {
  const res = await fetch('/api/changelog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(log),
  });
  if (!res.ok) throw new Error('添加失败');
}

// 编辑日志
async function updateLog(index, log) {
  const res = await fetch(`/api/changelog/${index}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(log),
  });
  if (!res.ok) throw new Error('修改失败');
}

// 表单提交事件
form.addEventListener('submit', async e => {
  e.preventDefault();
  const date = logDateInput.value;
  const content = logContentInput.value.trim();

  if (!date || !content) {
    status.textContent = '❌ 请填写完整日期和内容';
    return;
  }

  try {
    if (editingIndex >= 0) {
      await updateLog(editingIndex, { date, content });
      status.textContent = '✅ 修改成功';
      editingIndex = -1;
    } else {
      await addLog({ date, content });
      status.textContent = '✅ 添加成功';
    }

    form.reset();
    await loadLogs();
  } catch {
    status.textContent = '❌ 操作失败';
  }
});

// 页面加载时初始化
window.onload = loadLogs;


document.getElementById('homeLink').addEventListener('click', () => {
    const confirmExit = confirm('将退出发布者模式并返回首页，是否继续？');
    if (confirmExit) {
      window.location.href = '/index.html';
    }
});