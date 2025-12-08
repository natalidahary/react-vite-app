import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/api/products";
import styles from "./ProductDetail.module.css";

export default function ProductDetail() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading product...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{data?.title}</h2>

      <img src={data?.thumbnail} className={styles.image} />

      <p>Price: ${data?.price}</p>
      <p>{data?.description}</p>
    </div>
  );
}