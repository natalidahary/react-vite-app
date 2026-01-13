import type { Product, ProductListResponse } from "./ProductTypes";

export async function fetchProducts(query: string): Promise<ProductListResponse> {
  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}

export async function fetchProductsPage(
  query: string,
  limit: number,
  skip: number,
): Promise<ProductListResponse> {
  const res = await fetch(
    `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`,
  );
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}
