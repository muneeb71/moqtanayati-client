import api from '../../axios';

export async function updateAdminProfile(payload) {
  try {
    const response = await api.patch('/admin/profile', payload);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
} 