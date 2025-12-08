import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { fetchProducts } from "@/api/products";
import { useDebounce } from "@/hooks/useDebounce";

import styles from "./Products.module.css";

export default function Products() {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 400);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", debounced],
    queryFn: () => fetchProducts(debounced),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products.</p>;
  if (!data) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Products</h2>

      <input
        className={styles.search}
        value={search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className={styles.list}>
        {data.products.map((item) => (
          <li key={item.id} className={styles.item}>
            <Link to={`/products/${item.id}`} className={styles.item}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}