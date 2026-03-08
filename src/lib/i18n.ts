import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

/** 定义支持多语言的翻译资源字典 */
const resources = {
  EN: {
    translation: {
      quote: "Less is More.",
      scrollLabel: "Scroll to explore",
      menu: {
        profile: {
          number: "01",
          title: "Profile",
          subtitle: "Who is Yado / The Manifesto",
        },
        arch: {
          number: "02",
          title: "Architecture",
          subtitle: "Front-end / Engineering / System",
        },
        play: {
          number: "03",
          title: "Playground",
          subtitle: "Cycling / CS / Rhythm",
        }
      },
      profile: {
        title: "The Manifesto",
        role: "AI Front-End",
        email: "yado.async@gmail.com",
        description: "I am a pragmatic front-end developer and architect. I believe that both code and design do not need to be pretentious; they should solve complex problems with the most restrained approach. Rather than changing the world, I focus on refining every interaction to its peak, building order and aesthetics amidst complex business logic.",
        identity: "Proletarian labourer",
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
          { title: "Minimalist UI Engineering", description: "Eliminating redundancy, focusing on core interactions and whitespace." },
          { title: "AI-Driven Full Stack", description: "Breaking client-side boundaries, extending into intelligent and server-side logic." },
          { title: "Pixel-Perfect Performance", description: "Maximizing browser capabilities for a fluid 60fps experience." },
          { title: "Developer Experience", description: "Crafting handy toolchains for a coding rhythm as smooth as a mechanical keyboard." },
          { title: "Architecture Evolution", description: "Respecting tech debt, pioneering elegant new paradigms in legacy systems." },
          { title: "Domain-Driven Components", description: "Rejecting blind reuse, building component ecosystems tailored to business needs." }
        ]
      },
      playground: {
        title: "Interests",
        subtitle: "03 PLAYGROUND",
        items: [
          { category: "CYCLING", title: "CAMP RADON\nRoad Bike" },
          { category: "CS2", title: "3000+ Hrs\nAWP Specialist" },
          { category: "MUSIC", title: "Hip-hop &\nR&B" }
        ]
      },
      common: {
        back: "Back"
      }
    }
  },
  CN: {
    translation: {
      quote: "少即是多。",
      scrollLabel: "滑动探索",
      menu: {
        profile: {
          number: "01",
          title: "简介",
          subtitle: "关于 Yado / 个人宣言",
        },
        arch: {
          number: "02",
          title: "架构",
          subtitle: "前端 / 工程化 / 系统设计",
        },
        play: {
          number: "03",
          title: "游乐场",
          subtitle: "骑行 / CS / 律动",
        }
      },
      profile: {
        title: "个人宣言",
        role: "AI前端",
        email: "yado.async@gmail.com",
        description: "我是一名务实的前端开发者与架构设计者。我相信无论是代码还是设计，都不需要故作高深，而是用最克制的方式解决最复杂的问题。比起改变世界，我更在乎将每一个交互打磨到极致，在繁杂的业务逻辑中建立秩序与美感。",
        identity: "无产阶级劳动者",
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
          { title: "极简 UI 工程", description: "剔除冗余，专注核心交互与留白艺术。" },
          { title: "AI 赋能全栈", description: "打破端侧边界，向智能化与服务端逻辑延伸。" },
          { title: "极致性能", description: "榨干浏览器性能，追求 60fps 的丝滑体验。" },
          { title: "开发者体验", description: "打造顺手的工具链，让编码拥有机械键盘般的流畅节奏感。" },
          { title: "架构演进与重构", description: "敬畏技术债，在旧系统中开辟优雅的新范式。" },
          { title: "领域驱动组件", description: "拒绝盲目复用，构建真正契合业务的组件生态。" }
        ]
      },
      playground: {
        title: "个人兴趣",
        subtitle: "03 游乐场",
        items: [
          { category: "骑行", title: "公路车\nCAMP RADON" },
          { category: "CS2", title: "3000+ 小时\nAWP 专家" },
          { category: "音乐", title: "Hip-hop\nR&B" }
        ]
      },
      common: {
        back: "返回"
      }
    }
  }
};

/** 初始化和配置 i18next 实例 */
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'EN', // 默认语言设置为英语
    fallbackLng: 'EN', // 备用语言
    interpolation: {
      escapeValue: false // React 已经处理了 XSS，无需在此处转义
    }
  });

export default i18n;
