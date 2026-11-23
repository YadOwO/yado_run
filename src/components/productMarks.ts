/**
 * 产品标志：从原始 SVG 里取出路径，供主视觉（KeyArt）和首页正片（home/Film）共用。
 * 最后一条路径是强调色那一笔（芽豆资产的对勾、芽豆有物的切面），画的时候给它加遮罩，遮罩矩形展开，就像写出来的。
 */
import yadoaMark from '@/assets/yadoa-mark.svg?raw';
import yadoiMark from '@/assets/yadoi-mark.svg?raw';

export interface ProductMark {
  viewBox: string;
  paths: { d: string; fill: string }[];
  /** 原始 SVG 里 <defs> 的内容（渐变）；路径的 fill 可以是 url(#…) 引用它们。没有就是空串 */
  defs: string;
  /** 遮罩矩形：盖住强调色那一笔的 x、y、宽、高 */
  wipe: [number, number, number, number];
  /** 遮罩往哪个方向展开：x 从左往右（对勾），y 从上往下（竖着的切面） */
  wipeAxis: 'x' | 'y';
}

function parse(raw: string): Pick<ProductMark, 'viewBox' | 'paths' | 'defs'> {
  const viewBox = raw.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 100 100';
  const paths = [...raw.matchAll(/<path d="([^"]+)"[^>]*fill="([^"]+)"/g)].map((m) => ({ d: m[1], fill: m[2] }));
  const defs = raw.match(/<defs>([\s\S]*?)<\/defs>/)?.[1].trim() ?? '';
  return { viewBox, paths, defs };
}

/** 按产品 slug 取；没有标志的产品用代号文字顶上 */
export const productMarks: Record<string, ProductMark> = {
  yadoa: { ...parse(yadoaMark), wipe: [330, 490, 440, 260], wipeAxis: 'x' },
  yadoi: { ...parse(yadoiMark), wipe: [584, 152, 52, 214], wipeAxis: 'y' },
};

/**
 * 某一处要画的标志：渐变的 id 都加上后缀。
 * 同一页可能出现两次同一个标志（首页正片和目录缩略），id 重复时 url(#…) 会指到第一份，
 * 那一份要是正好被隐藏，另一份就画不出颜色。
 * @param mark 标志
 * @param suffix 这一处独有的后缀，例如 `yadoi-full`
 */
export function markInstance(mark: ProductMark, suffix: string): Pick<ProductMark, 'defs' | 'paths'> {
  const rename = (s: string) =>
    s.replace(/id="([^"]+)"/g, `id="$1-${suffix}"`).replace(/url\(#([^)]+)\)/g, `url(#$1-${suffix})`);
  return { defs: rename(mark.defs), paths: mark.paths.map((p) => ({ d: p.d, fill: rename(p.fill) })) };
}
