import api from "../axios";

export async function getMyBidsDetail(id) {
  try {
    const response = await api.get(
      `http://localhost:5000/api/auctions/bids/${id}`,
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
