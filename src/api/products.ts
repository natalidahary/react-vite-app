import { Product, ProductListResponse } from "@/types/product";

export async function fetchProducts(query: string): Promise<ProductListResponse> {
  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}