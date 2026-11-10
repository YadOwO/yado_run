import { getCollection, type CollectionEntry } from 'astro:content';
import { LOCALES, type Lang } from '@/i18n';

/**
 * 法律文档：每个 App 的隐私政策、用户协议、第三方信息共享清单。
 * 加一个 App = 在 `src/content/legal/<app>/` 下放 `en/` 和 `zh/` 两个文件夹，里面放 `privacy.md`、`terms.md`，
 * 需要时再放 `sharing.md`；路由、sitemap、页面顶部的文档切换自动跟上，不用改代码。App 里填的链接见 `legalPath()`。
 */

/**
 * 支持的文档种类，也是 URL 的最后一段；顺序就是页面顶部切换链接的顺序。
 * sharing 是第三方信息共享清单：模型服务商等接收方单独列在这里，换服务商时只改这一页，不动隐私政策正文。
 */
export const LEGAL_DOCS = ['privacy', 'sharing', 'terms'] as const;
export type LegalDoc = (typeof LEGAL_DOCS)[number];

export type LegalEntry = CollectionEntry<'legal'>;

/** 一篇文档在 URL 上的位置 */
export interface LegalRef {
  /** App 代号，小写，例如 `yadoa` */
  app: string;
  lang: Lang;
  doc: LegalDoc;
}

/**
 * 不带语言前缀的文档路径，例如 `/legal/yadoa/privacy/`；中文版再由 `href('zh', …)` 加 `/zh` 前缀。
 * @param app App 代号
 * @param doc 文档种类
 */
export function legalPath(app: string, doc: LegalDoc): string {
  return `/legal/${app}/${doc}/`;
}

/** 从集合 id（`yadoa/zh/privacy`）解析出 App、语言和文档；不认识的文件直接报错，免得悄悄漏掉 */
export function parseLegalId(id: string): LegalRef {
  const [app, lang, doc] = id.split('/');
  if (!app || !LOCALES.includes(lang as Lang) || !LEGAL_DOCS.includes(doc as LegalDoc)) {
    throw new Error(`法律文档路径应为 <app>/<en|zh>/<${LEGAL_DOCS.join('|')}>.md，实际是 ${id}.md`);
  }
  return { app, lang: lang as Lang, doc: doc as LegalDoc };
}

/** 某个语言下的全部文档 */
export async function legalEntries(lang: Lang): Promise<{ entry: LegalEntry; ref: LegalRef }[]> {
  const entries = await getCollection('legal');
  return entries.map((entry) => ({ entry, ref: parseLegalId(entry.id) })).filter(({ ref }) => ref.lang === lang);
}

/** 全部文档的路径（不带语言前缀，去重），给 sitemap 用；只收中英两版都有的，hreflang 才不会指向不存在的页面 */
export async function legalPaths(): Promise<string[]> {
  const refs = (await getCollection('legal')).map((entry) => parseLegalId(entry.id));
  const key = (ref: LegalRef) => legalPath(ref.app, ref.doc);
  return [...new Set(refs.map(key))].filter((path) =>
    LOCALES.every((lang) => refs.some((ref) => ref.lang === lang && key(ref) === path)),
  );
}
