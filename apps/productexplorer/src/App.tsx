import { Routes, Route } from "react-router-dom";
import { Navbar, CartSidebar, Toaster } from "@productexplorer/ui";
import { ProductForm, About, Products, ProductDetail } from "./pages";
import "./App.css";

export const App = () => {
  return (
    <div>
      <Navbar />
      <CartSidebar />
      <Toaster />

      <Routes>
        <Route path="/" element={<ProductForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};
