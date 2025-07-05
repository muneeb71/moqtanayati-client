import api from "../axios";

export default async function bidOnAuction({ productId, amount }) {
  const response = await api.post("/auctions/bid", {
    productId,
    amount,
  });
  return response.data;
} 