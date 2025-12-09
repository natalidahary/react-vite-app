import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { fetchProducts } from "@/api/products";
import { useDebounce } from "@/hooks/useDebounce";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import ProductList from "@/components/ProductList";

export default function Products() {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 400);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", debounced],
    queryFn: () => fetchProducts(debounced),
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message="Error fetching products" />;

  const products = data?.products ?? [];

  return (
    <div className="products-page">
      <h2 className="products-title">Products</h2>

      <input
        className="products-search"
        value={search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {products.length === 0 ? (
      <p className="no-results">No products found.</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}