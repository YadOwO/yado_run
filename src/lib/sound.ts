/**
 * 页面过渡音效工具
 * 使用 Web Audio API 合成极简点击音，无需外部音频文件
 */

let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  try {
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    return audioCtx;
  } catch {
    return null;
  }
};

/**
 * 合成一个短促的过渡音
 * @param frequency - 基础频率（Hz）
 * @param duration - 持续时间（秒）
 * @param gain - 音量（0-1）
 */
const playTone = (frequency: number, duration: number, gain: number) => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    // 频率快速衰减，模拟拨弦/敲击质感
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.6, ctx.currentTime + duration);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(gain, ctx.currentTime + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch {
    // 静默失败，不影响交互体验
  }
};

/** 进入子页面 - 轻盈上扬音 */
export const playNavigate = () => {
  playTone(520, 0.12, 0.08);
};

/** 返回主页 - 收敛下沉音 */
export const playBack = () => {
  playTone(380, 0.10, 0.06);
};
