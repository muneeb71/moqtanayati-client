import { cookies } from "next/headers";
import api from '../axios';

export async function getSellerOrders() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    const response = await api.get(`/orders/my-orders`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error.response?.data || error;
  }
} 