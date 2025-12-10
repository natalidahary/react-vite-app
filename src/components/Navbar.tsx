import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="app-nav">
      <Link to="/" className="app-nav-link">Notes</Link>
      <Link to="/about" className="app-nav-link">About</Link>
      <Link to="/products" className="app-nav-link">Products</Link>
    </nav>
  );
};
