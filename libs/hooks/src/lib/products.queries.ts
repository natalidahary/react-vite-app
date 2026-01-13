import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProductById, fetchProducts, fetchProductsPage } from "./products.api";
import type { Product, ProductListResponse } from "./product.types";

type CreateProductInput = Omit<Product, "id">;

const productsKeys = {
  all: ["products"] as const,
  list: (query: string) => [...productsKeys.all, "list", query] as const,
  detail: (id: string) => [...productsKeys.all, "detail", id] as const,
  infinite: (query: string) => [...productsKeys.all, "infinite", query] as const,
};

async function createProduct(payload: CreateProductInput): Promise<Product> {
  const res = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Create failed");
  return res.json();
}

export const useProductsQuery = (query: string) =>
  useQuery({
    queryKey: productsKeys.list(query),
    queryFn: () => fetchProducts(query),
  });

export const useProductQuery = (id?: string) =>
  useQuery({
    queryKey: productsKeys.detail(id ?? ""),
    queryFn: () => fetchProductById(id ?? ""),
    enabled: Boolean(id),
  });

export const useInfiniteProductsQuery = (query: string, pageSize = 8) =>
  useInfiniteQuery({
    queryKey: productsKeys.infinite(query),
    queryFn: ({ pageParam = 0 }) =>
      fetchProductsPage(query, pageSize, pageParam),
    getNextPageParam: (lastPage: ProductListResponse) => {
      const total = lastPage.total ?? 0;
      const skip = lastPage.skip ?? 0;
      const limit = lastPage.limit ?? pageSize;
      const next = skip + limit;
      return next < total ? next : undefined;
    },
  });

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: productsKeys.all,
      }),
  });
};
