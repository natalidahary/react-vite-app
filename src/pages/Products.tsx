import { useState , useRef} from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api/products";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader, ErrorMessage, ProductList } from "@/components";
import { useToastStore } from "@/stores/toastStore";
import type { ProductListResponse } from "@/types/product";

export const Products = () => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 400);

  const addToast = useToastStore((s) => s.addToast);
  const hasShownErrorRef = useRef(false);

  const { data, error, isLoading } = useQuery<ProductListResponse>({
    queryKey: ["products", debounced],
    queryFn: () => fetchProducts(debounced),

    retry: false,
    throwOnError: () => {
      if (!hasShownErrorRef.current) {
        addToast({
          type: "error",
          message: "Failed to load products",
        });
        hasShownErrorRef.current = true;
      }
      return false;
    },
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