import { Routes, Route } from "react-router-dom";
import { Navbar , CartSidebar, ToastHost} from "@/components";
import { ProductNotes, About, Products, ProductDetail } from "@/pages";
import { useThemeStore } from "@/stores";
import { useEffect } from "react";
import "./App.css";

export const App = () => {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.body.className = theme; // "light" or "dark"
  }, [theme]);

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
