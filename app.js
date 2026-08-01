/* datasets.html 浏览逻辑：搜索 / 领域筛选 / 排序 / 卡片网格 */
(function () {
  const items = (window.CATALOG && window.CATALOG.items) || [];
  const domains = (window.CATALOG && window.CATALOG.domains) || [];
  const tpl = window.DOMAIN_TEMPLATES || {};

  const state = { q: "", domain: "All", sort: "downloads" };

  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const num = (n) => (n == null ? "—" : Number(n).toLocaleString());
  const usab = (n) => (n == null ? "—" : Number(n).toFixed(2));
  // 在分隔符处插入 <wbr>，让长 slug/命令在 / 与 - 处自然断行（配合 CSS overflow-wrap，避免任意字符硬截断）
  const wbrRef = (s) => esc(s).replace(/\//g, "/<wbr>").replace(/-/g, "-<wbr>");

  function sortVal(it, key) {
    if (key === "title") return (it.title || "").toLowerCase();
    if (key === "updated") return it.lastUpdated || "";
    const v = it[key];
    return v == null ? -1 : v;
  }

  function filtered() {
    const q = state.q.trim().toLowerCase();
    let arr = items.filter((it) => {
      if (state.domain !== "All" && !(it.domains || []).includes(state.domain)) return false;
      if (q) {
        const hay = ((it.title || "") + " " + (it.ref || "") + " " + (it.domains || []).join(" ")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    const k = state.sort;
    arr.sort((a, b) => {
      if (k === "title") return sortVal(a, k).localeCompare(sortVal(b, k));
      return sortVal(b, k) - sortVal(a, k);
    });
    return arr;
  }

  function card(it) {
    const badges = (it.domains || []).slice(0, 3).map((d) =>
      `<span class="badge">${esc(d)}</span>`).join("");
    const local = it.local ? `<span class="badge local">本地</span>` : "";
    return `<a class="card" href="dataset.html?id=${encodeURIComponent(it.ref)}">
      <div class="card-title">${esc(it.title || it.ref)}</div>
      <div class="card-ref">${wbrRef(it.ref)}</div>
      <div class="card-badges">${local}${badges}</div>
      <div class="card-meta">
        <span>📦 ${esc(it.size || "—")}</span>
        <span>⬇ ${num(it.downloadCount)}</span>
        <span>⭐ ${num(it.voteCount)}</span>
        <span>◈ ${usab(it.usability)}</span>
      </div>
    </a>`;
  }

  function render() {
    const arr = filtered();
    $("#count").textContent = `共 ${arr.length} 个数据集`;
    const grid = $("#grid");
    if (!arr.length) { grid.innerHTML = `<p class="empty">没有匹配的数据集。</p>`; return; }
    grid.innerHTML = arr.map(card).join("");
  }

  function renderChips() {
    const all = ["All"].concat(domains);
    $("#chips").innerHTML = all.map((d) =>
      `<button class="chip${d === state.domain ? " on" : ""}" data-d="${esc(d)}">${d === "All" ? "全部" : esc(d)}</button>`
    ).join("");
    $("#chips").querySelectorAll(".chip").forEach((b) => {
      b.addEventListener("click", () => { state.domain = b.dataset.d; renderChips(); render(); });
    });
  }

  function init() {
    $("#sub").textContent =
      `${window.CATALOG.count} 个公开数据集 · ${domains.length} 个领域 · 仅元数据，不存储原始数据`;
    $("#search").addEventListener("input", (e) => { state.q = e.target.value; render(); });
    $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
    renderChips();
    render();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
