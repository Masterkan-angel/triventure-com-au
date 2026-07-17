(() => {
  const isChinese = document.documentElement.lang.startsWith('zh');
  const languageKey = isChinese ? 'zh' : 'en';
  const toolsSection = document.querySelector('#ai-tools');
  const duplicateGatewayCard = toolsSection && toolsSection.querySelector('.gateway-card');
  if (duplicateGatewayCard) duplicateGatewayCard.remove();

  const toolsEyebrow = toolsSection && toolsSection.querySelector('.boxed-heading .eyebrow');
  const toolsHeading = toolsSection && toolsSection.querySelector('.boxed-heading h2');
  const toolsIntro = toolsSection && toolsSection.querySelector('.boxed-heading > p');
  if (toolsEyebrow) toolsEyebrow.textContent = isChinese ? '其它工具与服务' : 'MORE TOOLS AND SERVICES';
  if (toolsHeading) toolsHeading.textContent = isChinese ? '继续规划、变现并建立工作流' : 'Plan, Monetise and Build a Workflow';
  if (toolsIntro) toolsIntro.textContent = isChinese
    ? 'AI平台已经在首屏成为主要入口。这里保留三项辅助工具，帮助用户规划数字资产、测试变现产品和建立可重复工作流。'
    : 'The AI Gateway is already the primary entry on the first screen. These three supporting tools help visitors plan an asset, test a monetisation product and build a repeatable workflow.';

  const gatewayHero = document.querySelector('img[data-editable-image="gateway-hero"]');
  if (gatewayHero && isChinese) {
    gatewayHero.src = '../assets/tool-ai-gateway-zh.svg';
    gatewayHero.alt = 'AI Tools连接大模型、视频制作、图片制作和其它工具';
  }

  const params = new URLSearchParams(window.location.search);
  const editMode = params.get('edit') === '1';
  const images = Array.from(document.querySelectorAll('img[data-editable-image]'));
  const imagePrefix = 'triventure-preview-image:';
  const metaPrefix = 'triventure-preview-meta:';
  const states = new Map();

  const scopedKey = (prefix, imageKey) => `${prefix}${languageKey}:${imageKey}`;
  const legacyKey = (prefix, imageKey) => `${prefix}${imageKey}`;

  const readStoredValue = (prefix, imageKey) => {
    const scoped = localStorage.getItem(scopedKey(prefix, imageKey));
    if (scoped) return scoped;
    const legacy = localStorage.getItem(legacyKey(prefix, imageKey));
    if (legacy) {
      try {
        localStorage.setItem(scopedKey(prefix, imageKey), legacy);
      } catch (error) {
        // Keep the legacy value available even when migration cannot be saved.
      }
    }
    return legacy;
  };

  const removeStoredValue = (prefix, imageKey) => {
    localStorage.removeItem(scopedKey(prefix, imageKey));
    localStorage.removeItem(legacyKey(prefix, imageKey));
  };

  const parseMeta = (value) => {
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  };

  const formatBytes = (bytes) => {
    if (!Number.isFinite(bytes) || bytes <= 0) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const updateStatePresentation = (state) => {
    const { img, host, resetButton, fileNote, meta } = state;
    const replaced = Boolean(localStorage.getItem(scopedKey(imagePrefix, state.imageKey)) || localStorage.getItem(legacyKey(imagePrefix, state.imageKey)));
    img.classList.toggle('is-replaced', replaced);
    host.classList.toggle('has-local-image', replaced);
    if (resetButton) resetButton.disabled = !replaced;
    if (fileNote) {
      if (replaced && meta) {
        const details = [meta.fileName, meta.width && meta.height ? `${meta.width}×${meta.height}` : '', formatBytes(meta.size)].filter(Boolean);
        fileNote.textContent = details.join(' · ');
      } else {
        fileNote.textContent = '';
      }
    }
  };

  let toolbarCount = null;
  const updateToolbarCount = () => {
    if (!toolbarCount) return;
    const changed = Array.from(states.values()).filter((state) => state.img.classList.contains('is-replaced')).length;
    toolbarCount.textContent = isChinese ? `已替换 ${changed} 张图片` : `${changed} image${changed === 1 ? '' : 's'} replaced`;
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
      alert(isChinese
        ? '图片最好小于1.5MB，否则浏览器可能无法保存本地预览。'
        : 'Please use an image under 1.5MB so the browser can save the local preview.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      const probe = new Image();
      probe.onload = () => {
        state.meta = {
          imageKey: state.imageKey,
          fileName: file.name,
          type: file.type,
          size: file.size,
          width: probe.naturalWidth,
          height: probe.naturalHeight,
          originalSrc: state.originalSrc,
          updatedAt: new Date().toISOString()
        };
        state.img.src = dataUrl;
        try {
          localStorage.setItem(scopedKey(imagePrefix, state.imageKey), dataUrl);
          localStorage.setItem(scopedKey(metaPrefix, state.imageKey), JSON.stringify(state.meta));
        } catch (error) {
          alert(isChinese
            ? '图片已用于当前预览，但浏览器空间不足，刷新后可能恢复原图。'
            : 'The image is shown in this preview, but browser storage is full and it may reset after refresh.');
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
    const savedMeta = parseMeta(readStoredValue(metaPrefix, imageKey));
    if (savedImage) img.src = savedImage;

    const state = {
      imageKey,
      img,
      originalSrc,
      meta: savedMeta,
      host: img.parentElement,
      input: null,
      resetButton: null,
      fileNote: null
    };
    states.set(imageKey, state);

    if (!editMode) return;

    document.body.classList.add('media-edit-active');
    const host = state.host;
    host.classList.add('media-edit-host');
    img.classList.add('editable-media');
    img.title = isChinese
      ? '点击或拖入图片进行替换（仅本机预览）'
      : 'Click or drop an image to replace it (local preview only)';

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.hidden = true;
    document.body.appendChild(input);
    state.input = input;

    const controls = document.createElement('div');
    controls.className = 'media-edit-controls';
    controls.innerHTML = isChinese
      ? '<button type="button" data-replace-one>替换</button><button type="button" data-reset-one>恢复</button>'
      : '<button type="button" data-replace-one>Replace</button><button type="button" data-reset-one>Reset</button>';
    host.appendChild(controls);

    const fileNote = document.createElement('span');
    fileNote.className = 'media-edit-file-note';
    host.appendChild(fileNote);
    state.fileNote = fileNote;
    state.resetButton = controls.querySelector('[data-reset-one]');

    const linkedParent = img.closest('a');
    if (linkedParent) {
      linkedParent.addEventListener('click', (event) => {
        if (editMode) event.preventDefault();
      }, true);
    }

    const openPicker = (event) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      input.value = '';
      input.click();
    };

    img.addEventListener('click', openPicker);
    controls.querySelector('[data-replace-one]').addEventListener('click', openPicker);
    state.resetButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      resetOne(state);
    });

    ['dragenter', 'dragover'].forEach((eventName) => {
      img.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
        img.classList.add('is-dragover');
      });
    });
    ['dragleave', 'drop'].forEach((eventName) => {
      img.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
        img.classList.remove('is-dragover');
      });
    });
    img.addEventListener('drop', (event) => {
      const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
      saveFileForState(state, file);
    });

    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      saveFileForState(state, file);
    });

    updateStatePresentation(state);
  });

  if (!editMode || images.length === 0) return;

  const toolbar = document.createElement('div');
  toolbar.className = 'media-edit-toolbar';
  toolbar.innerHTML = isChinese
    ? '<div class="media-edit-toolbar-copy"><strong>图片预览编辑模式</strong><span data-media-count>已替换 0 张图片</span></div><div class="media-edit-toolbar-actions"><button type="button" data-export-media>导出更换清单</button><a data-github-upload href="https://github.com/Masterkan-angel/triventure-com-au/upload/homepage-ai-visual-v3/assets" target="_blank" rel="noreferrer">永久上传到GitHub</a><button type="button" data-reset-media>恢复全部</button><a href="?">退出编辑</a></div>'
    : '<div class="media-edit-toolbar-copy"><strong>Image preview mode</strong><span data-media-count>0 images replaced</span></div><div class="media-edit-toolbar-actions"><button type="button" data-export-media>Export change list</button><a data-github-upload href="https://github.com/Masterkan-angel/triventure-com-au/upload/homepage-ai-visual-v3/assets" target="_blank" rel="noreferrer">Permanent GitHub upload</a><button type="button" data-reset-media>Reset all</button><a href="?">Exit edit mode</a></div>';
  document.body.appendChild(toolbar);
  toolbarCount = toolbar.querySelector('[data-media-count]');
  updateToolbarCount();

  toolbar.querySelector('[data-reset-media]').addEventListener('click', () => {
    states.forEach((state) => resetOne(state));
  });

  toolbar.querySelector('[data-export-media]').addEventListener('click', () => {
    const changes = Array.from(states.values())
      .filter((state) => state.img.classList.contains('is-replaced'))
      .map((state) => state.meta || { imageKey: state.imageKey, originalSrc: state.originalSrc });

    if (changes.length === 0) {
      alert(isChinese ? '目前还没有替换图片。' : 'No images have been replaced yet.');
      return;
    }

    const manifest = {
      project: 'Triventure homepage',
      language: languageKey,
      branch: 'homepage-ai-visual-v3',
      exportedAt: new Date().toISOString(),
      note: isChinese
        ? '这些图片目前只保存在本机浏览器。请把原始图片上传到GitHub assets文件夹，再根据imageKey更新网页路径。'
        : 'These images currently exist only in this browser. Upload the original files to the GitHub assets folder, then update the page paths using imageKey.',
      changes
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `triventure-image-changes-${languageKey}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });

  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
})();
