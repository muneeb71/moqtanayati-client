import api from '../axios';

export async function getUserOrders(filter = 'all') {
  try {
    const response = await api.get(`/orders`, {
      params: { filter },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error.response?.data || error;
  }
} 