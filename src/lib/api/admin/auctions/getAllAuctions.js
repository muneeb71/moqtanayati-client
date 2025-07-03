import api from '../../axios';

export async function getAllAuctions() {
  try {
    const response = await api.get('/admin/auctions');
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
} 