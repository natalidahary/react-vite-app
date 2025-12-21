import { Routes, Route } from "react-router-dom";
import { Navbar , CartSidebar, ToastHost} from "@/components";
import { ProductNotes, About, Products, ProductDetail } from "@/pages";
import { useThemeStore, applyPrimeTheme } from "@/stores";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";

export const App = () => {
  const theme = useThemeStore((s) => s.theme);
  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.className = theme;
    applyPrimeTheme(theme);
  }, [theme]);

  useEffect(() => {
    const isRTL = i18n.language === "he";
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div>
      <Navbar />
      <CartSidebar />
      <ToastHost />
      <Routes>
        <Route path="/" element={<ProductNotes />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};
