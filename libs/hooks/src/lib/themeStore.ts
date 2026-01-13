import { create } from "zustand";

export type Theme = "light" | "dark";

const THEME_MAP: Record<Theme, string> = {
  light: "/themes/lara-light-blue/theme.css",
  dark: "/themes/lara-dark-blue/theme.css",
};

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

const stored = localStorage.getItem("theme");

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: stored === "dark" || stored === "light" ? stored : "light",

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return { theme: next };
    }),
}));

export const applyPrimeTheme = (theme: Theme) => {
  const link = document.getElementById("primereact-theme") as HTMLLinkElement;
  if (!link) return;
  link.href = THEME_MAP[theme];
};