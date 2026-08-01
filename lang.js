/* 语言切换器（v3.1 起：英文版公开转正，前端显示中/EN 切换）
   - 默认中文，页面头部渲染「中 / EN」切换按钮（localStorage 'lang' 持久化）
   - 兼容旧入口：URL 参数 ?beta=en 仍可直达英文版
   - 控制台 setLang('en') 亦可手动切换 */
(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var betaLang = urlParams.get('beta');
  if (betaLang === 'en' || betaLang === 'zh') {
    localStorage.setItem('lang', betaLang);
  }

  var LANG = localStorage.getItem("lang") || "zh";
  window.LANG = LANG;

  function t(k, vars) {
    var dict = (window.I18N && (window.I18N[window.LANG] || window.I18N.zh)) || window.I18N.zh;
    var s = (dict && dict[k] != null) ? dict[k] : ((window.I18N.zh[k] != null) ? window.I18N.zh[k] : k);
    if (vars) { for (var p in vars) { s = s.replace(new RegExp("\\{" + p + "\\}", "g"), vars[p]); } }
    return s;
  }
  window.t = t;

  function applyStatic() {
    document.documentElement.lang = (window.LANG === "en") ? "en" : "zh";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var kv = pair.split(":");
        if (kv.length === 2) el.setAttribute(kv[0], t(kv[1]));
      });
    });
  }

  function buildToggle() {
    var box = document.getElementById("lang-toggle");
    if (!box) return;
    function btn(code, label) {
      if (window.LANG === code) {
        return '<span style="font-size:12px;font-weight:600;color:#fff;background:var(--acc,#4f6ef7);padding:3px 10px;border-radius:999px;white-space:nowrap;">' + label + '</span>';
      }
      return '<a href="javascript:setLang(\'' + code + '\')" style="font-size:12px;font-weight:500;color:var(--muted);padding:3px 10px;border-radius:999px;white-space:nowrap;text-decoration:none;border:1px solid var(--line,rgba(120,130,150,.35));">' + label + '</a>';
    }
    box.innerHTML = '<span style="display:inline-flex;gap:6px;align-items:center;">' + btn("zh", "中") + btn("en", "EN") + '</span>';
  }

  function setLang(l) {
    LANG = l; window.LANG = l; localStorage.setItem("lang", l);
    applyStatic(); buildToggle();
    if (window.__rerenderDetail) window.__rerenderDetail();
  }
  window.setLang = setLang;

  document.addEventListener("DOMContentLoaded", function () { applyStatic(); buildToggle(); });
})();
