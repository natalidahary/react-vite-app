import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "@/api/products";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader, ErrorMessage, ProductList } from "@/components";

export const Products = () => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 400);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", debounced],
    queryFn: () => fetchProducts(debounced),
  });

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

      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message="Error fetching products" />
      ) : products.length === 0 ? (
        <p className="no-results">No products found.</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};