import { Product } from "@/types/product";
import { Link } from "react-router-dom";

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <ul className="products-list">
      {products.map((item) => (
        <li key={item.id} className="products-item">
          <Link to={`/products/${item.id}`} className="products-link">
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};