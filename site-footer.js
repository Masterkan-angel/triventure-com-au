(() => {
  const renderFooter = () => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const isChinese = document.documentElement.lang.startsWith('zh');
    const path = window.location.pathname;
    const inZhFolder = path.includes('/zh/');
    const prefix = inZhFolder ? '' : '';
    const rootPrefix = inZhFolder ? '../' : '';
    const homeHref = inZhFolder ? 'index.html' : 'index.html';
    const projectHref = inZhFolder ? 'start-project.html' : 'start-project.html';
    const privacyHref = inZhFolder ? 'privacy.html' : 'privacy.html';
    const termsHref = inZhFolder ? 'terms.html' : 'terms.html';
    const canvasHref = inZhFolder ? '../starter-canvas.html?lang=zh' : 'starter-canvas.html';
    const year = new Date().getFullYear();

    footer.innerHTML = isChinese
      ? `<div class="site-footer-inner"><div class="site-footer-brand"><strong>Triventure Australia</strong><p>AI工具、数字资产、数字出版，以及中国与中澳项目支持。</p></div><nav class="site-footer-nav" aria-label="页脚导航"><a href="${homeHref}">首页</a><a href="https://triv.lk888.ai" target="_blank" rel="noreferrer">AI工具</a><a href="${canvasHref}">免费工具</a><a href="${projectHref}">开始项目</a><a href="${privacyHref}">隐私政策</a><a href="${termsHref}">使用条款</a><a href="mailto:service@triventure.com.au">联系我们</a></nav><div class="site-footer-meta"><p>© ${year} Triventure Australia。一次创造，持续改进。</p><p>第三方平台和外部链接适用其各自的价格、隐私政策和服务条款。</p></div></div>`
      : `<div class="site-footer-inner"><div class="site-footer-brand"><strong>Triventure Australia</strong><p>AI tools, digital assets, publishing, and specialist China and Australia–China project support.</p></div><nav class="site-footer-nav" aria-label="Footer navigation"><a href="${homeHref}">Home</a><a href="https://triv.lk888.ai" target="_blank" rel="noreferrer">AI Tools</a><a href="${canvasHref}">Free Tool</a><a href="${projectHref}">Start a Project</a><a href="${privacyHref}">Privacy</a><a href="${termsHref}">Terms</a><a href="mailto:service@triventure.com.au">Contact</a></nav><div class="site-footer-meta"><p>© ${year} Triventure Australia. Create once. Improve forever.</p><p>Third-party platforms and external links are subject to their own pricing, privacy policies and terms.</p></div></div>`;
  };

  renderFooter();
  const toggle = document.querySelector('#languageToggle');
  if (toggle) toggle.addEventListener('click', () => window.setTimeout(renderFooter, 0));
})();
