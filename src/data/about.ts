import type { L10n } from '@/i18n';
import cs2 from '@/assets/hobbies/cs2.svg';
import playstation from '@/assets/hobbies/playstation.svg';
import nintendoSwitch from '@/assets/hobbies/switch.svg';
import vinyl from '@/assets/hobbies/vinyl.svg';

/**
 * 人物章的内容，改文字直接改这里。
 * 写法：说事实，不喊口号；第一人称，像跟人当面介绍自己。
 */

export const profile = {
  identity: { en: 'AI developer', zh: 'AI 开发' } as L10n,
  job: { en: 'AI front-end', zh: 'AI 前端' } as L10n,
  /** 「在做」一栏，链到作品章 */
  making: { en: 'The yado series', zh: '芽豆系列' } as L10n,
  statement: {
    en: "I'm Yado, and I build things with AI. By day I work on AI front-ends; after hours I make my own apps, from the interface down to the server. This site is where they live: the finished ones, the unfinished ones, and a few things that have nothing to do with code.",
    zh: '我是 Yado，做 AI 开发。白天在公司写 AI 前端，下班以后做自己的 App，从界面到服务器都自己来。这个网站放着这些东西：做好的、还没做完的，还有一些和代码无关的事。',
  } as L10n,
};

/** 幕后：芽豆系列是怎么做出来的。只写用了什么、怎么分工 */
export const behind: { lede: L10n; items: { label: L10n; body: L10n }[] } = {
  lede: {
    en: 'Everything in the yado series, from the apps to the servers, is written by one person. A lot of the work is handed to AI.',
    zh: '芽豆系列从 App 到服务器都是我一个人写的，很多活儿交给了 AI。',
  },
  items: [
    {
      label: { en: 'Apps', zh: 'App' },
      body: {
        en: 'Native iOS, written in Swift and SwiftUI.',
        zh: 'iOS 原生，用 Swift 和 SwiftUI 写。',
      },
    },
    {
      label: { en: 'Server', zh: '后端' },
      body: {
        en: 'Node, Hono, Drizzle and PostgreSQL. One setup, shared by every app.',
        zh: 'Node、Hono、Drizzle 和 PostgreSQL，几个 App 共用一套。',
      },
    },
    {
      label: { en: 'AI', zh: 'AI' },
      body: {
        en: 'A shared AI service for model calls and credits. The AI bookkeeping in yadoA runs on it.',
        zh: '一个共用的 AI 服务，管模型调用和点数。芽豆资产的 AI 记账就跑在上面。',
      },
    },
    {
      label: { en: 'Agents', zh: 'Agent' },
      body: {
        en: 'Agents I wrote run on my machine. They review and clean up code, and sometimes build a feature straight from a description.',
        zh: '本机跑着自己写的 agent：review 代码、清理代码，有时直接按需求把功能写出来。',
      },
    },
    {
      label: { en: 'Web', zh: '网页' },
      body: {
        en: 'The day job. This site is built with Astro and ships almost no JavaScript.',
        zh: '本职工作。这个网站用 Astro 写，几乎不带 JavaScript。',
      },
    },
  ],
};

/**
 * 下班后：兴趣会常换，增删就是增删一条，顺序就是显示顺序，几条都排得下。
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
