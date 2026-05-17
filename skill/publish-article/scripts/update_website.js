#!/usr/bin/env node
/**
 * Update website article files with a new article.
 *
 * Usage:
 *   node update_website.js <article.json> <website-dir>
 *
 * The article.json should have: { id, date, title, content }
 * website-dir is the root of the static website (e.g., e:\TRAE\my web)
 */

const fs = require('fs');
const path = require('path');

function escapeJsString(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

function main() {
  if (process.argv.length < 4) {
    console.error('Usage: node update_website.js <article.json> <website-dir>');
    process.exit(1);
  }

  const articlePath = path.resolve(process.argv[2]);
  const websiteDir = path.resolve(process.argv[3]);

  if (!fs.existsSync(articlePath)) {
    console.error('Article file not found:', articlePath);
    process.exit(1);
  }

  const articlesDataPath = path.join(websiteDir, 'articles-data.js');
  const articlesContentPath = path.join(websiteDir, 'articles-content.js');

  if (!fs.existsSync(articlesDataPath)) {
    console.error('articles-data.js not found in', websiteDir);
    process.exit(1);
  }

  const articleRaw = fs.readFileSync(articlePath, 'utf8');
  let article;
  try {
    article = JSON.parse(articleRaw);
  } catch (e) {
    console.error('Invalid article JSON:', e.message);
    process.exit(1);
  }

  if (!article.id) {
    article.id = String(Date.now()).slice(-6);
  }

  // ---- Update articles-data.js ----
  let dataJs = fs.readFileSync(articlesDataPath, 'utf8');
  const dataEntry = '  { id: "' + article.id + '", date: "' + article.date + '", title: "' + escapeJsString(article.title) + '" },';
  const dataInsertPoint = dataJs.indexOf('var latestArticles = [');
  if (dataInsertPoint >= 0) {
    const afterBracket = dataJs.indexOf('[', dataInsertPoint) + 1;
    dataJs = dataJs.slice(0, afterBracket) + '\n' + dataEntry + dataJs.slice(afterBracket);
  }
  fs.writeFileSync(articlesDataPath, dataJs, 'utf8');
  console.log('[OK] Updated articles-data.js');

  // ---- Update articles-content.js ----
  let contentJs = fs.readFileSync(articlesContentPath, 'utf8');
  const contentEntry = '  {\n    "id": "' + article.id + '",\n    "date": "' + article.date + '",\n    "title": "' + escapeJsString(article.title) + '",\n    "content": "' + escapeJsString(article.content) + '"\n  },';
  const contentInsertPoint = contentJs.indexOf('var articlesContent = [');
  if (contentInsertPoint >= 0) {
    const afterBracket = contentJs.indexOf('[', contentInsertPoint) + 1;
    contentJs = contentJs.slice(0, afterBracket) + '\n' + contentEntry + contentJs.slice(afterBracket);
  }
  fs.writeFileSync(articlesContentPath, contentJs, 'utf8');
  console.log('[OK] Updated articles-content.js');

  console.log('\n[DONE] Article published successfully!');
  console.log('  ID: ' + article.id);
  console.log('  Title: ' + article.title);
  console.log('  Date: ' + article.date);
}

main();