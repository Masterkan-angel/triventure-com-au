(() => {
  const isChinese = document.documentElement.lang.startsWith('zh');
  const languageKey = isChinese ? 'zh' : 'en';
  const projectPath = isChinese ? 'start-project.html' : 'start-project.html';

  const setText = (selector, text, root = document) => {
    const node = root.querySelector(selector);
    if (node) node.textContent = text;
    return node;
  };

  // Direct every project-oriented CTA to the short bilingual project brief.
  document.querySelectorAll('a[href="#contact"]').forEach((link) => {
    link.href = projectPath;
  });
  const headerCta = document.querySelector('.header-cta');
  if (headerCta) headerCta.href = projectPath;

  const hero = document.querySelector('.hero-v4');
  if (hero) {
    setText('.gateway-ribbon', isChinese ? '立即探索AI' : 'EXPLORE AI NOW', hero);
    setText('.hero-support', isChinese
      ? '从AI工具平台开始，探索大模型、图片制作、视频制作及其他实用功能。'
      : 'Start with the AI Tool Gateway to explore large language models, image creation, video production and other practical capabilities.', hero);
    const heroLinks = hero.querySelectorAll('.hero-actions a');
    if (heroLinks[2]) heroLinks[2].href = projectPath;
  }

  const toolsSection = document.querySelector('#ai-tools');
  const duplicateGatewayCard = toolsSection && toolsSection.querySelector('.gateway-card');
  if (duplicateGatewayCard) duplicateGatewayCard.remove();
  if (toolsSection) {
    setText('.boxed-heading .eyebrow', isChinese ? '实用工具与服务' : 'PRACTICAL TOOLS AND SERVICES', toolsSection);
    setText('.boxed-heading h2', isChinese ? '把想法转化为可以使用的数字产品' : 'Turn Ideas into Useful Digital Products', toolsSection);
    setText('.boxed-heading > p', isChinese
      ? '使用规划工具、内容资源和工作流服务，把知识整理成可以测试、发布和持续改进的数字资产。'
      : 'Use planning tools, content resources and workflow support to turn knowledge into digital assets that can be tested, published and improved.', toolsSection);
    setText('.platform-note', isChinese
      ? 'AI工具平台由独立第三方提供，其价格、隐私政策和服务条款适用。'
      : 'AI Gateway services are provided by an independent third-party platform. Its pricing, privacy policy and terms apply.', toolsSection);
  }

  const videoSection = document.querySelector('#video');
  if (videoSection) {
    setText('.boxed-heading .eyebrow', isChinese ? '观看与了解' : 'WATCH AND LEARN', videoSection);
    setText('.boxed-heading h2', isChinese ? '看看AI和数字资产怎样实际应用' : 'See AI and Digital Assets in Action', videoSection);
    setText('.boxed-heading > p', isChinese
      ? '通过简短演示、工具介绍和真实项目，了解Triventure怎样把知识转化为可以使用的产品。'
      : 'Watch short demonstrations, tool walkthroughs and real projects showing how Triventure turns knowledge into useful products.', videoSection);
    setText('.video-placeholder-copy strong', isChinese ? '重点视频即将上线' : 'Featured Video Coming Soon', videoSection);
    setText('.video-placeholder-copy small', isChinese ? 'AI工具 · 数字资产 · 真实项目' : 'AI tools · Digital assets · Real projects', videoSection);
    setText('.video-copy h3', isChinese ? '你将在视频中看到' : 'What You Will See', videoSection);
    const paragraphs = videoSection.querySelectorAll('.video-copy > p');
    if (paragraphs[0]) paragraphs[0].innerHTML = isChinese
      ? '<strong>什么是数字资产？AI可以怎样帮助你？</strong>'
      : '<strong>What Is a Digital Asset — and How Can AI Help?</strong>';
    if (paragraphs[1]) paragraphs[1].textContent = isChinese
      ? '了解怎样使用AI平台探索工具、用启动画布规划产品，并把一个想法发展成可以发布的数字资产。'
      : 'See how to explore the AI Gateway, plan a product with the Starter Canvas and develop an idea into a publishable digital asset.';
    const videoItems = isChinese
      ? ['探索AI工具平台', '使用启动画布规划数字资产', '了解想法怎样成为可以发布的产品']
      : ['Explore the AI Tool Gateway', 'Plan a digital asset with the Starter Canvas', 'See how ideas become publishable products'];
    videoSection.querySelectorAll('.video-copy li').forEach((item, index) => {
      if (videoItems[index]) item.textContent = videoItems[index];
    });
    const videoLink = videoSection.querySelector('.video-copy .text-link');
    if (videoLink) {
      videoLink.textContent = isChinese ? '先探索AI工具 →' : 'Explore AI Tools Now →';
      videoLink.href = 'https://triv.lk888.ai';
      videoLink.target = '_blank';
      videoLink.rel = 'noreferrer';
    }
  }

  const methodSection = document.querySelector('#how-it-works');
  if (methodSection) {
    setText('.boxed-heading .eyebrow', isChinese ? '从想法到资产' : 'FROM IDEA TO ASSET', methodSection);
    setText('.boxed-heading h2', isChinese ? '一条实用的六步路径' : 'A Practical Six-Step Path', methodSection);
    setText('.boxed-heading > p', isChinese
      ? '整理知识、制作有用产品、完成发布，并根据真实反馈持续改进。'
      : 'Organise your knowledge, create a useful product, publish it and improve it through real feedback.', methodSection);
  }

  const servicesSection = document.querySelector('#services');
  if (servicesSection) {
    setText('.boxed-heading .eyebrow', isChinese ? '服务' : 'SERVICES', servicesSection);
    setText('.boxed-heading h2', isChinese ? '把知识转化为实际成果' : 'Turn Knowledge into Practical Results', servicesSection);
    setText('.boxed-heading > p', isChinese
      ? '根据需要选择产品开发、AI工作流、数字出版或资产整理服务。'
      : 'Choose support for product development, AI workflows, digital publishing or asset organisation.', servicesSection);
  }

  const projectsSection = document.querySelector('#projects');
  if (projectsSection) {
    setText('.boxed-heading .eyebrow', isChinese ? '精选项目' : 'SELECTED PROJECTS', projectsSection);
    setText('.boxed-heading h2', isChinese ? '看看我们正在开发什么' : 'Explore What We Are Building', projectsSection);
    setText('.boxed-heading > p', isChinese
      ? '了解已经发布的作品、正在测试的原型和新的数字产品实验。'
      : 'Discover published work, working prototypes and new digital product experiments.', projectsSection);
  }

  const gatewayHero = document.querySelector('img[data-editable-image="gateway-hero"]');
  if (gatewayHero && isChinese) {
    gatewayHero.src = '../assets/tool-ai-gateway-zh.svg';
    gatewayHero.alt = 'AI Tools连接大模型、视频制作、图片制作和其它工具';
  }

  // Local image preview editor. It is active only when ?edit=1 is present.
  const params = new URLSearchParams(window.location.search);
  const editMode = params.get('edit') === '1';
  const images = Array.from(document.querySelectorAll('img[data-editable-image]'));
  const imagePrefix = 'triventure-preview-image:';
  const metaPrefix = 'triventure-preview-meta:';
  const states = new Map();
  const scopedKey = (prefix, imageKey) => `${prefix}${languageKey}:${imageKey}`;
  const legacyKey = (prefix, imageKey) => `${prefix}${imageKey}`;

  const readStoredValue = (prefix, imageKey) => localStorage.getItem(scopedKey(prefix, imageKey)) || localStorage.getItem(legacyKey(prefix, imageKey));
  const removeStoredValue = (prefix, imageKey) => {
    localStorage.removeItem(scopedKey(prefix, imageKey));
    localStorage.removeItem(legacyKey(prefix, imageKey));
  };
  const parseMeta = (value) => {
    try { return value ? JSON.parse(value) : null; } catch (error) { return null; }
  };
  const formatBytes = (bytes) => {
    if (!Number.isFinite(bytes) || bytes <= 0) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  let toolbarCount = null;
  const updateToolbarCount = () => {
    if (!toolbarCount) return;
    const changed = Array.from(states.values()).filter((state) => state.img.classList.contains('is-replaced')).length;
    toolbarCount.textContent = isChinese ? `已替换 ${changed} 张图片` : `${changed} image${changed === 1 ? '' : 's'} replaced`;
  };
  const updateStatePresentation = (state) => {
    const replaced = Boolean(readStoredValue(imagePrefix, state.imageKey));
    state.img.classList.toggle('is-replaced', replaced);
    state.host.classList.toggle('has-local-image', replaced);
    if (state.resetButton) state.resetButton.disabled = !replaced;
    if (state.fileNote) {
      const meta = state.meta;
      state.fileNote.textContent = replaced && meta
        ? [meta.fileName, meta.width && meta.height ? `${meta.width}×${meta.height}` : '', formatBytes(meta.size)].filter(Boolean).join(' · ')
        : '';
    }
  };
  const resetOne = (state) => {
    removeStoredValue(imagePrefix, state.imageKey);
    removeStoredValue(metaPrefix, state.imageKey);
    state.meta = null;
    state.img.src = state.originalSrc;
    updateStatePresentation(state);
    updateToolbarCount();
  };
  const saveFileForState = (state, file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert(isChinese ? '请选择图片文件。' : 'Please choose an image file.');
      return;
    }
    if (file.size > 1500000) {
      alert(isChinese ? '图片最好小于1.5MB，否则浏览器可能无法保存本地预览。' : 'Please use an image under 1.5MB so the browser can save the local preview.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      const probe = new Image();
      probe.onload = () => {
        state.meta = { imageKey: state.imageKey, fileName: file.name, type: file.type, size: file.size, width: probe.naturalWidth, height: probe.naturalHeight, originalSrc: state.originalSrc, updatedAt: new Date().toISOString() };
        state.img.src = dataUrl;
        try {
          localStorage.setItem(scopedKey(imagePrefix, state.imageKey), dataUrl);
          localStorage.setItem(scopedKey(metaPrefix, state.imageKey), JSON.stringify(state.meta));
        } catch (error) {
          alert(isChinese ? '图片已用于当前预览，但浏览器空间不足，刷新后可能恢复原图。' : 'The image is shown in this preview, but browser storage is full and it may reset after refresh.');
        }
        updateStatePresentation(state);
        updateToolbarCount();
      };
      probe.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  images.forEach((img) => {
    const imageKey = img.dataset.editableImage;
    if (!imageKey) return;
    const originalSrc = img.getAttribute('src');
    const savedImage = readStoredValue(imagePrefix, imageKey);
    const state = { imageKey, img, originalSrc, meta: parseMeta(readStoredValue(metaPrefix, imageKey)), host: img.parentElement, resetButton: null, fileNote: null };
    if (savedImage) img.src = savedImage;
    states.set(imageKey, state);
    if (!editMode) return;

    document.body.classList.add('media-edit-active');
    state.host.classList.add('media-edit-host');
    img.classList.add('editable-media');
    img.title = isChinese ? '点击或拖入图片进行替换（仅本机预览）' : 'Click or drop an image to replace it (local preview only)';

    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*'; input.hidden = true;
    document.body.appendChild(input);
    const controls = document.createElement('div');
    controls.className = 'media-edit-controls';
    controls.innerHTML = isChinese ? '<button type="button" data-replace-one>替换</button><button type="button" data-reset-one>恢复</button>' : '<button type="button" data-replace-one>Replace</button><button type="button" data-reset-one>Reset</button>';
    state.host.appendChild(controls);
    state.fileNote = document.createElement('span');
    state.fileNote.className = 'media-edit-file-note';
    state.host.appendChild(state.fileNote);
    state.resetButton = controls.querySelector('[data-reset-one]');

    const linkedParent = img.closest('a');
    if (linkedParent) linkedParent.addEventListener('click', (event) => event.preventDefault(), true);
    const openPicker = (event) => {
      if (event) { event.preventDefault(); event.stopPropagation(); }
      input.value = ''; input.click();
    };
    img.addEventListener('click', openPicker);
    controls.querySelector('[data-replace-one]').addEventListener('click', openPicker);
    state.resetButton.addEventListener('click', (event) => { event.preventDefault(); event.stopPropagation(); resetOne(state); });
    ['dragenter', 'dragover'].forEach((eventName) => img.addEventListener(eventName, (event) => { event.preventDefault(); img.classList.add('is-dragover'); }));
    ['dragleave', 'drop'].forEach((eventName) => img.addEventListener(eventName, (event) => { event.preventDefault(); img.classList.remove('is-dragover'); }));
    img.addEventListener('drop', (event) => saveFileForState(state, event.dataTransfer && event.dataTransfer.files[0]));
    input.addEventListener('change', () => saveFileForState(state, input.files && input.files[0]));
    updateStatePresentation(state);
  });

  if (!editMode || images.length === 0) return;
  const toolbar = document.createElement('div');
  toolbar.className = 'media-edit-toolbar';
  toolbar.innerHTML = isChinese
    ? '<div class="media-edit-toolbar-copy"><strong>图片预览编辑模式</strong><span data-media-count>已替换 0 张图片</span></div><div class="media-edit-toolbar-actions"><button type="button" data-export-media>导出更换清单</button><a href="https://github.com/Masterkan-angel/triventure-com-au/upload/homepage-ai-visual-v3/assets" target="_blank" rel="noreferrer">永久上传到GitHub</a><button type="button" data-reset-media>恢复全部</button><a href="?">退出编辑</a></div>'
    : '<div class="media-edit-toolbar-copy"><strong>Image preview mode</strong><span data-media-count>0 images replaced</span></div><div class="media-edit-toolbar-actions"><button type="button" data-export-media>Export change list</button><a href="https://github.com/Masterkan-angel/triventure-com-au/upload/homepage-ai-visual-v3/assets" target="_blank" rel="noreferrer">Permanent GitHub upload</a><button type="button" data-reset-media>Reset all</button><a href="?">Exit edit mode</a></div>';
  document.body.appendChild(toolbar);
  toolbarCount = toolbar.querySelector('[data-media-count]');
  updateToolbarCount();
  toolbar.querySelector('[data-reset-media]').addEventListener('click', () => states.forEach(resetOne));
  toolbar.querySelector('[data-export-media]').addEventListener('click', () => {
    const changes = Array.from(states.values()).filter((state) => state.img.classList.contains('is-replaced')).map((state) => state.meta || { imageKey: state.imageKey, originalSrc: state.originalSrc });
    if (!changes.length) { alert(isChinese ? '目前还没有替换图片。' : 'No images have been replaced yet.'); return; }
    const manifest = { project: 'Triventure homepage', language: languageKey, branch: 'homepage-ai-visual-v3', exportedAt: new Date().toISOString(), changes };
    const url = URL.createObjectURL(new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url; link.download = `triventure-image-changes-${languageKey}.json`;
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
  });
})();