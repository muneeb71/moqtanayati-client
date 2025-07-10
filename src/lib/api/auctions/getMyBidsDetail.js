import api from "../axios";

export async function getMyBidsDetail(id) {
  try {
    console.log("in fecthing purchases : ", id);
    const response = await api.get(
      `http://localhost:5000/api/auctions/bids/${id}`,
    );
    console.log("get purchase result", response);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
