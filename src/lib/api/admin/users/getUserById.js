import api from '../../axios';

export async function getUserById(id) {
  try {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
} 