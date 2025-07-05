import api from "../axios";

export default async function withdrawBidOfUser(auctionId) {
  const response = await api.patch(`/auctions/withdraw/${auctionId}`, {});
  return response.data;
} 