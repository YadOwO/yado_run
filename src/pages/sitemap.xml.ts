/**
 * sitemap 在构建时生成：首页、每一章、每个有产品页的产品、每篇法律文档，各带中英两个版本。
 * 加章节或产品页后不用再手动维护。
 */
import type { APIRoute } from 'astro';
import { CHAPTERS, chapterPath } from '@/data/chapters';
import { legalPaths } from '@/data/legal';
import { productPath, productsWithPage } from '@/data/products';
import { LOCALES, href, htmlLang } from '@/i18n';

export const GET: APIRoute = async ({ site }) => {
  const paths = ['/', ...CHAPTERS.map(chapterPath), ...productsWithPage.map(productPath), ...(await legalPaths())];
  const base = site ?? new URL('https://my.yado1225.top');
  const abs = (path: string) => new URL(path, base).href;

  const urls = paths.flatMap((path) =>
    LOCALES.map((lang) => {
      const alternates = LOCALES.map(
        (alt) => `    <xhtml:link rel="alternate" hreflang="${htmlLang[alt]}" href="${abs(href(alt, path))}" />`,
      ).join('\n');
      return `  <url>\n    <loc>${abs(href(lang, path))}</loc>\n${alternates}\n  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
