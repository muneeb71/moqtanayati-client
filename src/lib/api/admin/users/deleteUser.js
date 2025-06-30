import api from '../../axios';

export async function deleteUser(id) {
  try {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
} 