import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/api/products";
import { Loader, ErrorMessage } from "@/components";

export const ProductDetail = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message="Failed to load product." />;

  return (
    <div className="product-detail">
      <h2 className="product-detail-title">{data?.title}</h2>

      <img className="product-detail-image" src={data?.thumbnail} />

      <p className="product-detail-text">Price: ${data?.price}</p>
      <p className="product-detail-text">Description: {data?.description}</p>
    </div>
  );
};