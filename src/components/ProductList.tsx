import { Product } from "@/types/product";
import { Link } from "react-router-dom";

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="product-grid">
      {products.map((item) => (
        <Link
          key={item.id}
          to={`/products/${item.id}`}
          className="product-card"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="product-card-image"
          />
          <h3 className="product-card-title">{item.title}</h3>
        </Link>
      ))}
    </div>
  );
};