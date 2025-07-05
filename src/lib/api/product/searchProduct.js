import api from "../axios";

export async function filterProducts(filters) {
  try {
    const response = await api.post("products/filters", filters);
    if (!response.data) {
      return {
        success: false,
        data: null,
        message: "Invalid response from server",
      };
    }
    return {
      success: true,
      data: response.data.data || response.data,
      message: "Products filtered successfully",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Could not filter products.",
    };
  }
}
