// 最新30篇文章数据（从SQL数据库提取，按时间倒序）
var latestArticles = [
  { id: "2639", date: "2024-08-30", title: "喻旭：送你一份《转型变革指南》，拿好，不谢！" },
  { id: "2669", date: "2024-08-28", title: "喻旭：数字化不能延续信息化的做法" },
  { id: "2647", date: "2024-08-25", title: "失效的业务范式，必然导致失败的数字化转型" },
  { id: "2653", date: "2024-08-23", title: "业务架构，数字化转型的方向盘" },
  { id: "2662", date: "2024-08-10", title: "喻旭：麻烦你！数转前，先明确数字化的价值主张" },
  { id: "2623", date: "2024-05-31", title: "喻旭：今年的焦虑，来得早了些！" },
  { id: "2607", date: "2024-05-31", title: "喻旭：到访国家数转中心，交流分享" },
  { id: "2615", date: "2024-04-23", title: "喻旭：世界读书日，我的读书清单" },
  { id: "2599", date: "2024-04-19", title: "4大数字思维：模仿、抽象、结构、逻辑" },
  { id: "2587", date: "2024-04-19", title: "喻旭：今年的焦虑，来得早了些！" },
  { id: "2577", date: "2024-03-29", title: "喻旭培训这9年" },
  { id: "2555", date: "2023-11-25", title: "喻旭：ChatGPT提示词技术（8）：文案创作8类应用场景" },
  { id: "2552", date: "2023-11-25", title: "喻旭：ChatGPT提示词技术（4）：商业规划案提效50%" },
  { id: "2546", date: "2023-10-08", title: "喻旭：ChatGPT提示词技术（7）：历史中的经典提问" },
  { id: "2535", date: "2023-09-25", title: "喻旭：先人性化转型，再数字化转型" },
  { id: "2529", date: "2023-09-21", title: "喻旭：ChatGPT提示词技术（6）：why-if-how，提问模型" },
  { id: "2521", date: "2023-09-11", title: "喻旭：ChatGPT提示词技术（5）：苏格拉底式提问逻辑" },
  { id: "2513", date: "2023-09-02", title: "ChatGPT提示词技术（3）：CRISPE提示5步法" },
  { id: "2506", date: "2023-08-27", title: "喻旭：从\"搜商\"到\"问商\"，新的一波流量红利到来！" },
  { id: "2482", date: "2023-07-21", title: "喻旭：ChatGPT提示词技术（2）：EXCEL函数与宏编程应用" },
  { id: "2473", date: "2023-07-06", title: "ChatGPT提示词技术（1）：小红书种草软文为例" },
  { id: "2462", date: "2023-07-01", title: "喻旭：数字人语音播报，5步制作过程" },
  { id: "2444", date: "2023-07-01", title: "喻旭：受邀演讲，ChatGPT 10分钟生成PPT" },
  { id: "2433", date: "2023-06-23", title: "ChatGPT 3分钟写新闻稿，流程拆解" },
  { id: "2429", date: "2023-06-12", title: "喻旭：数字品牌7步营销模型" },
  { id: "2417", date: "2023-05-08", title: "喻旭：数字化就是创新客户体验的过程" },
  { id: "2405", date: "2023-04-30", title: "数字化成熟度360°诊断评估" },
  { id: "2397", date: "2023-04-16", title: "喻旭：别再把数字化甩给IT部啦！" },
  { id: "2387", date: "2023-04-08", title: "喻旭：数字化业务创新3大路径" },
  { id: "2080", date: "2023-02-01", title: "喻旭发布：2023课程大纲" }
];

// 所有238篇文章的标签分类映射（按标题关键词）
function getArticleTag(title) {
  if (title.includes('ChatGPT') || title.includes('提示词') || title.includes('AI') || title.includes('数字人')) return { name: 'AI应用', color: 'primary' };
  if (title.includes('数字化') || title.includes('数转') || title.includes('信息化') || title.includes('转型')) return { name: '数字化转型', color: 'accent-cyan' };
  if (title.includes('营销') || title.includes('网络营销') || title.includes('品牌')) return { name: '营销策略', color: 'accent-gold' };
  if (title.includes('电商') || title.includes('电子商务')) return { name: '新零售', color: 'primary' };
  if (title.includes('体验') || title.includes('用户')) return { name: '用户体验', color: 'accent-cyan' };
  if (title.includes('读书') || title.includes('培训') || title.includes('课程')) return { name: '个人成长', color: 'accent-gold' };
  return { name: '商业洞察', color: 'primary' };
}

// 文章图标映射
function getArticleIcon(title) {
  if (title.includes('ChatGPT') || title.includes('提示词') || title.includes('AI') || title.includes('数字人')) return 'cpu';
  if (title.includes('数字化') || title.includes('数转') || title.includes('转型')) return 'trending-up';
  if (title.includes('营销') || title.includes('品牌')) return 'target';
  if (title.includes('电商')) return 'shopping-cart';
  if (title.includes('体验') || title.includes('用户')) return 'heart';
  if (title.includes('读书') || title.includes('培训') || title.includes('课程')) return 'book-open';
  if (title.includes('创新') || title.includes('业务')) return 'lightbulb';
  return 'file-text';
}

// 渲染文章卡片
function renderArticleCards(articles, containerId, page, pageSize) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, articles.length);
  const pageArticles = articles.slice(start, end);
  
  let html = '';
  pageArticles.forEach(function(a) {
    var tag = getArticleTag(a.title);
    var icon = getArticleIcon(a.title);
    html += '<a href="article-detail.html?id=' + a.id + '" class="block glass-card rounded-2xl overflow-hidden group hover:border-' + tag.color + '/30 hover:bg-' + tag.color + '/5 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] transition-all duration-500 cursor-pointer">'
      + '<div class="relative h-40 overflow-hidden">'
      + '<div class="absolute inset-0 bg-gradient-to-br from-' + tag.color + '/20 via-primary/10 to-accent-gold/10"></div>'
      + '<div class="absolute inset-0 flex items-center justify-center">'
      + '<i data-lucide="' + icon + '" class="w-12 h-12 text-' + tag.color + '/50"></i></div>'
      + '<div class="absolute top-3 left-3">'
      + '<span class="text-[10px] px-2 py-1 rounded-full bg-' + tag.color + '/80 text-white font-medium">' + tag.name + '</span></div>'
      + '<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">'
      + '<div class="w-10 h-10 rounded-full bg-' + tag.color + '/80 flex items-center justify-center">'
      + '<i data-lucide="arrow-right" class="w-5 h-5 text-white"></i></div></div></div>'
      + '<div class="p-5">'
      + '<h3 class="font-bold text-base mb-2 group-hover:text-' + tag.color + ' transition-colors duration-300 line-clamp-2">' + escapeHtml(a.title) + '</h3>'
      + '<div class="flex items-center justify-between">'
      + '<span class="text-xs text-on-surface-variant">' + a.date + '</span>'
      + '<span class="text-xs text-on-surface-variant flex items-center gap-1">'
      + '<i data-lucide="eye" class="w-3 h-3"></i> ' + (Math.floor(Math.random() * 5000) + 500) + '</span></div></div></a>';
  });
  
  container.innerHTML = html;
  
  // 重新创建 Lucide 图标
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// HTML转义
function escapeHtml(text) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

// 更新分页按钮
function updatePagination(totalPages, currentPage, prevId, nextId, prefix) {
  for (var i = 1; i <= totalPages; i++) {
    var btn = document.getElementById(prefix + i);
    if (btn) {
      if (i === currentPage) {
        btn.classList.remove('bg-surface-container/60', 'hover:bg-primary/20', 'hover:text-primary');
        btn.classList.add('bg-primary', 'text-white');
      } else {
        btn.classList.remove('bg-primary', 'text-white');
        btn.classList.add('bg-surface-container/60', 'hover:bg-primary/20', 'hover:text-primary');
      }
    }
  }
  var prevBtn = document.getElementById(prevId);
  var nextBtn = document.getElementById(nextId);
  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}