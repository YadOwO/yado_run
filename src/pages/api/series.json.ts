/**
 * 芽豆系列的产品目录，给各 App 的「更多芽豆产品」页用：App 拉这份 JSON，用自己的样式画列表。
 * 构建时从 `PRODUCTS` 生成，只含 `seriesProducts`；产品上架、改介绍后重新部署网站即可，App 不用发版。
 *
 * 各 App 按这里的字段解码（yadoA 在 `Features/Series/SeriesCatalog.swift`），所以：
 * - 路径 `/api/series.json` 不要改；
 * - 字段只加不改、不删；`status` 只会是 `coming-soon` 或 `now-showing`，App 遇到不认识的值会跳过那个产品。
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { APIRoute } from 'astro';
import { productPath, seriesProducts } from '@/data/products';
import { LOCALES, href, type L10n } from '@/i18n';

/** 目录里的一个产品 */
interface SeriesItem {
  /** 产品代号，小写，和 yado_hub、yado_ai 的 `PRODUCT_CODES` 一致；App 用它把自己从列表里去掉 */
  code: string;
  name: L10n;
  /** 一句话介绍 */
  tagline: L10n | null;
  status: 'coming-soon' | 'now-showing';
  /** 产品强调色，`#RRGGBB`；没有图标时 App 用它画占位 */
  accent: string;
  /** 图标的完整地址；`public/series/<slug>.png` 存在才有 */
  iconURL: string | null;
  /** App Store 的数字 ID；没上架时为 null */
  appStoreId: string | null;
  /** 产品页的完整地址（中英各一个）；没有产品页时为 null */
  pageURL: L10n | null;
}

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://my.yado1225.top');
  const abs = (path: string) => new URL(path, base).href;

  const products: SeriesItem[] = seriesProducts.map((product) => {
    const iconPath = `/series/${product.slug}.png`;
    const hasIcon = existsSync(join(process.cwd(), 'public', iconPath));
    const pagePath = product.page ? productPath(product) : null;
    return {
      code: product.slug,
      name: product.name,
      tagline: product.logline ?? null,
      status: product.status as SeriesItem['status'],
      accent: product.accent,
      iconURL: hasIcon ? abs(iconPath) : null,
      appStoreId: product.series.appStoreId ?? null,
      pageURL: pagePath
        ? (Object.fromEntries(LOCALES.map((lang) => [lang, abs(href(lang, pagePath))])) as L10n)
        : null,
    };
  });

  return new Response(JSON.stringify({ version: 1, products }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
