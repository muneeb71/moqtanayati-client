import api from "../../axios";

export async function getAdminAuctionById(id) {
  try {
    const response = await api.get(`/admin/auctions/${id}`);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
}
