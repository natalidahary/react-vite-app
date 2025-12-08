import { Routes, Route, Link } from "react-router-dom";
import DailyNote from "@/pages/DailyNote/DailyNote";
import About from "@/pages/About/About";
import styles from "./App.module.css";

export default function App() {
  return (
    <div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>Dashboard</Link>
        <Link to="/about" className={styles.navLink}>About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<DailyNote />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}