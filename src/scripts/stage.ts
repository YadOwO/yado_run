/**
 * 全站唯一的客户端脚本（约 1KB）：
 * 1. 元素进入视口时加 .is-in，触发 CSS 里写好的入场；
 * 2. 根据视口中央所在的场景，更新左下角场景名和录制灯颜色；
 * 3. 把滚动进度换算成右下角的时间码；
 * 4. 从 bfcache 返回时收起目录；
 * 5. 片头播放中，点击、按键、滚轮即可跳过。
 * 所有动画本身都在 CSS 里，这里只负责“什么时候”。
 */

const root = document.documentElement;

/* ---------- 1. 入场 ---------- */
const revealIo = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      revealIo.unobserve(entry.target);
    }
  },
  { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
);

document
  .querySelectorAll('[data-reveal], [data-reveal-lines], [data-inview]')
  .forEach((el) => revealIo.observe(el));

/* ---------- 2. 场景 ---------- */
const sceneLabel = document.querySelector<HTMLElement>('[data-hud-scene]');
let sceneToken = 0;

function showScene(section: HTMLElement) {
  const text = `${section.dataset.scene} — ${section.dataset.sceneLabel}`;
  root.style.setProperty('--hud-accent', section.dataset.sceneAccent ?? '');
  if (!sceneLabel || sceneLabel.textContent === text) return;

  const token = ++sceneToken;
  sceneLabel.classList.add('is-swapping');
  window.setTimeout(() => {
    if (token !== sceneToken) return;
    sceneLabel.textContent = text;
    sceneLabel.classList.remove('is-swapping');
  }, 220);
}

const sceneIo = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) showScene(entry.target as HTMLElement);
    }
  },
  { rootMargin: '-50% 0px -50% 0px' },
);

document.querySelectorAll<HTMLElement>('[data-scene]').forEach((el) => sceneIo.observe(el));

/* ---------- 3. 时间码 ---------- */
const timecode = document.querySelector<HTMLElement>('[data-hud-timecode]');
const runtime = Number(document.body.dataset.runtime) || 90;
const FPS = 24;
let ticking = false;

const pad = (n: number) => String(n).padStart(2, '0');

function renderTimecode() {
  ticking = false;
  if (!timecode) return;
  const max = root.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  const frames = Math.round(progress * runtime * FPS);
  const f = frames % FPS;
  const s = Math.floor(frames / FPS) % 60;
  const m = Math.floor(frames / (FPS * 60)) % 60;
  const h = Math.floor(frames / (FPS * 3600));
  timecode.textContent = `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
}

window.addEventListener(
  'scroll',
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(renderTimecode);
  },
  { passive: true },
);
renderTimecode();

/* ---------- 4. 目录 ---------- */
// 从目录点进别的页再按返回，页面会从 bfcache 原样恢复，目录还开着；恢复时把它收起来
window.addEventListener('pageshow', (event) => {
  if (!event.persisted) return;
  const index = document.getElementById('hud-index');
  if (index?.matches(':popover-open')) index.hidePopover();
});

/* ---------- 5. 跳过片头 ---------- */
const opening = document.querySelector<HTMLElement>('[data-opening-overlay]');

if (opening && root.dataset.opening !== 'skip') {
  const events = ['pointerdown', 'keydown', 'wheel', 'touchmove'] as const;
  const stop = () => events.forEach((type) => window.removeEventListener(type, skip));

  function skip() {
    stop();
    if (root.dataset.opening === 'skip') return;
    opening!.classList.add('is-leaving');
    root.dataset.opening = 'skip';
  }

  events.forEach((type) => window.addEventListener(type, skip, { passive: true }));
  opening.addEventListener('animationend', (event) => {
    if (event.animationName === 'opening-done') stop();
  });
}
