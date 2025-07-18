import api from "../../axios";

export async function cancelAuctionById(id) {
  try {
    const response = await api.patch(`/admin/auctions/${id}`);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
}
