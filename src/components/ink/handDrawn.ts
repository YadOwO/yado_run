/**
 * 手绘笔迹：照搬芽豆资产 App 里的 HandDrawnRule / HandDrawnBox / HandDrawnBlob（yadoA Components/HandDrawnShapes.swift）。
 * 只在构建时运行，产出 SVG 路径字符串，不给页面增加任何脚本。
 * 同一个种子永远画成同一个样子，和 App 一样“像随手画的，但每次都一样”。
 */
import yadoaMark from '@/assets/yadoa-mark.svg?raw';

export type Seed = number | bigint | string;

const MASK = (1n << 64n) - 1n;
const GOLDEN = 0x9e3779b97f4a7c15n;

/** 文本的笔迹种子（FNV-1a 64），与 App 里 String.handDrawnSeed 一致 */
function stringSeed(text: string): bigint {
  let hash = 0xcbf29ce484222325n;
  for (const byte of new TextEncoder().encode(text)) {
    hash = ((hash ^ BigInt(byte)) * 0x100000001b3n) & MASK;
  }
  return hash;
}

/** SplitMix64 抖动来源：每次返回 -1…1 之间的偏移系数 */
function jitter(seed: Seed): () => number {
  let state = ((typeof seed === 'string' ? stringSeed(seed) : BigInt(seed)) + GOLDEN) & MASK;
  return () => {
    state = (state + GOLDEN) & MASK;
    let value = state;
    value = ((value ^ (value >> 30n)) * 0xbf58476d1ce4e5b9n) & MASK;
    value = ((value ^ (value >> 27n)) * 0x94d049bb133111ebn) & MASK;
    value ^= value >> 31n;
    return (Number(value >> 11n) / 2 ** 53) * 2 - 1;
  };
}

type Point = [number, number];
const pt = ([x, y]: Point) => `${x.toFixed(1)} ${y.toFixed(1)}`;

/**
 * 一条随手画出的横线：整体水平，中途略有起伏，两端长短不齐。
 * 画在 width × height 区域的垂直中线上。
 */
export function rulePath(width: number, height: number, seed: Seed = 0): string {
  const next = jitter(seed);
  const amplitude = Math.min(height / 2, 1.1);
  const count = Math.max(2, Math.floor(width / 80));
  const step = width / count;

  const points: Point[] = [];
  for (let i = 0; i <= count; i++) {
    let x = step * i;
    // 两端各自缩进一点，避免每条线都整整齐齐顶到边
    if (i === 0) x += (next() + 1) * 2;
    else if (i === count) x -= (next() + 1) * 2;
    points.push([x, height / 2 + next() * amplitude]);
  }

  // 以相邻点的中点为端点、原始点为控制点，得到没有折角的连续曲线
  let d = `M${pt(points[0])}`;
  for (let i = 1; i < points.length - 1; i++) {
    const mid: Point = [(points[i][0] + points[i + 1][0]) / 2, (points[i][1] + points[i + 1][1]) / 2];
    d += ` Q${pt(points[i])} ${pt(mid)}`;
  }
  return `${d} L${pt(points[points.length - 1])}`;
}

/**
 * 一笔画成的圆角方框：四条边微微鼓起或内凹，收笔处略微越过起笔点。
 * 路径画在 0,0 – width,height 的区域里，描边使用。
 */
export function boxPath(width: number, height: number, cornerRadius = 20, seed: Seed = 0): string {
  const next = jitter(seed);
  const wobble = (scale = 1.3) => next() * scale;
  const r = Math.min(cornerRadius, Math.min(width, height) / 2);
  const [minX, minY, maxX, maxY, midX, midY] = [0, 0, width, height, width / 2, height / 2];

  // 每一段的参数求值顺序与 App 保持一致：先终点，再控制点
  const quad = (to: () => Point, control: () => Point) => {
    const end = to();
    const c = control();
    return ` Q${pt(c)} ${pt(end)}`;
  };

  const start: Point = [minX + r, minY + wobble()];
  let d = `M${pt(start)}`;
  d += quad(() => [maxX - r, minY + wobble()], () => [midX + wobble(12), minY + wobble(1.8)]);
  d += quad(() => [maxX + wobble(), minY + r], () => [maxX + wobble(), minY + wobble()]);
  d += quad(() => [maxX + wobble(), maxY - r], () => [maxX + wobble(1.8), midY + wobble(8)]);
  d += quad(() => [maxX - r, maxY + wobble()], () => [maxX + wobble(), maxY + wobble()]);
  d += quad(() => [minX + r, maxY + wobble()], () => [midX + wobble(12), maxY + wobble(1.8)]);
  d += quad(() => [minX + wobble(), maxY - r], () => [minX + wobble(), maxY + wobble()]);
  d += quad(() => [minX + wobble(), minY + r], () => [minX + wobble(1.8), midY + wobble(8)]);
  // 左上角收笔：越过起笔点一小段，并且没有完全对上
  d += quad(() => [start[0] + 12, start[1] - 1.6], () => [minX + wobble(), minY - 1]);
  return d;
}

/**
 * 一个不规则的圆润色块，像用笔随手涂出的底，填充使用。
 * 路径画在 0,0 – width,height 的区域里。
 */
export function blobPath(width: number, height: number, seed: Seed = 0): string {
  const next = jitter(seed);
  const count = 7;
  const [cx, cy] = [width / 2, height / 2];

  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    const angle = ((i + next() * 0.22) / count) * 2 * Math.PI;
    // 中点平滑会让曲线落在控制点内侧，这里把半径略放大以填满给定区域
    const reach = 1.04 + next() * 0.09;
    points.push([cx + Math.cos(angle) * (width / 2) * reach, cy + Math.sin(angle) * (height / 2) * reach]);
  }

  const middle = (i: number): Point => {
    const a = points[i % count];
    const b = points[(i + 1) % count];
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  };

  let d = `M${pt(middle(count - 1))}`;
  for (let i = 0; i < count; i++) d += ` Q${pt(points[i])} ${pt(middle(i))}`;
  return `${d} Z`;
}

/**
 * 芽豆资产的那一笔对勾：先短促下顿、再向右上提笔。
 * 直接取自品牌标志的第二条路径，与 App 图标、启动图、HandDrawnTick 同源。
 */
export const tick = {
  d: [...yadoaMark.matchAll(/<path d="([^"]+)"/g)].at(-1)?.[1] ?? '',
  viewBox: '336 495 424 248',
};
