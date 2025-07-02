import api from '../axios';

export const leaveReview = async ({ sellerId, orderId, rating, comment }) => {
  const response = await api.post('/buyers/reviews', {
    sellerId,
    orderId,
    rating,
    comment,
  });
  return response.data;
}; 