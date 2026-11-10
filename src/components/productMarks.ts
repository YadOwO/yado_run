/**
 * 产品标志：从原始 SVG 里取出路径，供主视觉（KeyArt）和首页正片（home/Film）共用。
 * 最后一条路径是强调色那一笔（对勾），画的时候给它加遮罩，遮罩矩形从左往右展开，就像写出来的。
 */
import yadoaMark from '@/assets/yadoa-mark.svg?raw';

export interface ProductMark {
  viewBox: string;
  paths: { d: string; fill: string }[];
  /** 遮罩矩形：盖住强调色那一笔的 x、y、宽、高 */
  wipe: [number, number, number, number];
}

function parse(raw: string): Pick<ProductMark, 'viewBox' | 'paths'> {
  const viewBox = raw.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 100 100';
  const paths = [...raw.matchAll(/<path d="([^"]+)"[^>]*fill="([^"]+)"/g)].map((m) => ({ d: m[1], fill: m[2] }));
  return { viewBox, paths };
}

/** 按产品 slug 取；没有标志的产品用代号文字顶上 */
export const productMarks: Record<string, ProductMark> = {
  yadoa: { ...parse(yadoaMark), wipe: [330, 490, 440, 260] },
};
