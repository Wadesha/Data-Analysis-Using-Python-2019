/* viz.js — 数据集基础可视化的内联 SVG 渲染器（无外部依赖，离线可用）。
   数据来自 web/data/viz.js（window.VIZ，仅派生聚合）。
   由 detail.js 在「⑩ 数据可视化」段落与「⑦ 样例」段调用。 */
(function () {
  'use strict';
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function t(k) { return (window.t && window.t(k)) || k; }
  function fmt(v) {
    if (v == null) return '';
    const a = Math.abs(v);
    if (a >= 1000) return (v / 1000).toFixed(a >= 10000 ? 0 : 1) + 'k';
    if (a >= 1) return String(Math.round(v * 10) / 10);
    return String(Math.round(v * 100) / 100);
  }

  // 横向条形图（目标分布 / 缺失率 / 类别计数）
  function barChart(items) {
    if (!items || !items.length) return '';
    const W = 520, pad = 8, rowH = 22, labelW = 150, valW = 52, barX = labelW + pad, barMax = W - barX - valW;
    const max = Math.max.apply(null, items.map(function (i) { return i.value; }).concat([1]));
    const H = pad * 2 + items.length * rowH;
    let s = '';
    items.forEach(function (it, idx) {
      const y = pad + idx * rowH;
      const w = Math.max(2, it.value / max * barMax);
      s += '<text x="0" y="' + (y + 14) + '" class="vlabel">' + esc(it.label) + '</text>' +
        '<rect x="' + barX + '" y="' + (y + 2) + '" width="' + w + '" height="16" rx="3" class="vbar"><title>' + esc(it.label) + ': ' + esc(it.value) + '</title></rect>' +
        '<text x="' + (barX + w + 6) + '" y="' + (y + 14) + '" class="vval">' + esc(it.value) + '</text>';
    });
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" class="vsvg" role="img" aria-label="bar chart">' + s + '</svg>';
  }

  // 纵向直方图（数值特征分布）
  function histChart(h) {
    const W = 300, H = 150, pad = 20, plotW = W - pad - 10, plotH = H - pad - 18, baseY = H - 18;
    const bins = h.bins || [];
    const max = Math.max.apply(null, bins.map(function (b) { return b.c; }).concat([1]));
    const n = bins.length, bw = plotW / Math.max(n, 1);
    let bars = '';
    bins.forEach(function (b, i) {
      const bh = b.c / max * plotH;
      const x = pad + i * bw;
      bars += '<rect x="' + (x + 1) + '" y="' + (baseY - bh) + '" width="' + Math.max(1, bw - 2) + '" height="' + bh + '" rx="2" class="vbar"><title>' + esc(h.name) + ' ' + fmt(b.x0) + '–' + fmt(b.x1) + ': ' + esc(b.c) + '</title></rect>';
    });
    const xt = '<text x="' + pad + '" y="' + (H - 4) + '" class="vaxis">' + fmt(bins[0] ? bins[0].x0 : '') + '</text>' +
      '<text x="' + (W - 10) + '" y="' + (H - 4) + '" class="vaxis" text-anchor="end">' + fmt(bins[bins.length - 1] ? bins[bins.length - 1].x1 : '') + '</text>';
    const meanT = h.mean != null ? '<text x="' + pad + '" y="12" class="vmean">mean ' + fmt(h.mean) + '</text>' : '';
    return '<div class="vchart"><div class="vname">' + esc(h.name) + '</div>' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" class="vsvg" role="img" aria-label="histogram">' + bars + xt + meanT + '</svg></div>';
  }

  // 渲染某数据集的完整可视化段落（HTML 片段）
  function renderViz(slug) {
    var V = window.VIZ && window.VIZ[slug];
    if (!V) return '';
    var html = '';
    // 摘要条
    var summ = t('viz_rows') + ' ' + V.rows.toLocaleString() + (V.sampled ? '*' : '') +
      ' · ' + t('viz_cols') + ' ' + V.cols +
      ' · ' + t('viz_missingpct') + ' ' + V.missing.overall + '%';
    html += '<div class="vstrip">' + esc(summ) + (V.sampled ? ' <span class="vmuted">(' + t('viz_sampled') + ')</span>' : '') + '</div>';
    // 目标分布
    if (V.target) {
      var ttl = V.target.kind === 'bar' ? t('viz_target_dist') : t('viz_target_hist');
      html += '<div class="vcard"><div class="vh">' + esc(ttl) + ' · <code>' + esc(V.target.name) + '</code></div>' +
        (V.target.kind === 'bar' ? barChart(V.target.items) : histChart(V.target)) + '</div>';
    }
    // 额外分类列（如 wine 的 type）
    (V.extra || []).forEach(function (e) {
      html += '<div class="vcard"><div class="vh">' + esc(e.name) + '</div>' + barChart(e.items) + '</div>';
    });
    // 特征直方图网格
    if (V.features && V.features.length) {
      html += '<div class="vh section">' + t('viz_feature_dist') + '</div><div class="vgrid">' +
        V.features.map(histChart).join('') + '</div>';
    }
    // 缺失率
    if (V.missing.noMissing) {
      html += '<div class="vnote">' + t('viz_no_missing') + '</div>';
    } else {
      html += '<div class="vcard"><div class="vh">' + t('viz_missing') + '</div>' + barChart(V.missing.items) + '</div>';
    }
    return html;
  }

  // 样例表（供 ⑦ 样例 段使用）
  function sampleTableHtml(sm) {
    if (!sm || !sm.rows || !sm.rows.length) return '';
    return '<div class="chart"><table class="sample"><tr>' +
      sm.header.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr>' +
      sm.rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</table></div>';
  }

  window.renderViz = renderViz;
  window.sampleTableHtml = sampleTableHtml;
})();
