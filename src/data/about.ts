import type { L10n } from '@/i18n';
import cs2 from '@/assets/hobbies/cs2.svg';
import playstation from '@/assets/hobbies/playstation.svg';
import nintendoSwitch from '@/assets/hobbies/switch.svg';
import vinyl from '@/assets/hobbies/vinyl.svg';

/**
 * 人物章的内容，改文字直接改这里：介绍卡 + 爱好。
 * 写法：说事实，不喊口号。
 */

export const profile = {
  identity: { en: 'AI developer', zh: 'AI 开发' } as L10n,
  job: { en: 'AI front-end', zh: 'AI 前端' } as L10n,
  /** 「在做」一栏，链到作品章 */
  making: { en: 'The yado series', zh: '芽豆系列' } as L10n,
  /** 首页正片「人物」镜头：几行大字（一行一个元素）和底下一句补充，说的是上面这几栏同样的事实 */
  intro: {
    en: ["I'm Yado,", 'an AI developer.'],
    zh: ['我是 Yado，', '做 AI 开发。'],
  } as Record<keyof L10n, string[]>,
  summary: {
    en: 'My day job is AI front-end. On my own, I make the yado series.',
    zh: '在职做 AI 前端，自己在做芽豆系列。',
  } as L10n,
};

/**
 * 爱好：会常换，增删就是增删一条，顺序就是显示顺序，几条都排得下。
 * mark 是放在 src/assets/hobbies/ 下的单色 SVG（不写颜色，跟着文字色走），可以不填，不填就用标题当画面。
 */
export interface Hobby {
  title: L10n;
  detail?: L10n;
  mark?: typeof cs2;
}

export const hobbies: Hobby[] = [
  {
    title: { en: 'CS2', zh: 'CS2' },
    detail: { en: '3,000+ hours, mostly on the AWP', zh: '3000+ 小时，主狙' },
    mark: cs2,
  },
  {
    title: { en: 'PlayStation', zh: 'PlayStation' },
    mark: playstation,
  },
  {
    title: { en: 'Switch', zh: 'Switch' },
    mark: nintendoSwitch,
  },
  {
    title: { en: 'Hip-hop & R&B', zh: 'Hip-hop & R&B' },
    detail: { en: 'What plays most in my headphones', zh: '耳机里放得最多的' },
    mark: vinyl,
  },
];
