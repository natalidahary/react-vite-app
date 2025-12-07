import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetail() {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      fetch(`https://dummyjson.com/products/${id}`).then((res) => res.json()),
    enabled: !!id   // dependent query
  });

  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Error loading product.</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", fontWeight: 800 }}>
        {data.title}
      </h2>

      <img
        src={data.thumbnail}
        alt={data.title}
        style={{
          width: "100%",
          borderRadius: "10px",
          marginBottom: "1rem"
        }}
      />

      <p><strong>Price:</strong> ${data.price}</p>
      <p><strong>Description:</strong> {data.description}</p>
    </div>
  );
}