import { useParams, Link } from "react-router-dom";
import { useProductQuery, useCartStore } from "@productexplorer/hooks";
import { ErrorMessage } from "@productexplorer/ui";
import { Button, GlobalLoader, useToastStore } from "@productexplorer/ui";
import { useTranslation } from "react-i18next";

export const ProductDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation("products");

  const addToCart = useCartStore((s) => s.addToCart);
  const addToast = useToastStore((s) => s.addToast);

  const { data, isLoading, error } = useProductQuery(id);

  if (isLoading) return <GlobalLoader />;
  if (error) return <ErrorMessage message={t("error")} />;

  const handleAdd = () => {
    addToCart(data!);
    addToast({
      type: "success",
      message: t("added", { title: data!.title })
    });
  };

  return (
    <div className="product-detail">
      <Link to="/products" className="back-button">×</Link>

      <h2 className="product-detail-title">{data!.title}</h2>
      <img className="product-detail-image" src={data!.thumbnail} />

      <p className="product-detail-text">
        {t("price", { value: data!.price })}
      </p>
      <p className="product-detail-text">{data!.description}</p>

      <Button onClick={handleAdd} className="add-button">
        {t("add")}
      </Button>
    </div>
  );
};
