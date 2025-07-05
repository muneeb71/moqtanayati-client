import api from '../../axios';

export async function editUser(id, data) {
  try {
    const response = await api.put(`/admin/users/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
} 