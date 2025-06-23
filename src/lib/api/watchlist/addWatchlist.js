import api from '../axios';

export const addWatchlist = async (id) => {       
  try {
    const response = await api.post(`/buyers/watchlist/${id}`, {});
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error updating cart:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to update cart data',
      status: error.response?.status,
    };
  }
};
