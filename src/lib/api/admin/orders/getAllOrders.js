import api from '../../axios';

export async function getAllOrders() {
  try {
    const response = await api.get('/admin/orders');
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
} 