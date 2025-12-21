import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api/products";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader, ErrorMessage } from "@/components";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Products = () => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 400);
  const { t, i18n } = useTranslation("products");

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", debounced],
    queryFn: () => fetchProducts(debounced)
  });

  const products = data?.products ?? [];

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={t("error")} />;

  const formatPrice = (value: number) =>
  new Intl.NumberFormat(i18n.language, {
    style: "currency",
    currency: i18n.language === "he" ? "ILS" : "USD",
  }).format(value);

  return (
    <div className="products-page">
      <h2 className="products-title">{t("title")}</h2>

      <input
        className="products-search"
        value={search}
        placeholder={t("search")}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>{t("results", { count: products.length })}</p>

      <DataTable key={i18n.language} value={products} paginator rows={8} sortMode="single">
        <Column field="title" header={t("table.title")} sortable />
        <Column header={t("table.price")} sortable body={(p) => formatPrice(p.price)}/>
        <Column field="category" header={t("table.category")} />
        <Column
          header={t("table.image")}
          body={(p) => <img src={p.thumbnail} width={50} />}
        />
        <Column
          header={t("table.action")}
          body={(p) => <Link to={`/products/${p.id}`}>{t("view")}</Link>}
        />
      </DataTable>
    </div>
  );
};