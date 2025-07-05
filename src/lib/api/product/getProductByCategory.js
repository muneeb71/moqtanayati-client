import api from "../axios";

export async function getProductByCategory(category) {    
  console.log('getProductByCategory called with category:', category);
  
  try {
    console.log('Making API request to:', `/products/categories/${category}`);
    const response = await api.get(`/products/categories/${category}`);
    console.log('API request successful:', response);
    return response;
  } catch (error) {
    console.log("Error fetching product:", error);
    return [];
  }
}