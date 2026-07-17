(() => {
  const isChinese = document.documentElement.lang.startsWith('zh');
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
  const storagePrefix = 'triventure-preview-image:';

  images.forEach((img) => {
    const imageKey = img.dataset.editableImage;
    if (!imageKey) return;

    const savedImage = localStorage.getItem(storagePrefix + imageKey);
    if (savedImage) img.src = savedImage;

    if (!editMode) return;

    img.classList.add('editable-media');
    img.title = isChinese
      ? '点击从电脑选择替换图片（仅本机预览）'
      : 'Click to choose a replacement image from your computer (local preview only)';

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.hidden = true;
    document.body.appendChild(input);

    const linkedParent = img.closest('a');
    if (linkedParent) {
      linkedParent.addEventListener('click', (event) => {
        if (editMode) event.preventDefault();
      }, true);
    }

    img.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      input.click();
    });

    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
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
        img.src = dataUrl;
        try {
          localStorage.setItem(storagePrefix + imageKey, dataUrl);
        } catch (error) {
          alert(isChinese
            ? '图片已用于当前预览，但浏览器空间不足，刷新后可能恢复原图。'
            : 'The image is shown in this preview, but browser storage is full and it may reset after refresh.');
        }
      };
      reader.readAsDataURL(file);
    });
  });

  if (!editMode || images.length === 0) return;

  const toolbar = document.createElement('div');
  toolbar.className = 'media-edit-toolbar';
  toolbar.innerHTML = isChinese
    ? '<span><strong>图片预览编辑模式：</strong>点击带虚线框的图片，从电脑选择替换图。改动只保存在当前浏览器，不会自动发布到正式网站。</span><div><button type="button" data-reset-media>恢复原图</button> <a class="secondary" href="?">退出编辑</a></div>'
    : '<span><strong>Image preview mode:</strong> click any dashed image to choose a replacement from your computer. Changes stay in this browser and are not automatically published.</span><div><button type="button" data-reset-media>Reset images</button> <a class="secondary" href="?">Exit edit mode</a></div>';
  document.body.appendChild(toolbar);

  toolbar.querySelector('[data-reset-media]').addEventListener('click', () => {
    images.forEach((img) => {
      const imageKey = img.dataset.editableImage;
      if (imageKey) localStorage.removeItem(storagePrefix + imageKey);
    });
    window.location.reload();
  });
})();
