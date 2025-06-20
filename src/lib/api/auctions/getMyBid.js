import api from "../axios";
import { cookies } from "next/headers";

export async function getMyBids() {
  const token = cookies().get("token")?.value;
  const response = await api.get("/auctions/bids", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
} 