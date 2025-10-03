// API-სთან დაკავშირებული ფუნქციები

export const API_URL = 'https://fakestoreapi.com/products';

export async function fetchProducts() {
  const response = await fetch(API_URL);
  const products = await response.json();
  return products;
}

export async function fetchProductById(productId) {
  const response = await fetch(`${API_URL}/${productId}`);
  const product = await response.json();
  return product;
}
