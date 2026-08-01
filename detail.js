/* dataset.html 详情渲染：九段数据集卡片（含字段 schema / 数据质量 / 局限与偏差 / 分析结论 / 来源许可）。
   优先级：LOCAL_RICH（手写精选）> REMOTE_BENCHMARKS（远程真实基准）> DOMAIN_TEMPLATES（领域注记）> 兜底。 */
(function () {
  const CATALOG = window.CATALOG || { items: [] };
  const TPL = window.DOMAIN_TEMPLATES || {};
  const PROF = window.PROFILES || {};
  const RICH = window.LOCAL_RICH || {};
  const RICH_EN = window.LOCAL_RICH_EN || {};
  const TPL_EN = window.DOMAIN_TEMPLATES_EN || {};
  const DESC = window.DATASETS_DESC || {};
  const RB = window.REMOTE_BENCHMARKS || {};
  const RB_EN = window.REMOTE_BENCHMARKS_EN || {};
  const items = CATALOG.items || [];

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const num = (n) => (n == null ? "—" : Number(n).toLocaleString());
  // 在分隔符处插入 <wbr>，让长 slug/命令在 / 与 - 处自然断行（配合 CSS overflow-wrap，避免任意字符硬截断）
  const wbrRef = (s) => esc(s).replace(/\//g, "/<wbr>").replace(/-/g, "-<wbr>");
  // i18n 助手：取当前语言文案（window.t 由 i18n.js 提供；缺省回退原文）。
  // 注意：本文件内变量 t 已被用作「领域模板对象」，i18n 统一用 tr()。
  const tr = window.t || function (k) { return k; };

  // 轻量 markdown → HTML（Kaggle 真实描述常含 ### 标题、代码块、列表、链接）。
  // 先整体转义防 XSS，再重建安全标签；链接仅放行 http(s)/mailto/相对路径。
  function renderMd(src) {
    if (!src) return "";
    const E = (s) => String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const codeBlocks = [];
    let s = String(src).replace(/```(?:[a-zA-Z0-9_-]*)?\n([\s\S]*?)```/g, (m, code) => {
      codeBlocks.push(code.replace(/\n+$/, ""));
      return " CODE" + (codeBlocks.length - 1) + " ";
    });
    s = E(s);
    // 归一标题层级，避免内容里混用 #/##/###/#### 或漏换行导致渲染错乱：
    // 1) 段落中间的 ## / ### 提到独立行；2) 任何层级的标题统一成 ###（渲染为 h4，吃同一套层级样式）；
    // 3) 删掉只有 # 没有文字的悬空行与行尾悬空 #。URL 里的 # 片段不受影响（其后无空白）。
    s = s.replace(/(\S)(#{2,6}[ \t]+)/g, "$1\n$2");
    s = s.replace(/^#{1,6}[ \t]+/gm, "### ");
    s = s.replace(/^#{1,6}[ \t]*$/gm, "");
    s = s.replace(/(#{2,6})[ \t]*$/gm, "");
    s = s.replace(/`([^`\n]+)`/g, (m, c) => "<code>" + c + "</code>");
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => {
      const safe = /^(https?:|mailto:|\/)/i.test(u) ? u : "#";
      return '<a href="' + safe + '" target="_blank" rel="noopener">' + t + "</a>";
    });
    s = s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
    s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<i>$2</i>");
    const lines = s.split("\n");
    let html = "", inList = false, listItems = [], firstBlock = true;
    let inQuote = false, quoteBuf = [];
    let paraBuf = [];
    // 段内软换行（Kaggle 官方描述常带固定列宽硬换行）按标准 Markdown 语义合并为空格：
    // 只有当遇到空行 / 标题 / 列表 / 引用 / 代码时才真正分段，避免「stories\nand」这种割裂语义的乱换行。
    const flushPara = () => {
      if (!paraBuf.length) return;
      const txt = paraBuf.join(" ").replace(/\s+/g, " ").trim();
      paraBuf = [];
      if (!txt) return;
      const cls = (firstBlock && /<b>/.test(txt)) ? " class=\"lead\"" : "";
      html += "<p" + cls + ">" + txt + "</p>";
      firstBlock = false;
    };
    const flushList = () => {
      if (inList) { html += "<ul>" + listItems.map((x) => "<li>" + x + "</li>").join("") + "</ul>"; listItems = []; inList = false; }
    };
    const flushQuote = () => {
      if (inQuote) { html += "<blockquote class=\"callout\">" + quoteBuf.join("<br>") + "</blockquote>"; quoteBuf = []; inQuote = false; }
    };
    for (const line of lines) {
      const cm = line.match(/ CODE(\d+) /);
      if (cm) {
        flushPara(); flushList(); flushQuote();
        html += "<pre><code>" + E(codeBlocks[+cm[1]]) + "</code></pre>";
        const rest = line.replace(/ CODE\d+ /g, "").trim();
        if (rest) { html += "<p>" + rest + "</p>"; firstBlock = false; }
        continue;
      }
      const q = line.match(/^\s*&gt;\s?(.*)$/);
      if (q) { flushPara(); flushList(); if (!inQuote) inQuote = true; quoteBuf.push(q[1]); continue; }
      const h = line.match(/^(#{1,6})[ \t]+(.*)$/);
      if (h) {
        flushPara(); flushList(); flushQuote();
        const lvl = Math.min(6, Math.max(4, 7 - h[1].length));
        const cls = firstBlock ? " class=\"h-lead\"" : "";
        html += "<h" + lvl + cls + ">" + h[2] + "</h" + lvl + ">";
        firstBlock = false; continue;
      }
      const ul = line.match(/^\s*[-*]\s+(.*)$/);
      if (ul) { flushPara(); flushQuote(); inList = true; listItems.push(ul[1]); continue; }
      if (line.trim() === "") { flushPara(); flushList(); flushQuote(); continue; }
      flushList(); flushQuote();
      paraBuf.push(line.trim());
    }
    flushPara(); flushList(); flushQuote();
    return html;
  }

  // ② 长文渲染：给小节标题加 id、生成目录、拆分「常驻锚点 / 可折叠正文」，并判定是否过长需折叠。
  function renderWriteup(wu) {
    if (!wu) return { html: "", toc: [], anchor: "", rest: "", isLong: false };
    const rawLen = wu.replace(/\s/g, "").length;
    let html = renderMd(wu);
    const toc = [];
    let n = 0;
    html = html.replace(/<h4>([\s\S]*?)<\/h4>/g, (m, t) => {
      const id = "wuh-" + (n++);
      const txt = t.replace(/<[^>]+>/g, "").trim();
      if (txt) toc.push({ id, t: txt });
      return `<h4 id="${id}">${t}</h4>`;
    });
    // 常驻锚点：结论卡 / 首个标题 / 首个段落，置于折叠区外，确保收起时首屏仍有抓手。
    let anchor = "", rest = html;
    const am = html.match(/^(<p class="lead">[\s\S]*?<\/p>|<h4 class="h-lead">[\s\S]*?<\/h4>|<p>[\s\S]*?<\/p>|<h4>[\s\S]*?<\/h4>|<ul>[\s\S]*?<\/ul>)/);
    if (am) { anchor = am[1]; rest = html.slice(am[0].length); }
    return { html, toc, anchor, rest, isLong: rawLen > 1100 };
  }

  // 速览卡：常驻核心指标 chip（折叠态也能秒看）。优先用结构化基准 results，回退才抽长文加粗术语。
  function extractChips(wu, results) {
    const chips = [], seen = new Set();
    const push = (t, max) => {
      t = (t || "").trim();
      if (!t || seen.has(t) || t.length < 2 || t.length > max) return;
      if (/[，。、；：！？·\s]/.test(t)) return;
      if (/^(大家|我们|他们|一种|这个|那个|这些|那些|其实|所以|但是|因为|如果|比如|简单说|换句话说|一句话结论|核心结论|结论|小结|提示|注意|注|来源|引用|字段|类型|角色|说明)$/.test(t)) return;
      seen.add(t); chips.push(t);
    };
    if (results && results.length) {
      for (const r of results) {
        const ms = r.match(/[\u4e00-\u9fffA-Za-z/.\-]{1,12}\s*[≈~=]\s*\d[\d.]*%?|\d[\d.]*%/g) || [];
        for (const m of ms) { push(m, 18); if (chips.length >= 4) break; }
        if (chips.length >= 4) break;
      }
    }
    if (chips.length < 4 && wu) {
      const bs = wu.match(/\*\*([^*]+)\*\*/g) || [];
      for (const raw of bs) { push(raw.replace(/\*\*/g, ""), 12); if (chips.length >= 4) break; }
    }
    return chips.slice(0, 4);
  }

  // 超长描述（Kaggle 有的 >1.5 万字符）折叠：首段渲染 + 展开按钮显示剩余。
  function buildOverviewDesc(desc) {
    if (!desc) return "";
    if (desc.length <= 2600) return renderMd(desc);
    const parts = desc.split(/\n\s*\n/);
    let acc = "", i = 0;
    for (; i < parts.length; i++) {
      if ((acc + parts[i]).length > 2200) break;
      acc += parts[i] + "\n\n";
    }
    const first = acc.trim();
    const rest = parts.slice(i).join("\n\n").trim();
    if (!rest) return renderMd(desc);
    return renderMd(first) +
      '<button class="morebtn" onclick="this.nextElementSibling.hidden=false;this.remove()">' + tr("expand_desc") + '</button>' +
      '<div class="more" hidden>' + renderMd(rest) + "</div>";
  }

  function getItem() {
    const id = new URLSearchParams(location.search).get("id") || "";
    return items.find((it) => it.ref === id) || null;
  }
  function seg(title, body, cls) {
    return `<section class="seg${cls ? " " + cls : ""}"><h3>${esc(title)}</h3>${body}</section>`;
  }
  function ul(arr, cls) {
    if (!arr || !arr.length) return "<p class='muted'>—</p>";
    const c = cls ? ` class="${cls}"` : "";
    return `<ul${c}>` + arr.map((x) => `<li>${esc(x)}</li>`).join("") + "</ul>";
  }

  function renderRemoteMeta(it) {
    const u = Math.max(0, Math.min(1, Number(it.usability) || 0));
    const pct = Math.round(u * 100);
    const W = 240, H = 16;
    const barW = Math.round(W * u);
    const bar = `<svg viewBox="0 0 ${W} ${H}" width="100%" class="vsvg" role="img" aria-label="usability">` +
      `<rect x="0" y="0" width="${W}" height="${H}" rx="8" class="vbar-bg"></rect>` +
      `<rect x="0" y="0" width="${barW}" height="${H}" rx="8" class="vbar-fg"></rect>` +
      `<text x="${W/2}" y="12" class="vbar-txt">${pct}%</text></svg>`;
    const grid = [
      [tr("m_size"), esc(it.size || "—")],
      [tr("m_downloads"), num(it.downloadCount)],
      [tr("m_votes"), num(it.voteCount)],
      [tr("m_domain"), esc((it.domains || []).join("、"))],
    ];
    return `<div class="remote-profile">` +
      `<div class="rp-grid">` + grid.map((kv) => `<div class="rp-item"><span class="rp-k">${kv[0]}</span><span class="rp-v">${kv[1]}</span></div>`).join("") + `</div>` +
      `<div class="rp-bar"><span class="rp-k">${tr("m_usability")}</span>${bar}</div>` +
      `<p class="muted">${tr("viz_remote_note")}</p>` +
      `</div>`;
  }

  // ⑪ 相关资源联动（领域 → 子站推荐 + 同领域数据集；子站已做 EN 自动跳转，故链接统一指中文页文件名）
  const REL_MAP = {
    "Audio/Speech": [["🤖", "模型中心 · 语音/多模态模型", "Model Hub · speech & multimodal", "models.html"], ["🔌", "API 目录 · Whisper 识别 / TTS 配音", "APIs · Whisper ASR / TTS", "apis.html"]],
    "Biology/Science": [["🤖", "模型中心 · 科学计算模型", "Model Hub · scientific models", "models.html"], ["📐", "项目模板 · ML Pipeline", "Templates · ML Pipeline", "templates.html"]],
    "Computer Vision": [["🤖", "模型中心 · 视觉理解/图像生成", "Model Hub · vision & image gen", "models.html"], ["📐", "项目模板 · 多模态应用", "Templates · multimodal app", "templates.html"]],
    "Education": [["📐", "项目模板 · 全栈应用", "Templates · full-stack apps", "templates.html"], ["🦾", "智能体框架 · 教学助手", "Agent frameworks · tutors", "agents.html"]],
    "Energy/Industry": [["🏗", "技术栈百科 · 数据管线组合", "Stacks · data pipeline combos", "stacks.html"], ["📐", "项目模板 · ETL 管线", "Templates · ETL pipeline", "templates.html"]],
    "Entertainment/Media": [["🔌", "API 目录 · 内容/生成 API", "APIs · content & generation", "apis.html"], ["🤖", "模型中心 · 推荐/生成模型", "Model Hub · recsys & generative", "models.html"]],
    "Environment": [["🏗", "技术栈百科 · 数据分析组合", "Stacks · analytics combos", "stacks.html"], ["📐", "项目模板 · ETL 管线", "Templates · ETL pipeline", "templates.html"]],
    "Finance/Economics": [["🏗", "技术栈百科 · 量化数据栈", "Stacks · quant data stack", "stacks.html"], ["📐", "项目模板 · ML Pipeline", "Templates · ML Pipeline", "templates.html"]],
    "Food/Agriculture": [["🏗", "技术栈百科 · 数据分析组合", "Stacks · analytics combos", "stacks.html"], ["📐", "项目模板 · 数据管线", "Templates · data pipelines", "templates.html"]],
    "Government": [["📐", "项目模板 · 数据 API 服务", "Templates · data API service", "templates.html"], ["🔌", "API 目录 · 公开数据 API", "APIs · open data", "apis.html"]],
    "Health/Medical": [["🤖", "模型中心 · 医疗/文本模型", "Model Hub · medical & text", "models.html"], ["📐", "项目模板 · ML Pipeline", "Templates · ML Pipeline", "templates.html"]],
    "Housing/Real Estate": [["📐", "项目模板 · ML Pipeline", "Templates · ML Pipeline", "templates.html"], ["🏗", "技术栈百科 · 数据栈", "Stacks · data stack", "stacks.html"]],
    "Jobs/Labor": [["📐", "项目模板 · 数据管线", "Templates · data pipelines", "templates.html"], ["💻", "AI 编码 · 分析脚本提效", "AI Coding · analytics scripts", "ai-coding.html"]],
    "Language": [["🤖", "模型中心 · LLM 对话", "Model Hub · LLMs", "models.html"], ["📐", "项目模板 · RAG 应用", "Templates · RAG app", "templates.html"]],
    "NLP/Text": [["🤖", "模型中心 · LLM 对话", "Model Hub · LLMs", "models.html"], ["📐", "项目模板 · RAG 应用", "Templates · RAG app", "templates.html"], ["🦾", "智能体框架 · 文本 Agent", "Agent frameworks · text agents", "agents.html"]],
    "Sales/Retail": [["📐", "项目模板 · 实时看板/数据管线", "Templates · dashboards & pipelines", "templates.html"], ["🏗", "技术栈百科 · 分析组合", "Stacks · analytics combos", "stacks.html"]],
    "Security": [["🤖", "模型中心 · 检测/分类模型", "Model Hub · detection models", "models.html"], ["📐", "项目模板 · ML Pipeline", "Templates · ML Pipeline", "templates.html"]],
    "Social/Web": [["🔌", "API 目录 · 社媒/内容 API", "APIs · social & content", "apis.html"], ["🤖", "模型中心 · NLP/推荐模型", "Model Hub · NLP & recsys", "models.html"]],
    "Sports": [["🔌", "API 目录 · 体育数据 API", "APIs · sports data", "apis.html"], ["📐", "项目模板 · 数据管线", "Templates · data pipelines", "templates.html"]],
    "Time Series": [["🏗", "技术栈百科 · 时序数据栈", "Stacks · time-series stack", "stacks.html"], ["📐", "项目模板 · ML Pipeline", "Templates · ML Pipeline", "templates.html"]],
  };
  const REL_DEFAULT = [["🚀", "Vibecoding 枢纽 · 全部资源", "Vibecoding Hub · all resources", "hub.html"], ["🧭", "进阶路径 · 从想法到上线", "Pathway · idea to launch", "pathway.html"]];
  function renderRelated(it, dom) {
    const subs = REL_MAP[dom] || REL_DEFAULT;
    const isEn = window.LANG === "en";
    const same = items.filter((x) => x.ref !== it.ref && (x.domains || [])[0] === dom)
      .sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0)).slice(0, 5);
    let h = '<div class="rel-grid"><div class="rel-card"><div class="rel-h">' + esc(tr("rel_subsites")) + '</div>' +
      subs.map((s) => '<a class="rel-a" href="' + s[3] + '">' + s[0] + ' ' + esc(isEn ? s[2] : s[1]) + '</a>').join("") + '</div>';
    if (same.length) {
      h += '<div class="rel-card"><div class="rel-h">' + esc(tr("rel_datasets")) + ' · ' + esc(dom) + '</div>' +
        same.map((x) => '<a class="rel-a" href="dataset.html?ref=' + encodeURIComponent(x.ref) + '">📊 ' + esc(x.title || x.ref) + '</a>').join("") + '</div>';
    }
    return h + '</div>';
  }

  function render(it) {
    const dom = (it.domains && it.domains[0]) || "Other";
    const t = (window.LANG === "en" && TPL_EN[dom])
      ? Object.assign({}, TPL[dom] || {}, TPL_EN[dom])
      : (TPL[dom] || { intro: "", analysis: [], guidance: [], example: "", process: "" });
    const r = (window.LANG === "en" && RICH_EN[it.ref])
      ? Object.assign({}, RICH[it.ref] || {}, RICH_EN[it.ref])   // EN 模式：英文条目覆盖合并
      : (RICH[it.ref] || null);          // 本地精选内容（优先）
    const prof = PROF[it.ref] || null;
    const d = DESC[it.ref] || {};             // Kaggle 真实描述/副标题/许可

    const isLocal = !!it.local;
    const srcVal = isLocal
      ? (window.LANG === "en" ? "Local dataset (data included)" : "本地数据集（已含数据）")
      : (window.LANG === "en" ? "Kaggle public" : "Kaggle 公开");
    const metaRows = [["m_source", srcVal]];
    if (isLocal && prof) metaRows.push(["m_size", `${num(prof.rows)} 行 × ${num(prof.cols)} 列`]);
    else metaRows.push(["m_size", esc(it.size || "—")]);
    if (!isLocal) {
      metaRows.push(["m_downloads", num(it.downloadCount)]);
      metaRows.push(["m_votes", num(it.voteCount)]);
      metaRows.push(["m_usability", it.usability == null ? "—" : Number(it.usability).toFixed(2)]);
    }
    metaRows.push(["m_domain", esc((it.domains || []).join("、"))]);
    const meta = `<dl class="kv">` +
      metaRows.map(([k, v]) => `<dt>${tr(k)}</dt><dd>${esc(v)}</dd>`).join("") +
      `</dl>
      <p class="src">${tr("slug_label")}<code>${wbrRef(it.ref)}</code> · <a href="${esc(it.url)}" target="_blank" rel="noopener">${isLocal ? tr("kaggle_page") : tr("kaggle_view")}</a>${isLocal ? " " + tr("local_nodl") : ""}</p>`;

    // ① 概述：本地精选 > Kaggle 真实描述（markdown 渲染，超长折叠） > 领域模板
    const overview = (r ? `<p>${esc(r.desc)}</p>`
      : (d.description ? buildOverviewDesc(d.description) +
          `<p class="src muted">${tr("h_desc_src")}</p>`
        : `<p>${esc(t.intro)}</p>`));
    const s1 = seg(tr("seg1"), overview + meta);

    // ② 数据集结构（字段 schema）
    let structBody = "";
    if (r && r.cols && r.cols.length) {
      structBody += `<table class="schema">
        <tr><th>字段</th><th>类型</th><th>角色</th><th>说明</th></tr>` +
        r.cols.map((c) => `<tr><td><code>${esc(c.n)}</code></td><td>${esc(c.t)}</td><td>${esc(c.r)}</td><td>${esc(c.d)}</td></tr>`).join("") +
        `</table><p class="muted">目标列：<code>${esc(r.target || "—")}</code></p>`;
    } else if (prof && prof.columns) {
      structBody += `<p><b>字段（${prof.columns.length} 列）：</b></p><p class="cols">` +
        prof.columns.map((c) => `<code>${esc(c)}</code>`).join(" ") + `</p>` +
        (prof.note ? `<p class="muted">${esc(prof.note)}</p>` : "");
    } else {
      structBody = `<p>${esc(t.example || "字段结构见来源页。")}</p>`;
    }
    const s2 = seg(tr("seg3"), structBody);

    // ⑩ 数据可视化 / 远程结构预览
    let sViz = "";
    if (window.VIZ && window.VIZ[it.ref]) {
      sViz = seg(tr("viz_title"), window.renderViz(it.ref), "viz");
    } else if (!isLocal) {
      sViz = seg(tr("viz_title"), renderRemoteMeta(it), "viz remote");
    }

    // ③ 数据质量
    let qBody = "";
    if (r && r.quality) qBody = ul(r.quality);
    else if (prof) {
      const ls = it.localSummary;
      qBody = `<div class="localbox">本地数据画像： ${num(prof.rows)} 行 × ${num(prof.cols)} 列` +
        (ls && ls.target ? ` · 目标 <code>${esc(ls.target)}</code>` : "") +
        (prof.note ? ` · ${esc(prof.note)}` : "") + `</div>`;
    } else {
      qBody = `<p class="muted">${tr("s3_remote")}</p>`;
    }
    const s3 = seg(tr("seg4"), qBody);

    // ④ 适用任务与推荐模型
    let taskBody = "";
    if (r) {
      taskBody += `<p><b>适用任务：</b></p>` + ul(r.tasks);
      taskBody += `<p><b>推荐模型 / 基线：</b></p>` + ul(r.models);
    } else {
      taskBody = ul(t.guidance);
    }
    const s4 = seg(tr("seg5"), taskBody);

    // ⑤ 局限与偏差（负责任 AI 必备）
    let limBody = "";
    if (r && r.limits) limBody = ul(r.limits);
    else limBody = `<p class="muted">通用注意：${esc(t.intro ? "该类数据集通常存在类别不平衡、分布偏差与许可限制" : "请结合来源页说明评估局限")}；具体偏差以来源页披露为准。</p>`;
    const s5 = seg(tr("seg6"), limBody);

    // ⑥ 样例展示：本地派生样例表（优先 VIZ.sample）+ 远程/旧 prof 行为
    let s6body = "";
    const vz = (window.VIZ && window.VIZ[it.ref]) ? window.VIZ[it.ref] : null;
    if (vz && vz.sample && vz.sample.rows.length) {
      s6body += `<p class="muted">${tr("s6_sample_head", { n: vz.sample.rows.length, m: vz.sample.header.length })}</p>`;
      s6body += window.sampleTableHtml(vz.sample);
      s6body += `<p class="muted">${tr("s6_muted")}</p>`;
    } else if (prof && prof.chart) {
      s6body += `<div class="chart">${prof.chart}</div>`;
      if (prof.sample && prof.sample.rows.length) {
        const hd = prof.sample.header;
        s6body += `<p class="muted">${tr("s6_sample_head", { n: prof.sample.rows.length, m: hd.length })}</p>`;
        s6body += `<div class="chart"><table class="sample"><tr>` +
          hd.map((c) => `<th>${esc(c)}</th>`).join("") + `</tr>` +
          prof.sample.rows.map((row) => `<tr>` + row.map((c) => `<td>${esc(c)}</td>`).join("") + `</tr>`).join("") +
          `</table></div>`;
      }
      s6body += `<p class="muted">${tr("s6_muted")}</p>`;
    } else if (r) {
      s6body = `<p>${tr("s6_local")}</p>`;
    } else {
      const klink = `<a href="${esc(it.url)}" target="_blank" rel="noopener">${window.LANG === "en" ? "Kaggle dataset page ↗" : "Kaggle 数据集页 ↗"}</a>`;
      s6body = `<p>${esc(t.example)}</p><p class="muted">${tr("s6_remote", { kaggle: klink })}</p>`;
    }
    const s6 = seg(tr("seg7"), s6body);

    // ⑦ 来源与许可
    const srcBits = [];
    if (r && r.source) srcBits.push(`${tr("s7_source")}${esc(r.source)}`);
    if (r && r.license) srcBits.push(`${tr("s7_license")}${esc(r.license)}`);
    if (r && r.cite) srcBits.push(`${tr("s7_cite")}${esc(r.cite)}`);
    if (!r && d.licenses && d.licenses.length) srcBits.push(`${tr("s7_license")}${esc(d.licenses.join(" / "))}`);
    const s7 = seg(tr("seg8"),
      (srcBits.length ? `<ul class="cite">` + srcBits.map((x) => `<li>${x}</li>`).join("") + `</ul>` : `<p class="muted">${tr("s7_default")}</p>`) +
      `<p class="src">${tr("slug_label")}<code>${esc(it.ref)}</code> · <a href="${esc(it.url)}" target="_blank" rel="noopener">${tr("kaggle_page")}</a>` +
      (it.local ? " " + tr("local_nodl") : "") + `</p>`);

    // ⑧ 过程拆解
    const s8 = seg(tr("seg9"),
      `<p>${esc(t.process || tr("s8_default"))}</p>` +
      `<p class="muted">${tr("s8_process_link", { page: `<a href="process.html">${window.LANG === "en" ? "Process page" : "过程实现页"}</a>` })}<code>kaggle datasets download -d ${wbrRef(it.ref)}</code></p>`);

    // ② 分析结果与结论（提至开头钩子位）：长文 writeup > 本地 results > 远程真实基准 > 领域注记(诚实+方向) > 提示
    const rb = (window.LANG === "en" && RB_EN[it.ref])
      ? Object.assign({}, RB[it.ref] || {}, RB_EN[it.ref])
      : (RB[it.ref] || null);
    let s9body = "", s9src = "", s9rw = null, chipsHtml = "";
    // EN 模式：仅当 RB_EN 提供英文 writeup 时才用它；否则退回英文领域模板（t.analysis，已由 TPL_EN 合并），避免中文诚实注记泄漏。
    const wu = (r && r.writeup)
      ? r.writeup
      : (window.LANG === "en"
          ? ((RB_EN[it.ref] && RB_EN[it.ref].writeup) ? RB_EN[it.ref].writeup : null)
          : (rb && rb.writeup ? rb.writeup : null));
    if (wu) {
      s9rw = renderWriteup(wu);
      s9body = s9rw.html;
      const resForChips = (rb && rb.results) || (r && r.results) || null;
      const chips = extractChips(wu, resForChips);
      if (chips.length) chipsHtml = `<div class="wu-chips">` + chips.map((c) => `<span>${esc(c)}</span>`).join("") + `</div>`;
      if (rb && rb.source) {
        const u = rb.source;
        s9src = `<p class="muted">${tr("s9_bench_src")}<a href="${esc(u)}" target="_blank" rel="noopener">${esc(u)}</a></p>`;
      } else if (r && r.cite) {
        s9src = `<p class="muted">${tr("s9_cite")}${esc(r.cite)}</p>`;
      }
    } else if (r && r.results && r.results.length) {
      s9body = ul(r.results);
    } else if (rb && rb.results && rb.results.length) {
      s9body = ul(rb.results);
      if (rb.source) {
        const u = rb.source;
        s9src = `<p class="muted">${tr("s9_bench_src")}<a href="${esc(u)}" target="_blank" rel="noopener">${esc(u)}</a></p>`;
      }
    } else if (t.analysis && t.analysis.length) {
      s9body = `<p class="muted">${tr("s9_honest", { dom: esc(dom) })}</p>` + ul(t.analysis);
    } else {
      s9body = `<p class="muted">${tr("s9_fallback")}</p>`;
    }
    let s9;
    if (s9rw && s9rw.isLong) {
      const refId = it.ref.replace(/[^a-zA-Z0-9_-]/g, "_");
      const tocHtml = s9rw.toc.length
        ? `<nav class="wu-toc">` + s9rw.toc.map((h) => `<a href="#${h.id}" onclick="var d=this.closest('details.wu-rest');if(d)d.open=true;">${h.t}</a>`).join("") + `</nav>`
        : "";
      s9 = `<section class="seg writeup">
  <h3>${esc(tr("seg2"))}</h3>
  ${chipsHtml}
  ${s9rw.anchor}
  ${tocHtml}
  <details class="wu-rest"><summary class="wu-toggle">${tr("s9_readmore")}</summary>
  ${s9rw.rest}
  </details>
  ${s9src}
</section>`;
    } else {
      s9 = seg(tr("seg2"), chipsHtml + s9body + s9src, "writeup");
    }

    document.getElementById("detail").innerHTML =
      `<div class="hero"><h1>${esc((r && r.title) || it.title || it.ref)}</h1>` +
      (!r && d.subtitle ? `<p class="subtitle">${esc(d.subtitle)}</p>` : "") +
      (r ? `<p class="tagline">${tr("tag_local")}</p>`
        : (d.description ? `<p class="tagline">${tr("tag_kaggle")}${esc((it.domains || []).join("、"))}</p>` : `<p class="tagline">${tr("tag_generic")}</p>`)) +
      `</div>` + s1 + s9 + s2 + sViz + s3 + s4 + s5 + s6 + s7 + s8 + seg(tr("seg_rel"), renderRelated(it, dom), "related");
  }

  function init() {
    const it = getItem();
    if (!it) {
      document.getElementById("detail").innerHTML =
        `<div class="hero"><h1>${tr("not_found")}</h1></div><p>${tr("back_browse", { link: `<a href="datasets.html">${window.LANG === "en" ? "dataset browser" : "数据集浏览"}</a>` })}</p>`;
      return;
    }
    render(it);
  }
  document.addEventListener("DOMContentLoaded", init);
  window.__rerenderDetail = init; // 供语言切换器重新渲染
})();
