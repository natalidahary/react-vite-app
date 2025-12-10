import { Product, ProductListResponse } from "@/types/product";

export async function fetchProducts(query: string): Promise<ProductListResponse> {
  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  return res.json();
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return res.json();
}