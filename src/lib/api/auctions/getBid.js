import api from "../axios";

export default async function getBidById(id) {
  const response = await api.get(`/auctions/bids/${id}`);

  return response.data;
} 