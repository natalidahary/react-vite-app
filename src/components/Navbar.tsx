import { useSidebar } from "@/hooks/useSidebar";
import { useCartStore , useThemeStore } from "@/stores";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const items = useCartStore((s) => s.items);
  const { toggleTheme, theme } = useThemeStore();

  const { t, i18n } = useTranslation("common");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <nav className="app-nav">
      <button onClick={toggleTheme} className="app-nav-link">
        {theme === "light" ? t("theme.dark") : t("theme.light")}
      </button>

      <button onClick={toggleSidebar} className="app-nav-link">
        {t("nav.cart", { count: items.length })}
      </button>

      <button onClick={() => changeLanguage("en")} className="app-nav-link">
        EN
      </button>
      <button onClick={() => changeLanguage("he")} className="app-nav-link">
        HE
      </button>

      <Link to="/" className="app-nav-link">{t("nav.notes")}</Link>
      <Link to="/about" className="app-nav-link">{t("nav.about")}</Link>
      <Link to="/products" className="app-nav-link">{t("nav.products")}</Link>
    </nav>
  );
};
