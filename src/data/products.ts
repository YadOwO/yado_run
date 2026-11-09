import type { L10n } from '@/i18n';

/**
 * 片单：芽豆系列的全部作品。
 * 加一个产品 = 在 PRODUCTS 里加一条；状态一改，全站的标签、按钮、排序跟着变。
 */

/** 产品阶段，对应影片的制作状态 */
export type Status = 'development' | 'production' | 'coming-soon' | 'now-showing';

export interface Highlight {
  title: L10n;
  body: L10n;
}

/** 剧照：用产品自己的纸色和墨色，把一个核心动作演一遍；有了真实截图后可换成图片 */
export interface Still {
  caption: L10n;
  paper: string;
  ink: string;
  heard: L10n;
  done: L10n;
  rows: { label: L10n; category: L10n; amount: string }[];
}

export interface ProductPage {
  /** 规格表里“形态”“账号”两栏，平台和年份取自产品本身 */
  format: L10n;
  account: L10n;
  still?: Still;
  highlights: Highlight[];
  behind: { title: L10n; body: L10n };
}

export interface Product {
  /** URL 与代号：/yadoa/ */
  slug: string;
  codename: string;
  name: L10n;
  status: Status;
  /** 产品强调色：只在该产品的场景里出现 */
  accent: string;
  platform: string;
  year: number;
  logline?: L10n;
  /** 首页“即将上映”位 */
  featured?: boolean;
  /** 有了独立产品页才填 */
  page?: ProductPage;
}

/**
 * 海报墙是否公开。
 * false：首页第三幕只显示“另有 N 部作品拍摄中”和空白海报位，不露片名。
 */
export const SLATE_PUBLIC = false;

export const PRODUCTS: Product[] = [
  {
    slug: 'yadoa',
    codename: 'yadoA',
    name: { en: 'yado Assets', zh: '芽豆资产' },
    status: 'coming-soon',
    accent: '#F0674C',
    platform: 'iOS 18+',
    year: 2026,
    featured: true,
    logline: {
      en: "A ledger that listens. Say it once, and it's written down.",
      zh: '会听话的账本。说一句话，账就记好了。',
    },
    page: {
      format: { en: 'iPhone', zh: 'iPhone' },
      account: {
        en: 'On-device first · one yado account across the series',
        zh: '先在本机用 · 芽豆系列共用一个账号',
      },
      still: {
        caption: { en: 'Still 01 — Voice entry', zh: '剧照 01 — 语音记账' },
        paper: '#F2EFE7',
        ink: '#17181A',
        heard: { en: '“Lunch 32, taxi 28”', zh: '「午饭 32，打车 28」' },
        done: { en: '2 entries logged', zh: '已记 2 笔' },
        rows: [
          { label: { en: 'Lunch', zh: '午饭' }, category: { en: 'Dining', zh: '餐饮' }, amount: '−32.00' },
          { label: { en: 'Taxi', zh: '打车' }, category: { en: 'Transport', zh: '交通' }, amount: '−28.00' },
        ],
      },
      highlights: [
        {
          title: { en: 'Say it once.', zh: '说一句，就记好。' },
          body: {
            en: '“Lunch 32, taxi 28.” One sentence becomes two entries. The AI writes them down; you only glance.',
            zh: '「午饭 32，打车 28」，一句话记成两笔。AI 负责写，你只需要看一眼。',
          },
        },
        {
          title: { en: 'The home screen is the ledger.', zh: '首页就是账本。' },
          body: {
            en: 'Open it and write. No menus, no hunting for a plus button.',
            zh: '打开就能记，不用找入口，也不用先填表。',
          },
        },
        {
          title: { en: 'Built around accounts.', zh: '以账户为中心。' },
          body: {
            en: "See what's left in every account first — and why each balance changed.",
            zh: '先看每个账户还剩多少，每一笔余额变化都说得清楚。',
          },
        },
      ],
      behind: {
        title: { en: 'Paper and ink.', zh: '纸和墨。' },
        body: {
          en: 'The interface is drawn like a ledger book. Ink lines write themselves in, a bean drops onto the page, and every tap carries a haptic beat timed to the motion.',
          zh: '界面画得像一本账簿：墨线自己写出来，一颗豆子落到纸上，每一次点击都配了与动作同拍的触感。',
        },
      },
    },
  },
  {
    slug: 'yadoi',
    codename: 'yadoI',
    name: { en: 'yado Items', zh: '芽豆有物' },
    status: 'production',
    accent: '#B9D9F0',
    platform: 'iOS 18+',
    year: 2026,
  },
  {
    slug: 'yadol',
    codename: 'yadoL',
    name: { en: 'yadoL', zh: '撸了么' },
    status: 'production',
    accent: '#C96442',
    platform: 'iOS',
    year: 2026,
  },
  {
    slug: 'yador',
    codename: 'yadoR',
    name: { en: 'yadoR', zh: '准备度' },
    status: 'production',
    accent: '#88E0CD',
    platform: 'iOS 27+ · watchOS 27+',
    year: 2026,
  },
];

export const featuredProduct = PRODUCTS.find((p) => p.featured);

/** 产品页挂在作品章下面：/works/yadoa/ */
export function productPath(product: Product): string {
  return `/works/${product.slug}/`;
}

/** 还没公开的作品：海报墙不公开时只计数 */
export const unannounced = PRODUCTS.filter((p) => !p.featured && p.status !== 'now-showing');

export const productsWithPage = PRODUCTS.filter((p): p is Product & { page: ProductPage } => !!p.page);
