import { strings, type L10n } from '@/i18n';
import { PRODUCTS, type Status } from './products';

/**
 * 章节：整站按章节组织，每一章是一个独立的部分（人物、作品……），首页只是「序」和目录。
 * 加一个新部分 = 在 CHAPTERS 里加一条 + 在 pages/ 和 pages/zh/ 下加 `<slug>.astro`
 *（或 `<slug>/index.astro`），再在 ChapterStill 里给它一帧画面；
 * 首页目录、HUD 目录、下一章、sitemap 都会自动跟上。
 */
export interface Chapter {
  /** URL：/about/ */
  slug: string;
  title: L10n;
  logline: L10n;
  /** 目录里列出的小节或概况 */
  contents: L10n[];
}

/** 目录末尾是否留一行「下一章 · 筹备中」 */
export const RESERVE_NEXT_CHAPTER = true;

const STATUS_ORDER: Status[] = ['now-showing', 'coming-soon', 'production', 'development'];

/** 作品章的概况跟着产品数据走，例如「1 部即将上映 · 3 部拍摄中」 */
function worksSummary(): L10n[] {
  return STATUS_ORDER.map((status) => [status, PRODUCTS.filter((p) => p.status === status).length] as const)
    .filter(([, n]) => n > 0)
    .map(([status, n]) => ({
      en: strings.en.statusCount(n, strings.en.status[status]),
      zh: strings.zh.statusCount(n, strings.zh.status[status]),
    }));
}

export const CHAPTERS: Chapter[] = [
  {
    slug: 'about',
    title: { en: 'Portrait', zh: '人物' },
    logline: {
      en: 'Who I am, how the yado series gets made, and what I do when I’m not coding.',
      zh: '我是谁，芽豆系列怎么做出来的，以及不写代码的时候。',
    },
    contents: [
      { en: 'In my words', zh: '自述' },
      { en: 'Behind the scenes', zh: '幕后' },
      { en: 'After hours', zh: '下班后' },
    ],
  },
  {
    slug: 'works',
    title: { en: 'Filmography', zh: '作品' },
    logline: {
      en: 'The yado series — small, quiet apps, made one at a time.',
      zh: '芽豆系列：一次只做一个的安静小 App。',
    },
    contents: worksSummary(),
  },
];

/** 章节编号：CH.01 */
export function chapterNo(slug: string): string {
  const i = CHAPTERS.findIndex((c) => c.slug === slug);
  return String(i + 1).padStart(2, '0');
}

export function chapterPath(chapter: Chapter): string {
  return `/${chapter.slug}/`;
}

export function getChapter(slug: string): Chapter {
  const chapter = CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) throw new Error(`Unknown chapter: ${slug}`);
  return chapter;
}

export function nextChapter(slug: string): Chapter | undefined {
  return CHAPTERS[CHAPTERS.findIndex((c) => c.slug === slug) + 1];
}
