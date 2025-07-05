import axios from '../axios';

export async function createOrder(orderData) {
  try {
    const response = await axios.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
} 