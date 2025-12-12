import { useSidebar } from "@/context/SidebarContext";
import { useCartStore , useThemeStore } from "@/stores";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const items = useCartStore((s) => s.items);
  const { toggleTheme, theme } = useThemeStore();

  return (
    <nav className="app-nav">
      <button onClick={toggleTheme} className="app-nav-link">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
      <button onClick={toggleSidebar} className="app-nav-link">
        Cart ({items.length})
      </button>

      <Link to="/" className="app-nav-link">Notes</Link>
      <Link to="/about" className="app-nav-link">About</Link>
      <Link to="/products" className="app-nav-link">Products</Link>
    </nav>
  );
};
