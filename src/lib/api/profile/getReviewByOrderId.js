import api from '../axios';

export const getReviewByOrderId = async (orderId) => {
  const response = await api.get(`/buyers/reviews/${orderId}`);
  return response.data;
}; 