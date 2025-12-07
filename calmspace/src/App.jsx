import { Routes, Route, Link } from "react-router-dom";
import DailyNote from "./components/DailyNote";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";

function About() {
  return (
    <div style={{
      padding: "3rem",
      margin: "3rem auto",
      lineHeight: "1.6",
      background: "#d6c8c8ff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    }}>
      <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" ,  textAlign: "center"}}>
        About CalmSpace
      </h2>

      <p style={{ fontSize: "1.1rem", color: "#080707ff" , fontWeight: 600}}>
        CalmSpace is a minimal digital workspace designed to help you breathe, 
        focus, and work with intention. It encourages a gentle, distraction-free 
        rhythm so you can stay centered while moving through your day.
      </p>

      <p style={{ fontSize: "1.1rem", color: "#080707ff", marginTop: "1rem" , fontWeight: 600}}>
        Whether you're jotting down a daily intention, organizing simple tasks, 
        or reflecting on your progress, CalmSpace gives you a clear and peaceful 
        environment to support mindful productivity.
      </p>

      <p style={{ fontSize: "1.1rem", color: "#080707ff", marginTop: "1rem" , fontWeight: 600}}>
        The goal is simple: create a workspace that feels calm, clean, and beautifully 
        minimal — so your mind has room to breathe.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <nav style={{ padding: "1rem", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "1rem", color: "#080707ff" }}>Dashboard</Link>
        <Link to="/about" style={{ marginRight: "1rem", color: "#080707ff" }}>About</Link>
        <Link to="/products" style={{ marginRight: "1rem", color: "#080707ff"}}>Products</Link>
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