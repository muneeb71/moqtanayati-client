import api from '../axios';

export const updateReview = async (id, { rating, comment }) => {
  const response = await api.patch(`/buyers/reviews/${id}`, {
    rating,
    comment,
  });
  return response.data;
}; 