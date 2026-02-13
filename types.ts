export type Language = "EN" | "CN";
export type Theme = "light" | "dark";
export type ViewState = "home" | "profile" | "arch" | "play";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

export interface MenuItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
}

export const contentData = {
  EN: {
    quote: "Code is Poetry.",
    scrollLabel: "Scroll to explore",
    menu: [
      {
        id: "profile" as ViewState,
        number: "01",
        title: "Profile",
        subtitle: "Who is Yado / The Manifesto",
      },
      {
        id: "arch" as ViewState,
        number: "02",
        title: "Architecture",
        subtitle: "Front-end / Engineering / System",
      },
      {
        id: "play" as ViewState,
        number: "03",
        title: "Playground",
        subtitle: "Cycling / CS Skins / Rhythm",
      },
    ],
    profile: {
      title: "The Manifesto",
      role: "Senior Front-End Architect",
      email: "yado.async@gmail.com",
      description: "I am an architect of the digital realm. I believe that code, when written with intent, transcends mere function to become a form of structural poetry. My work is defined by a relentless pursuit of order, performance, and aesthetic clarity.",
      identity: "Front-end developer, Proletarian worker",
      labels: {
        role: "Role",
        identity: "Identity",
        contact: "Contact",
        profile: "Profile"
      }
    },
    architecture: {
      title: "System Design",
      subtitle: "02 ARCHITECTURE",
      items: [
        { title: "Micro-Frontends", description: "Scalable architecture for modern web apps." },
        { title: "Design Systems", description: "Consistent visual language across platforms." },
        { title: "Server-Side Rendering", description: "Optimizing for speed and SEO." },
        { title: "State Management", description: "Predictable data flow in complex systems." },
        { title: "Performance Optimization", description: "Fluid experiences at 60fps." },
        { title: "CI/CD Pipelines", description: "Automated excellence in delivery." }
      ]
    }
  },
  CN: {
    quote: "代码即诗。",
    scrollLabel: "滑动探索",
    menu: [
      {
        id: "profile" as ViewState,
        number: "01",
        title: "简介",
        subtitle: "关于 Yado / 个人宣言",
      },
      {
        id: "arch" as ViewState,
        number: "02",
        title: "架构",
        subtitle: "前端 / 工程化 / 系统设计",
      },
      {
        id: "play" as ViewState,
        number: "03",
        title: "游乐场",
        subtitle: "骑行 / CS 饰品 / 律动",
      },
    ],
    profile: {
      title: "个人宣言",
      role: "资深前端架构师",
      email: "yado.async@gmail.com",
      description: "我是数字领域的架构师。我相信，当代码带着意图编写时，它便超越了纯粹的功能，成为一种结构化的诗歌。我的工作被对秩序、性能和审美清晰度的不懈追求所定义。",
      identity: "前端开发，无产阶级劳动者",
      labels: {
        role: "角色",
        identity: "身份",
        contact: "联系方式",
        profile: "个人简介"
      }
    },
    architecture: {
      title: "系统设计",
      subtitle: "02 架构设计",
      items: [
        { title: "微前端", description: "现代 Web 应用的可扩展架构。" },
        { title: "设计系统", description: "跨平台的一致性视觉语言。" },
        { title: "服务端渲染", description: "优化速度与 SEO。" },
        { title: "状态管理", description: "复杂系统中可预测的数据流。" },
        { title: "性能优化", description: "60fps 的流畅体验。" },
        { title: "CI/CD 流水线", description: "自动化的交付卓越性。" }
      ]
    }
  },
};
