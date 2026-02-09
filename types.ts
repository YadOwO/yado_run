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
  },
  CN: {
    quote: "代码即诗。",
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
  },
};
