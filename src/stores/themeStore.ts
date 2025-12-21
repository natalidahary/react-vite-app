import { create } from "zustand";

export type Theme = "light" | "dark";

const THEME_MAP: Record<Theme, string> = {
  light: "/themes/lara-light-blue/theme.css",
  dark: "/themes/lara-dark-blue/theme.css",
};

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: (localStorage.getItem("theme") as Theme) || "dark",

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return { theme: next };
    }),

  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));

export const applyPrimeTheme = (theme: Theme) => {
  const link = document.getElementById(
    "primereact-theme"
  ) as HTMLLinkElement;

  if (link) {
    link.href = THEME_MAP[theme];
  }
};