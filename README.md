
# 🥥 Recto's Blog

一个粉蓝色简约日系风格的个人博客项目，支持文章发布、展示与留言板功能。该项目基于 **Node.js + Express + MongoDB** 实现，支持动态发布文章、上传封面、自动分类、轮播展示推荐文章，并包含个性化主页和社交媒体环形图标展示。

## ✨ 项目亮点

- 响应式前端 UI，夏日日系配色
- 支持 Markdown 渲染与富文本发布
- 首页头像与社交平台图标围绕旋转，互动性强
- 博客文章分类、推荐、分页
- 留言板功能，前后端支持
- 动态部署，支持环境变量配置
- MongoDB Atlas 云端数据库支持
- 可部署至 Heroku / Vercel / 自有服务器

## 🏗️ 技术栈

- **前端**：HTML + CSS + 原生 JS（无框架）
- **后端**：Node.js + Express
- **数据库**：MongoDB / MongoDB Atlas
- **部署推荐**：Heroku / Railway / 阿里云 ECS / Render



## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/yourusername/recto-blog.git
cd recto-blog
```

### 2. 安装依赖

```bash
npm install

```

### 3. 配置环境变量 `.env`

在根目录下创建 `.env` 文件，示例如下：

```env
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/recto_blog?retryWrites=true&w=majority
```

### 4. 运行项目

```bash
node server.js
```

访问：[http://localhost:3000](http://localhost:3000)

---

## 🌐 自定义部署指南

### 👉 Heroku（快速免费部署）

1. 注册 [Heroku](https://heroku.com)
2. 安装 Heroku CLI 并登录
3. 创建应用

```bash
heroku create recto-blog
git push heroku main
```

4. 设置数据库 URI（MongoDB Atlas）

```bash
heroku config:set MONGODB_URI="你的数据库连接字符串"
```

5. 绑定域名（可选）并访问

---

## 📁 项目结构

```bash
recto-blog/
│
├── public/                # 静态资源（HTML/CSS/JS/images）
│   ├── css/
│   ├── js/
│   └── images/
│
├── views/                 # 页面模板（可选，若使用模板引擎）
│
├── routes/                # 路由逻辑（RESTful接口）
│
├── models/                # Mongoose 数据模型
│
├── server.js             # 项目入口
├── package.json
└── .env                  # 环境变量（部署时加入.gitignore）
```

---

## ✏️ 博客功能

| 页面                    | 功能说明             |
| --------------------- | ---------------- |
| 首页 `/`                | 显示头像、旋转社交图标、推荐文章 |
| 文章列表 `/articles.html` | 分类导航 + 所有文章卡片展示  |
| 留言板 `/guestbook.html` | 可留言、展示留言         |
| 后台 `/admin.html`      | 发布文章、修改、删除（本地管理） |
| 关于我 `/about.html`     | 带头像 + 自我介绍 + 社交环 |

---

## 🧪 示例截图

> 📸 *可以插入你的博客首页、文章详情页、留言板的截图*

---

## 📮 联系我

* GitHub: [@RectoLn](https://github.com/RectoLn)
* B站: [Recto](https://space.bilibili.com/512551013)
* 知乎: [林子越](https://www.zhihu.com/people/lin-zi-yue-66-34)
* Notion: [Recto Notion](https://faint-haumea-a9c.notion.site/)
* 小红书、邮箱、更多见首页社交图标 🌸

---

## 📜 License

MIT © RectoLn


