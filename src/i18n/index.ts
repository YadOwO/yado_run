/**
 * 多语言：英文在根路径，中文在 /zh/。
 * 所有用户可见文字都在这里，zh 的类型由 en 推出，少一个键就编译不过。
 */

export const LOCALES = ['en', 'zh'] as const;
export type Lang = (typeof LOCALES)[number];

/** 双语字段，用在产品数据这类跟内容走的地方 */
export type L10n = Record<Lang, string>;

export const htmlLang: Record<Lang, string> = { en: 'en', zh: 'zh-CN' };

/**
 * 生成带语言前缀的站内路径。
 * @param lang 目标语言
 * @param path 不带语言前缀的路径，以 / 开头和结尾，例如 `/yadoa/`
 */
export function href(lang: Lang, path = '/'): string {
  return lang === 'en' ? path : `/zh${path}`;
}

const en = {
  site: {
    title: 'Yado — A Yado Production',
    description:
      'Yado, AI developer. A personal site told in chapters: the person, the yado series of apps, and more to come.',
  },
  hud: {
    home: 'Yado — home',
    language: 'Language',
    scene: 'Scene',
    timecode: 'Timecode',
    index: 'Index',
    close: 'Close',
    prologue: 'Prologue',
  },
  opening: {
    credit: 'A Yado Production',
    skip: 'Click anywhere to skip',
  },
  scenes: {
    manifesto: 'Manifesto',
    contents: 'Contents',
    hobbies: 'Hobbies',
    next: 'Next chapter',
    comingSoon: 'Coming soon',
    slate: 'The slate',
    credits: 'End credits',
    keyArt: 'Key art',
    specs: 'Specifications',
    highlights: 'Highlights',
    behind: 'Behind the scenes',
    release: 'Release',
  },
  hero: {
    lines: ['Hard problems,', 'solved with', '<em>restraint</em>.'],
    lede: "I'm Yado, an AI front-end engineer. I'd rather get every interaction right than change the world. Here's the person, the work, and whatever comes next.",
    scroll: 'Scroll',
  },
  chapters: {
    heading: 'Contents',
    chapter: 'CH.',
    enter: 'Enter',
    reservedTitle: 'Untitled',
    reserved: 'In development',
    reservedNote: 'The next chapter is still being written.',
    next: 'Next chapter',
    back: 'Back to contents',
  },
  about: {
    labels: { identity: 'Identity', job: 'Day job', making: 'Making', contact: 'Contact' },
    still: 'Still',
  },
  works: {
    title: 'The yado series',
    lede: 'Small apps for everyday things, made one at a time. Every one of them premieres here first.',
  },
  statusCount: (n: number, label: string) => `${n} ${label}`,
  feature: {
    enter: 'Enter',
  },
  slate: {
    count: (n: number) => `${numberWord(n)} more ${n === 1 ? 'title is' : 'titles are'} in production.`,
    note: 'The slate opens soon',
    slot: 'In production',
    untitled: 'Untitled',
  },
  status: {
    development: 'In development',
    production: 'In production',
    'coming-soon': 'Coming soon',
    'now-showing': 'Now showing',
  },
  product: {
    originalTitle: 'Original title',
    specs: {
      platform: 'Platform',
      format: 'Format',
      status: 'Status',
      year: 'Year',
      account: 'Account',
    },
    highlights: 'Highlights',
    behind: 'Behind the scenes',
    release: 'Release',
    releaseHeading: {
      development: 'In development.',
      production: 'In production.',
      'coming-soon': 'Coming soon to the App Store.',
      'now-showing': 'Now on the App Store.',
    },
    privacy: 'Privacy policy',
    support: 'Support',
    atLaunch: 'Available at launch',
    next: 'Next title',
    nextTba: 'In production — to be announced',
    back: 'Back to the studio',
  },
  credits: {
    heading: 'End credits',
    roles: [
      { role: 'Directed by', name: 'Yado' },
      { role: 'Design', name: 'Yado' },
      { role: 'Engineering', name: 'Yado' },
      { role: 'Code review', name: 'agentd' },
      { role: 'AI services', name: 'yado_ai' },
    ],
    contact: 'Contact',
    tbc: 'To be continued.',
  },
  legal: {
    updated: 'Last updated: ',
    effective: 'Effective: ',
    language: '中文',
    docs: { privacy: 'Privacy Policy', sharing: 'Third-Party Sharing', terms: 'Terms of Use' },
    /** 日期格式所用的 BCP 47 语言标签 */
    dateLocale: 'en-US',
  },
};

const zh: typeof en = {
  site: {
    title: 'Yado — 芽豆出品',
    description: 'Yado，AI 开发。一个分章节的个人站：人物、芽豆系列作品，以及之后的更多。',
  },
  hud: {
    home: 'Yado — 首页',
    language: '语言',
    scene: '场景',
    timecode: '时间码',
    index: '目录',
    close: '关闭',
    prologue: '序',
  },
  opening: {
    credit: '芽豆出品 · A Yado Production',
    skip: '点击任意处跳过',
  },
  scenes: {
    manifesto: '主张',
    contents: '目录',
    hobbies: '爱好',
    next: '下一章',
    comingSoon: '即将上映',
    slate: '片单',
    credits: '片尾',
    keyArt: '主视觉',
    specs: '规格',
    highlights: '看点',
    behind: '幕后',
    release: '上映信息',
  },
  hero: {
    lines: ['用最<em>克制</em>的方式，', '解决最复杂的问题。'],
    lede: '我是 Yado，AI 前端工程师。比起改变世界，我更在乎把每一个交互打磨到位。这里有我这个人、我做的东西，以及之后的更多。',
    scroll: '向下',
  },
  chapters: {
    heading: '目录',
    chapter: 'CH.',
    enter: '进入',
    reservedTitle: '暂未命名',
    reserved: '筹备中',
    reservedNote: '下一章还在写。',
    next: '下一章',
    back: '回到目录',
  },
  about: {
    labels: { identity: '身份', job: '在职', making: '在做', contact: '联系' },
    still: '剧照',
  },
  works: {
    title: '芽豆系列',
    lede: '为日常小事做的小 App，一次只做一个。每一部都先在这里首映。',
  },
  statusCount: (n: number, label: string) => `${n} 部${label}`,
  feature: {
    enter: '进入',
  },
  slate: {
    count: (n: number) => `另有${numberWordZh(n)}部作品，正在拍摄。`,
    note: '片单即将公开',
    slot: '拍摄中',
    untitled: '暂未命名',
  },
  status: {
    development: '筹备中',
    production: '拍摄中',
    'coming-soon': '即将上映',
    'now-showing': '正在上映',
  },
  product: {
    originalTitle: '原名',
    specs: {
      platform: '平台',
      format: '形态',
      status: '状态',
      year: '年份',
      account: '账号',
    },
    highlights: '看点',
    behind: '幕后',
    release: '上映信息',
    releaseHeading: {
      development: '筹备中。',
      production: '拍摄中。',
      'coming-soon': '即将登陆 App Store。',
      'now-showing': '已在 App Store 上映。',
    },
    privacy: '隐私政策',
    support: '支持',
    atLaunch: '上架时提供',
    next: '下一部',
    nextTba: '拍摄中，片名待公布',
    back: '回到片场',
  },
  credits: {
    heading: '片尾',
    roles: [
      { role: '导演', name: 'Yado' },
      { role: '设计', name: 'Yado' },
      { role: '工程', name: 'Yado' },
      { role: '代码审查', name: 'agentd' },
      { role: 'AI 服务', name: 'yado_ai' },
    ],
    contact: '联系',
    tbc: '未完待续。',
  },
  legal: {
    updated: '更新日期：',
    effective: '生效日期：',
    language: 'English',
    docs: { privacy: '隐私政策', sharing: '第三方共享清单', terms: '用户协议' },
    dateLocale: 'zh-CN',
  },
};

export const strings: Record<Lang, typeof en> = { en, zh };

export const contact = {
  email: 'yado.async@gmail.com',
  github: { label: 'GitHub', handle: 'YadOwO', url: 'https://github.com/YadOwO' },
} as const;

function numberWord(n: number): string {
  const words = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  return words[n] ?? String(n);
}

function numberWordZh(n: number): string {
  const words = ['零', '一', '两', '三', '四', '五', '六', '七', '八', '九'];
  return words[n] ?? String(n);
}
