import api from "../../axios";

export async function getAuctionById(id) {
  try {
    const response = await api.get(`/admin/auctions/${id}`);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
}
