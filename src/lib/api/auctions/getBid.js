import api from "../axios";

export default async function getBidById(id) {
  try {
    console.log("🔍 [getBidById] Fetching bids for product ID:", id);
    const response = await api.get(`/auctions/bids/${id}`);
    console.log("🔍 [getBidById] Full API response:", response);
    console.log("🔍 [getBidById] Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("🔍 [getBidById] Error fetching bids:", error);
    console.error("🔍 [getBidById] Error response:", error.response?.data);
    throw error;
  }
}
