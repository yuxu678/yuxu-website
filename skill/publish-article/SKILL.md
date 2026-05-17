---
name: publish-article
description: Publish a new article to the Yu Xu (喻旭) static website. Use when: (1) user has a Word (.docx) file with a new article, (2) user provides article text to be added to the website, (3) user needs to update articles-data.js and articles-content.js files and the homepage article cards.
---

# Publish Article

将新文章发布到喻旭个人品牌静态网站。当用户提供文章内容（Word文档或文本）时，按照此工作流更新网站文件。

## 工作流程

### 1. 接收文章内容

用户通过以下方式提供文章：
- **Word 文档** (.docx 文件路径)
- **纯文本** (用户粘贴或输入)
- **Markdown** (用户提供 Markdown 格式内容)

### 2. 提取/格式化文章

**如果是 .docx 文件：**
```bash
pip install python-docx
python scripts/extract_docx.py <path/to/article.docx> --date YYYY-MM-DD --title "文章标题"
```

脚本输出 JSON 格式。

**如果是纯文本或 Markdown：**
手动转换为网站适用的 HTML 格式。

### 3. 生成文章 ID

- 时间戳格式：使用 `Date.now()` 的后6位 (如 `"717438"`)
- 或日期格式：`YYYYMMDD` (如 `"20240517"`)
- 确保不与 `articlesContent` 中现有 ID 重复

### 4. 更新网站文件

#### 4a. 更新 articles-data.js

在 `latestArticles` 数组的**最顶部**插入新文章条目：

```javascript
// 插在最前面:
{ id: "NEW_ID", date: "YYYY-MM-DD", title: "文章标题" },
```

#### 4b. 更新 articles-content.js

在 `articlesContent` 数组的**最顶部**插入：

```javascript
{
    "id": "NEW_ID",
    "date": "YYYY-MM-DD HH:MM:SS",
    "title": "文章标题",
    "content": "\n<p>第一段...</p>\n\n<p>第二段...</p>"
},
```

**内容转义规则：**
- HTML 属性中的双引号：`"` → `\"`
- 换行符替换为字面 `\n`（反斜杠+n）
- 反斜杠本身：`\` → `\\`

#### 4c. 更新 index.html 分页

- `totalArticlePages = Math.ceil(latestArticles.length / 6)`
- 如果增加页数，添加对应的分页按钮

### 5. 验证

1. 打开 `index.html` 确认文章出现在第一页（最新文章优先）
2. 点击文章卡片验证详情页渲染正确
3. 检查浏览器控制台无错误

## 标签分类

根据文章标题关键词分配标签，默认"商业洞察"(primary颜色)。详见 [website-format.md](references/website-format.md)。

## 资源

### scripts/
- `extract_docx.py` - 从 Word 文档提取文章的 Python 脚本
- `update_website.js` - 更新网站文件的 Node.js 脚本

### references/
- `website-format.md` - 网站文章数据格式、HTML结构、标签分类的详细文档