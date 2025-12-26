import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api/products";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader, ErrorMessage } from "@/components";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Products = () => {
  const [search, setSearch] = useState("");
  const [first, setFirst] = useState(0);
  const rows = 8;

  const debounced = useDebounce(search, 400);
  const { t, i18n } = useTranslation("products");

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", debounced],
    queryFn: () => fetchProducts(debounced),
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
        onChange={(e) => {
          setSearch(e.target.value);
          setFirst(0); // reset pagination on search
        }}
      />

      <p>{t("results", { count: products.length })}</p>

      <DataTable
        value={products}
        paginator
        rows={rows}
        first={first}
        totalRecords={products.length}
        alwaysShowPaginator
        onPage={(e: DataTablePageEvent) => setFirst(e.first)}
      >
        <Column field="title" header={t("table.title")} style={{ width: "35%" }} />
        <Column header={t("table.price")} body={(p) => formatPrice(p.price)} style={{ width: "15%" }} />
        <Column field="category" header={t("table.category")} style={{ width: "15%" }} />
        <Column
          header={t("table.image")}
          body={(p) => <img src={p.thumbnail} width={40} height={40} />}
          style={{ width: "15%" }}
        />
        <Column
          header={t("table.action")}
          body={(p) => <Link to={`/products/${p.id}`}>{t("view")}</Link>}
          style={{ width: "20%" }}
        />
      </DataTable>
    </div>
  );
};