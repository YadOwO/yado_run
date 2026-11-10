/**
 * 内容集合：目前只有法律文档（隐私政策、用户协议）。
 * 文件放在 `src/content/legal/<app>/<lang>/<doc>.md`，id 就是去掉扩展名的相对路径，例如 `yadoa/zh/privacy`。
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const legal = defineCollection({
  loader: glob({
    pattern: '*/*/*.md',
    base: './src/content/legal',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    /** 产品在该语言下的名字，例如「芽豆资产」 */
    app: z.string(),
    /** 文档标题，例如「隐私政策」，页面标题为「产品名 + 标题」 */
    title: z.string(),
    /** 最近更新日期，YAML 里写 `2026-11-09` 会被解析成日期 */
    updated: z.coerce.date(),
    /** 生效日期；上线前可以先写占位文字 */
    effective: z.union([z.coerce.date(), z.string()]).optional(),
  }),
});

export const collections = { legal };
