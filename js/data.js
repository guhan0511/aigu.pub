/**
 * 全站数据源 —— 统一维护人物信息、社交入口、数字标签与故事卡片内容。
 * 各页面通过 render.js 读取这里的数据进行渲染，避免文案散落在各个 HTML 组件里。
 */
window.SITE_DATA = {
  brand: { en: 'AIGU', cn: '阿一古' },

  nav: [
    { cn: '关于我', en: 'About', anchor: 'about' },
    { cn: '经历', en: 'Stories', anchor: 'stories' },
    { cn: '联系', en: 'Connect', anchor: 'connect' }
  ],

  social: {
    wechat: { label: '微信', en: 'WeChat', value: 'g22067101', qr: 'images/Wechat_QRcode.png' },
    xiaohongshu: { label: '小红书', en: '小红书', value: '扫码查看小红书主页', qr: 'images/Red_note.jpg' },
    instagram: { label: 'Instagram', en: 'Instagram', value: '@GUHAN4828', url: 'https://instagram.com/guhan4828', qr: 'images/ins_QRcode.png' },
    linkedin: { label: '领英', en: 'LinkedIn', value: 'Han Gu', url: 'https://www.linkedin.com/in/han-gu-ab7982340', qr: 'images/linkedin_QRcode.png' },
    email: { label: '邮箱', en: 'Email', value: 'aigu.pub@hotmail.com', url: 'mailto:aigu.pub@hotmail.com' }
  },

  // 首页「你好，我是阿一古」
  about: {
    name: '阿一古 · Aigu',
    birthday: '2001 年 5 月',
    base: '雅加达 2 个月现场办公 → 北京 1 个月居家办公',
    mbti: 'ENTJ（T / F 各半）',
    zodiac: '金牛座 · 上升狮子',
    status: '在汽车后市场出海一线，做广告、市场与用户增长',
    keywords: ['第一性原理', '超长期主义', '世界那么大，终要去看看', '自由', '平等', '博爱']
  },

  // 首页「用一些数字，介绍我」
  numbers: [
    {
      size: 'lg',
      value: '10',
      unit: '个',
      label: '已踏足的国家',
      labelEn: 'Countries visited',
      flags: [
        { cc: 'fr', name: '法国' },
        { cc: 'it', name: '意大利' },
        { cc: 'va', name: '梵蒂冈' },
        { cc: 'be', name: '比利时' },
        { cc: 'mc', name: '摩纳哥' },
        { cc: 'de', name: '德国' },
        { cc: 'ch', name: '瑞士' },
        { cc: 'gb', name: '英国' },
        { cc: 'dk', name: '丹麦' },
        { cc: 'id', name: '印度尼西亚' }
      ],
      caption: '国家数量不是目标，真实抵达才是——其中有 2024 年的法国游学，和 2026 年的印尼外派。'
    },
    {
      size: 'sm',
      value: '2',
      unit: '届',
      label: '已参加的奥运',
      labelEn: 'Olympic Games',
      caption: '两次奥运，都是人生很难复刻的现场——Beijing 2022，Paris 2024。'
    },
    {
      size: 'sm',
      value: '6',
      unit: '大洲',
      label: '已结交的朋友',
      labelEn: 'Friends, across continents',
      caption: '除了南极洲。已在西西里朋友家里度过一个美丽的夏天，也在丹麦朋友家里过了最纯粹的圣诞节。'
    },
    {
      size: 'lang',
      value: '4',
      unit: '种',
      label: '思维方式',
      labelEn: 'Ways of thinking',
      langs: [
        { native: '中文', en: 'Mandarin' },
        { native: 'English', en: 'English' },
        { native: 'Français', en: 'French' },
        { native: 'Bahasa Indonesia', en: 'Indonesian' }
      ],
      caption: '一种语言，就是一种思维方式——除中文、英文外，还能用法语和印尼语切换频道。'
    }
  ],

  // 首页「我们可能在哪个故事里见过」四张故事卡
  stories: [
    {
      num: '01',
      theme: 'edu',
      title: '有没有校友？',
      summary: '2019—2026，北京第二外国语学院经济学院；2024 年秋，在法国 ESSEC 高商交换。',
      tags: '2019—2026 / Beijing · Paris',
      href: 'education.html',
      logos: [
        { name: 'BISU', src: 'images/BISU_Logo.png' },
        { name: 'ESSEC', src: 'images/logos/essec-logo.svg' }
      ]
    },
    {
      num: '02',
      theme: 'work',
      title: '有没有同行？',
      summary: '现在在 X-motors 博世印尼总代，做汽车后市场出海的广告、市场与用户增长；也曾在旅行社北京办事处创业，在奇绩创坛把创业讲座带到全国。',
      tags: 'Growth / Automotive / Startup',
      href: 'work.html'
    },
    {
      num: '03',
      theme: 'moments',
      title: '与你的共同记忆',
      summary: 'Paris 2024 奥运会 OBS 档案组实习，记录高尔夫与冲浪的全球转播；也曾在 Beijing 2022 冬奥与冬残奥的首都现场做志愿者。',
      tags: 'Beijing 2022 · Paris 2024',
      href: 'moments.html'
    },
    {
      num: '04',
      theme: 'interests',
      title: '如果你也喜欢……',
      summary: '在溪降、徒步和飞盘里出汗；在 Jazz、City Pop、摇滚与 Afro 里切换频道；也把读书、投资理财和健身当作长期练习。',
      tags: 'Outdoor / Music / Self-growth',
      href: 'interests.html'
    }
  ]
};
