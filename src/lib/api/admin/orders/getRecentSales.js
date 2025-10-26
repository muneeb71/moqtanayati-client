import api from "../../axios";

export async function getRecentSales(id) {
  try {
    const response = await api.get(`/orders/my-orders/detail/${id}`, {});
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
