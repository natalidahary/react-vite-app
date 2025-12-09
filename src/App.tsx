import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProductNotes from "@/pages/ProductNotes";
import About from "@/pages/About";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import "./App.css";

export default function App() {
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
}
