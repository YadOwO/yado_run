<div align="center">
  <h1>yado_run</h1>
  <p>
    <strong>Constructing Order in a Chaotic Web.</strong>
  </p>
  
  <p>
    <a href="https://yado1225.top">Live Site</a> • 
    <a href="#-architecture">Architecture</a> • 
    <a href="#-engineering">Engineering</a>
  </p>

  <br />

  <img src="https://img.shields.io/badge/Stack-Vite_React-000000?style=flat-square" alt="React" />
  <img src="https://img.shields.io/badge/Style-Tailwind_CSS-000000?style=flat-square" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Deployment-Vercel-000000?style=flat-square" alt="Vercel" />
  <img src="https://img.shields.io/badge/CI%2FCD-GitHub_Actions-000000?style=flat-square" alt="CI/CD" />

</div>

<br />

> "When I am silent, I feel full."
>
> [cite_start]— 一个关于身份、技艺与节奏的数字探索。 

## 01. Philosophy

[cite_start]**yado_run** 不仅仅是一个作品集；它是“秩序”的具体体现。它摒弃了现代 Web 的嘈杂，追求静谧与清晰。  [cite_start]界面采用“滚动揭示”叙事逻辑，让内容在用户准备好接收时才精准呈现。 

## 02. Architecture & Physics

[cite_start]本项目不仅关注视觉，更专注于性能表现（0 CLS）与交互物理学。 

### The Stack
- [cite_start]**Core**: React 19 + Vite (极致的开发与构建速度) 
- [cite_start]**Styling**: Tailwind CSS (Utility-first, 零冗余样式) 
- [cite_start]**Physics**: Framer Motion (基于 Spring 的物理交互) 
- [cite_start]**Intelligence**: 基于 Gemini API 的动态哲学语录生成 

### Key Features
- [cite_start]**Apple Spring**: 全局统一的物理常量 (`stiffness: 150`, `damping: 20`)，确保每一次交互都具备真实的物理反馈。 
- [cite_start]**Glassmorphism**: 遵循 Apple 风格的毛玻璃质感，适配系统级的 Dark Mode 切换。 

## 03. Engineering (CI/CD)

为了体现前端架构的严谨性，本项目构建了完整的自动化流水线：

- [cite_start]**自动化构建**: 接入 GitHub Webhook，每次 Push 自动触发 Vercel 构建。 [cite: 29, 30]
- [cite_start]**版本化发布**: 采用基于 Git Tag 的部署策略，只有推送 `v*` 标签时才触发生产环境更新。 
- **网络优化**: 配置自定义域名 `yado1225.top` 与 Anycast IP，实现国内环境免代理 HTTPS 直连秒开。 [cite: 29]
- **SEO 闭环**: 自动化生成 `sitemap.xml` 与 `robots.txt`，并集成 Google Search Console 实时监控收录状态。 [cite: 31]

## 04. Running Locally

```bash
# 克隆仓库
git clone git@github.com:YadOwO/yado_run.git

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev