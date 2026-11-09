import type { L10n } from '@/i18n';

/**
 * 人物章的内容。文字沿用旧站的个人简介、架构理念和兴趣，可以直接改这里。
 */

export const profile = {
  role: { en: 'AI front-end engineer', zh: 'AI 前端工程师' } as L10n,
  identity: { en: 'Proletarian labourer', zh: '无产阶级劳动者' } as L10n,
  statement: {
    en: "I'm a pragmatic front-end developer and architect. I don't think code or design needs to look clever — it should solve the most complex problems in the most restrained way. Rather than change the world, I'd rather refine every interaction until it's right, and build order and a little beauty inside messy business logic.",
    zh: '我是一名务实的前端开发者与架构设计者。我相信无论是代码还是设计，都不需要故作高深，而是用最克制的方式解决最复杂的问题。比起改变世界，我更在乎将每一个交互打磨到极致，在繁杂的业务逻辑中建立秩序与美感。',
  } as L10n,
};

export const principles: { title: L10n; body: L10n }[] = [
  {
    title: { en: 'Minimalist UI engineering', zh: '极简 UI 工程' },
    body: {
      en: 'Cut the redundant. Keep the core interaction and the whitespace around it.',
      zh: '剔除冗余，专注核心交互与留白。',
    },
  },
  {
    title: { en: 'AI-driven full stack', zh: 'AI 赋能全栈' },
    body: {
      en: 'Past the edge of the client — into intelligent and server-side logic.',
      zh: '打破端侧边界，向智能化与服务端逻辑延伸。',
    },
  },
  {
    title: { en: 'Pixel-perfect performance', zh: '极致性能' },
    body: {
      en: 'Push the browser as far as it goes, for a fluid 60fps.',
      zh: '榨干浏览器性能，追求 60fps 的丝滑体验。',
    },
  },
  {
    title: { en: 'Developer experience', zh: '开发者体验' },
    body: {
      en: 'Tools that fit the hand, so writing code has the rhythm of a good keyboard.',
      zh: '打造顺手的工具链，让编码拥有机械键盘般的节奏感。',
    },
  },
  {
    title: { en: 'Architecture that evolves', zh: '架构演进与重构' },
    body: {
      en: 'Respect the tech debt; open new, cleaner paths through old systems.',
      zh: '敬畏技术债，在旧系统中开辟优雅的新范式。',
    },
  },
  {
    title: { en: 'Domain-driven components', zh: '领域驱动组件' },
    body: {
      en: 'No reuse for its own sake — components shaped by the business they serve.',
      zh: '拒绝盲目复用，构建真正契合业务的组件生态。',
    },
  },
];

/** 屏幕之外：motif 决定剧照里那一小段纯 CSS 动画 */
export const offscreen: { motif: 'road' | 'crosshair' | 'eq'; label: L10n; title: L10n; detail?: L10n }[] = [
  {
    motif: 'road',
    label: { en: 'Cycling', zh: '骑行' },
    title: { en: 'Road bike', zh: '公路车' },
    detail: { en: 'CAMP RADON', zh: 'CAMP RADON' },
  },
  {
    motif: 'crosshair',
    label: { en: 'CS2', zh: 'CS2' },
    title: { en: '3,000+ hours', zh: '3000+ 小时' },
    detail: { en: 'AWP specialist', zh: 'AWP 专家' },
  },
  {
    motif: 'eq',
    label: { en: 'Music', zh: '音乐' },
    title: { en: 'Hip-hop & R&B', zh: 'Hip-hop & R&B' },
  },
];
