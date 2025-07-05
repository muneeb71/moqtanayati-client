import api from '../axios';

export const removeFromWatchlist = async (id) => {       
  try {
    const response = await api.delete(`/buyers/watchlist/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // console.log('Error updating cart:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to update cart data',
      status: error.response?.status,
    };
  }
};
