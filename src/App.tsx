import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components";
import { ProductNotes, About, Products, ProductDetail } from "@/pages";
import "./App.css";

export const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<ProductNotes />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};
