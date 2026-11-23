import type { L10n } from '@/i18n';

/**
 * 片单：芽豆系列的全部作品。
 * 加一个产品 = 在 PRODUCTS 里加一条；状态一改，全站的标签、按钮、排序跟着变。
 */

/** 产品阶段，对应影片的制作状态；数组顺序就是作品章概况里的显示顺序 */
export const STATUSES = ['now-showing', 'coming-soon', 'production', 'development'] as const;
export type Status = (typeof STATUSES)[number];

/** 已经对外的阶段（即将上映、已上映）：状态标签的圆点会呼吸，也只有这些会进各 App 的「更多芽豆产品」 */
export const PUBLIC_STATUSES = ['coming-soon', 'now-showing'] as const satisfies readonly Status[];
export type PublicStatus = (typeof PUBLIC_STATUSES)[number];
export function isPublicStatus(status: Status): status is PublicStatus {
  return (PUBLIC_STATUSES as readonly Status[]).includes(status);
}

export interface Highlight {
  title: L10n;
  body: L10n;
}

/**
 * 剧照：在产品页的底色和墨色上，把一个核心动作演一遍；有了真实截图后可换成图片。
 * 每个产品演的动作不同，用 kind 区分，产品页按它挑组件（components/product/）。
 */
export type Still = VoiceStillData | ItemsStillData;

/** 语音记账（芽豆资产）：一句话写出来，记成几笔账 */
export interface VoiceStillData {
  kind: 'voice';
  caption: L10n;
  heard: L10n;
  done: L10n;
  rows: { label: L10n; category: L10n; amount: string }[];
}

/** 示例物品（芽豆有物）：几件东西依次落下，每件算出每天花多少，最后合计还持有的购入总值 */
export interface ItemsStillData {
  kind: 'items';
  caption: L10n;
  items: StillItem[];
}

export interface StillItem {
  name: L10n;
  /** 图标，图形画在 ItemsStill 里 */
  icon: 'camera' | 'headphones' | 'gamepad';
  /** 和 App 的 ItemStatus 一致：使用中、已退役仍算持有（计入合计），已售出不算 */
  status: 'in-use' | 'retired' | 'sold';
  price: number;
  /** 卖出价，只有已售出的才有；每天花多少要先扣掉它 */
  salePrice?: number;
  /** 持有天数 */
  days: number;
}

/**
 * 产品自己的世界：产品页换成产品 App 深色外观的底色和墨色，线条照 App 的样子画，标题改用系统衬线（与 App 一致）。
 * 用深色外观而不是浅色，是为了和站点的暗场一路衔接：点进来仍然是暗的，但已经是这个 App 的样子。
 * 片框（HUD、文字、线条）仍然只有一种墨色；强调色仍是 Product.accent（它本来就是 App 深色外观里的那一档）。
 */
export interface ProductTheme {
  /** 页面底色（App 深色外观的画布色） */
  paper: string;
  /** 比底色略亮的一层，用于卡片（App 深色外观的卡片色） */
  surface: string;
  /** 墨色：文字、线条、HUD（App 深色外观的正文色） */
  ink: string;
  /**
   * 线条：hand 是账簿上随手画的墨线（components/ink/，芽豆资产），
   * fine 是平整的直细线（芽豆有物的卡片和分隔线就是这样）。照着 App 自己的样子选。
   */
  lines: 'hand' | 'fine';
}

/**
 * 把产品的世界罩到一块元素上：写在它的 style 里，同时给它 data-theme="app"，其余墨色由 tokens.css 推导。
 * 产品页是整页（Base 写在 <html> 上），首页正片和片单海报是其中一块。
 */
export function themeVars(theme: ProductTheme): string {
  return `--bg:${theme.paper};--bg-raise:${theme.surface};--ink:${theme.ink}`;
}

export interface ProductPage {
  /** 有了就用产品 App 的样子来呈现产品页，否则沿用站点的暗场 */
  theme?: ProductTheme;
  /** 规格表里“形态”“账号”两栏，平台和年份取自产品本身 */
  format: L10n;
  account: L10n;
  still?: Still;
  highlights: Highlight[];
  behind: { title: L10n; body: L10n };
}

export interface Product {
  /** 代号的小写形式，也是产品页地址的最后一段（见 productPath()：/works/yadoa/） */
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
  /** TestFlight 公开测试的邀请链接；填了产品页就给出「加入测试」的入口，上架后删掉 */
  testFlight?: string;
  /** 填了才会出现在各 App 的「更多芽豆产品」里，见 `seriesProducts` */
  series?: SeriesListing;
}

/**
 * 产品在各 App「更多芽豆产品」页里的展示信息，随 `/api/series.json` 下发（见 `pages/api/series.json.ts`）。
 * 图标不在这里填：放一张 `public/series/<slug>.png`（正方形，建议 360×360，不带圆角）就会自动带上。
 */
export interface SeriesListing {
  /** App Store 的数字 ID（链接里 `id` 后面那串）；上架后填，App 才显示「获取」 */
  appStoreId?: string;
}

/**
 * 海报墙是否公开。
 * false：作品章片单只显示“另有 N 部作品拍摄中”，有了产品页的作品露出海报，其余是空白海报位，不露片名。
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
    series: {},
    testFlight: 'https://testflight.apple.com/join/jNjBZY3c',
    logline: {
      en: "A ledger that listens. Say it once, and it's written down.",
      zh: '会听话的账本。说一句话，账就记好了。',
    },
    page: {
      theme: { paper: '#101112', surface: '#1B1C1E', ink: '#F2EFE7', lines: 'hand' },
      format: { en: 'iPhone', zh: 'iPhone' },
      account: {
        en: 'On-device first · one yado account across the series',
        zh: '先在本机用 · 芽豆系列共用一个账号',
      },
      still: {
        kind: 'voice',
        caption: { en: 'Still 01 — Voice entry', zh: '剧照 01 — 语音记账' },
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
    logline: {
      en: 'Everything you own, in one place.',
      zh: '你拥有的，都记在这里。',
    },
    page: {
      // App 的默认皮肤「冰川」（yadoI Core/Theme/ThemeCatalog.swift）；卡片平整、分隔是直细线
      theme: { paper: '#06090C', surface: '#11171C', ink: '#EAF2F7', lines: 'fine' },
      format: { en: 'iPhone', zh: 'iPhone' },
      account: {
        en: 'On-device first · one yado account across the series',
        zh: '先在本机用 · 芽豆系列共用一个账号',
      },
      // 和 App 首次引导里的三件示例物品一样（yadoI Features/Onboarding/OnboardingDemoSteps.swift）
      still: {
        kind: 'items',
        caption: { en: 'Still 01 — Sample items', zh: '剧照 01 — 示例物品' },
        items: [
          { name: { en: 'Camera', zh: '相机' }, icon: 'camera', status: 'in-use', price: 6999, days: 428 },
          { name: { en: 'Headphones', zh: '耳机' }, icon: 'headphones', status: 'retired', price: 1899, days: 1096 },
          {
            name: { en: 'Game controller', zh: '游戏手柄' },
            icon: 'gamepad',
            status: 'sold',
            price: 649,
            salePrice: 300,
            days: 512,
          },
        ],
      },
      highlights: [
        {
          title: { en: 'Add it now, fill it in later.', zh: '先记下，以后再补。' },
          body: {
            en: 'Snap a photo or pick an icon to add an item. Price and dates can wait. Photos are cut out on the phone and turned into a sticker.',
            zh: '拍张照或选个图标就能记一件，价格、日期以后再补。照片在手机上抠出主体，做成一张贴纸。',
          },
        },
        {
          title: { en: 'What it costs per day.', zh: '每天花多少，算给你看。' },
          body: {
            en: 'The price divided by the days you have had it. Sold items subtract the sale price. Total spent and how many are still in use, all worked out for you.',
            zh: '买价除以用了多少天，就是每天花多少；卖掉的扣掉售价。购入总额、还在用的有几件，都替你算好。',
          },
        },
        {
          title: { en: 'From bought to gone.', zh: '从买来到离开。' },
          body: {
            en: 'Every item is in use, retired or sold. The timeline lines them up by purchase date, and a reminder comes before a warranty runs out.',
            zh: '每件东西有三种状态：使用中、已退役、已售出。时间轴按购入日期排开，保修快到期会提前提醒。',
          },
        },
      ],
      behind: {
        title: { en: 'Mystery boxes and skins.', zh: '盲盒和皮肤。' },
        body: {
          en: 'Each achievement brings a mystery box. Tear the seal sideways to open it: inside is a skin or a new display for Home. Glacier is the default skin, near-black with ice-blue accents, and it is the one this page is drawn in.',
          zh: '达成成就会收到一个盲盒，横着撕开封条才能拆开，里面是一套皮肤或首页的新展台。冰川是默认的那一套：近黑的底色，冰蓝的强调色，这一页用的就是它。',
        },
      },
    },
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

/**
 * 片单上的作品：主推之外、还没上映的。
 * 海报墙不公开时，其中有产品页的露出海报（点进产品页），其余只占一个空白海报位。
 */
export const slateProducts = PRODUCTS.filter((p) => !p.featured && p.status !== 'now-showing');

/**
 * 各 App「更多芽豆产品」里能看到的产品：打了 `series` 且已经对外（即将上映或已上映）。
 * 还在开发的产品即使打了 `series` 也不下发，和 `SLATE_PUBLIC` 不露片名是同一个意思。
 */
export const seriesProducts = PRODUCTS.filter(
  (p): p is Product & { series: SeriesListing; status: PublicStatus } => !!p.series && isPublicStatus(p.status),
);

export const productsWithPage = PRODUCTS.filter((p): p is Product & { page: ProductPage } => !!p.page);

/** 首页正片里的作品：有产品页的一部一个镜头，主推在前，其余按片单顺序跟在后面 */
export const filmProducts = [...productsWithPage].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

/** 产品页底部的「下一部」：片单顺序里排在后面、也有产品页的那一部；没有就是 undefined（链到片单的空白海报位） */
export function nextWithPage(product: Product): (Product & { page: ProductPage }) | undefined {
  const at = PRODUCTS.indexOf(product);
  return productsWithPage.find((p) => PRODUCTS.indexOf(p) > at);
}
