import { ReactNode, useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";

const THEME_MAP = {
  light: "/themes/lara-light-blue/theme.css",
  dark: "/themes/lara-dark-blue/theme.css",
};

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    // 1. Body class (for your custom CSS)
    document.body.className = theme;

    // 2. PrimeReact theme
    let link = document.getElementById(
      "primereact-theme"
    ) as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.id = "primereact-theme";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    link.href = THEME_MAP[theme];
  }, [theme]);

  return <>{children}</>;
};