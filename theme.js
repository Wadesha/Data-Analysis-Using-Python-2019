/* theme.js — 暗色模式（v3.3）
   - localStorage 'theme' 持久化（'dark' | 'light'），默认 light
   - data-theme 属性由 HTML head 内联同步脚本设置（防闪烁）；本文件负责注入切换按钮
   - 按钮自动插入 nav 末尾，无需改各页面结构 */
(function () {
  'use strict';
  function cur() { return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
  function apply(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    updateBtn();
  }
  function updateBtn() {
    var b = document.getElementById('theme-toggle');
    if (b) b.textContent = cur() === 'dark' ? '☀️' : '🌙';
    if (b) b.title = cur() === 'dark' ? 'Switch to light mode' : '切换到暗色模式';
  }
  window.toggleTheme = function () { apply(cur() === 'dark' ? 'light' : 'dark'); };
  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('nav');
    if (!nav || document.getElementById('theme-toggle')) return;
    var b = document.createElement('button');
    b.id = 'theme-toggle';
    b.type = 'button';
    b.setAttribute('aria-label', 'toggle dark mode');
    b.onclick = window.toggleTheme;
    nav.appendChild(b);
    updateBtn();
  });
})();
