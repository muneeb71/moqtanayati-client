import api from '../../axios';

export async function getDashboardStats() {
  try {
    const response = await api.get('/admin/dashboard/stats');
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
} 