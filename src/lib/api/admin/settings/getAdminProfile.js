import api from '../../axios';

export async function getAdminProfile() {
  try {
    const response = await api.get('/admin/profile');
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
} 