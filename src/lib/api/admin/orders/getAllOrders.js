import api from "../../axios";

export async function getAllOrders({ currentPage, search = "", filter = "" }) {
  try {
    const response = await api.get(
      `/admin/orders?page=${currentPage}&search=${search}&filter=${filter}`,
    );
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
}
