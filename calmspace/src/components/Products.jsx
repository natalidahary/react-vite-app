import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Products() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // --- Debounce: wait 300ms after user stops typing ---
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  // --- React Query: filter based on debounced search ---
  const { data, error, isLoading } = useQuery({
    queryKey: ["products", debouncedSearch],
    queryFn: () =>
      fetch(
        `https://dummyjson.com/products/search?q=${debouncedSearch}`
      ).then((res) => res.json()),
  });

  if (isLoading) return <p style={{ padding: "2rem" }}>Loading products...</p>;
  if (error) return <p style={{ padding: "2rem" }}>Error loading products.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center", fontWeight: 800, fontSize: "2rem" }}>
        Products
      </h2>

      {/* Search Bar */}
      <div style={{ textAlign: "center", margin: "1rem 0" }}>
        <input
          type="text"
          value={search}
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "260px",
            borderRadius: "6px",
            border: "1px solid #888",
            fontSize: "1rem",
          }}
        />
      </div>

      <ul style={{ listStyle: "none", padding: 10, maxWidth: "700px", margin: "0 auto" }}>
        {data.products?.map((item) => (
          <li key={item.id} style={{ margin: "1rem 0" }}>
            <Link
              to={`/products/${item.id}`}
              style={{
                fontWeight: 600,
                color: "#222",
                textDecoration: "none",
              }}
            >
              {item.title}
            </Link>
          </li>
        ))}

        {data.products?.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "2rem", fontWeight: 600 }}>
            No results found.
          </p>
        )}
      </ul>
    </div>
  );
}