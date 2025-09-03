"use server";

import { cookies } from "next/headers";
import api from "../axios";

export async function getSellerOrders() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    const response = await api.get(`/orders`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    console.log("res in orders : ", response.data);
    return {
      success: response.data.success,
      data: response.data.data,
    };
  } catch (error) {
    console.log("Error fetching user orders:", error);
    return {
      success: false,
      data: [],
    };
  }
}
