import axios from '../axios';

export async function getOrderByIdClient(orderId) {
  try {
    const response = await axios.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
} 