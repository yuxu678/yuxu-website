# 网站文章格式参考

## 文件结构

```
网站根目录/
├── index.html              # 首页（含文章栏目）
├── article-detail.html     # 文章详情页 (?id=XXX)
├── articles.html           # 文章列表页
├── articles-data.js        # 文章元数据
└── articles-content.js     # 文章完整内容
```

## 数据文件格式

### articles-data.js

```javascript
var latestArticles = [
  { id: "2639", date: "2024-08-30", title: "喻旭：送你一份《转型变革指南》" },
  // ... 按时间倒序排列
];
```

- `id` 为字符串类型
- `date` 格式 `YYYY-MM-DD`
- 必须按时间倒序（最新在前）

### articles-content.js

```javascript
var articlesContent = [
  {
    "id": "2639",
    "date": "2024-08-30 01:22:17",
    "title": "文章标题",
    "content": "\n<p>内容HTML...</p>"
  },
];
```

- 顺序与 `latestArticles` 一致
- `content` 为原始 HTML，需做 JavaScript 字符串转义

## 首页文章区域

| 项目 | 值 |
|------|-----|
| 容器 ID | `article-grid` |
| 每页数量 | 6 |
| 分页按钮前缀 | `article-page-` |
| 上一页 ID | `article-prev` |
| 下一页 ID | `article-next` |

## 标签分类

| 关键词 | 标签名 | 颜色 |
|--------|--------|------|
| ChatGPT, 提示词, AI, 数字人 | AI应用 | primary |
| 数字化, 数转, 信息化, 转型 | 数字化转型 | accent-cyan |
| 营销, 品牌 | 营销策略 | accent-gold |
| 读书, 培训, 课程 | 个人成长 | accent-gold |
| (默认) | 商业洞察 | primary |

## 内容 HTML 样式

- `<p>` - 段落 (color: #94a3b8)
- `<h2>` `<h3>` - 标题 (color: #f8afc)
- `<strong>` - 加粗 (color: #e2e8f0)
- `<ul>` `<ol>` `<li>` - 列表
- `<blockquote>` - 引用 (color: #14b8a6 border)
- `<figure class="wp-block-image">` - 图片容器
- `<img>` - 图片 (max-width: 100%)
- `<a>` - 链接 (color: #14b8a6)