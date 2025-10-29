import api from "../axios";

export async function getProductByCategory(category) {
  console.log("getProductByCategory called with category:", category);

  try {
    const response = await api.get(`/products/categories/${category}`);

    return response;
  } catch (error) {
    console.log("Error fetching product:", error);
    return [];
  }
}
