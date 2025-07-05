import api from '../../axios';

export async function getAllUsers() {
  try {
    const response = await api.get('/admin/users');
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
} 