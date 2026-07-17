(() => {
  const form = document.querySelector('[data-project-enquiry]');
  if (!form) return;
  const isChinese = document.documentElement.lang.startsWith('zh');
  const status = document.querySelector('[data-copy-status]');
  const emailAddress = 'service@triventure.com.au';

  const labels = isChinese ? {
    name: '姓名', email: '电子邮箱', organisation: '机构或公司', projectType: '项目类型', goal: '希望实现的目标', materials: '目前已有的材料', help: '需要的帮助', timing: '期望时间', subject: 'Triventure项目咨询'
  } : {
    name: 'Name', email: 'Email', organisation: 'Organisation', projectType: 'Project type', goal: 'What you want to achieve', materials: 'What you already have', help: 'Support required', timing: 'Preferred timing', subject: 'Triventure project enquiry'
  };

  const value = (name) => (form.elements[name] && String(form.elements[name].value || '').trim()) || '';

  const buildBrief = () => {
    const rows = [
      [labels.name, value('name')],
      [labels.email, value('email')],
      [labels.organisation, value('organisation') || '—'],
      [labels.projectType, value('projectType')],
      [labels.goal, value('goal')],
      [labels.materials, value('materials') || '—'],
      [labels.help, value('help')],
      [labels.timing, value('timing') || '—']
    ];
    return rows.map(([label, entry]) => `${label}:\n${entry}`).join('\n\n');
  };

  const validate = () => {
    if (!form.reportValidity()) return false;
    return true;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validate()) return;
    const subjectDetail = value('projectType') || labels.subject;
    const subject = `${labels.subject}: ${subjectDetail}`;
    const body = buildBrief();
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  const copyButton = document.querySelector('[data-copy-enquiry]');
  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      if (!validate()) return;
      try {
        await navigator.clipboard.writeText(buildBrief());
        status.textContent = isChinese ? '项目说明已复制，可以粘贴到邮件或聊天工具中。' : 'Project brief copied. You can paste it into email or a messaging app.';
      } catch (error) {
        status.textContent = isChinese ? '浏览器未允许自动复制，请使用“准备邮件”。' : 'The browser did not allow copying. Please use “Prepare Email”.';
      }
    });
  }
})();