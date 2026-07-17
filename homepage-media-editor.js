(() => {
  const inChineseFolder = window.location.pathname.includes('/zh/');
  const prefix = inChineseFolder ? '../' : '';
  const loadScript = (src) => {
    const script = document.createElement('script');
    script.src = prefix + src;
    script.async = false;
    document.body.appendChild(script);
  };
  loadScript('homepage-media-editor-core.js');
  loadScript('site-footer.js');
})();
