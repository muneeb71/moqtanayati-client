import api from '../axios';

export const getWatchlistById = async (id) => {       
  try {
    const response = await api.get(`/buyers/watchlist/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // console.log('Error updating cart:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to get watchlist data',
      status: error.response?.status,
    };
  }
};
