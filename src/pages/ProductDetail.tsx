import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/api/products";
import { Loader, ErrorMessage, SharedButton} from "@/components";
import { useCartStore , useToastStore} from "@/stores";
import { Link } from "react-router-dom";

export const ProductDetail = () => {
  const { id } = useParams();
  const addToCart = useCartStore((s) => s.addToCart);
  const addToast = useToastStore((s) => s.addToast);

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message="Failed to load product." />;

  const handleAdd = () => {
    addToCart(data!);

    addToast({
      type: "success",
      message: `"${data!.title}" added to cart!`,
    });
  };

  return (
    <div className="product-detail">
      <Link to="/products" className="back-button">×</Link>

      <h2 className="product-detail-title">{data?.title}</h2>

      <img className="product-detail-image" src={data?.thumbnail} />

      <p className="product-detail-text">Price: ${data?.price}</p>
      <p className="product-detail-text">Description: {data?.description}</p>

      <SharedButton onClick={handleAdd} className="add-button">
        Add to Cart
      </SharedButton>
    </div>
  );
};