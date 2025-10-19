import api from "../axios";

export async function getUserOrders(filter = "all") {
  try {
    const response = await api.get(`/orders`, {
      params: { filter },
    });
    console.log("reponse from purchase history : ", response.data);
    console.log("reponse from purchase history : ", response.data.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching user orders:", error);
    throw error.response?.data || error;
  }
}
