import { Routes, Route, Link } from "react-router-dom";
import DailyNote from "@/pages/ProductNotes/ProductNotes";
import About from "@/pages/About/About";
import Products from "@/pages/Products/Products";
import ProductDetail from "@/pages/ProductDetail/ProductDetail";
import styles from "./App.module.css";

export default function App() {
  return (
    <div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>Dashboard</Link>
        <Link to="/about" className={styles.navLink}>About</Link>
        <Link to="/products" className={styles.navLink}>Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<DailyNote />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}