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
