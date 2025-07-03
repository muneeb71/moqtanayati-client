import api from '../axios';

export const getCart = async () => {
  try {
    const response = await api.get('/buyers/cart');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // console.log('Error fetching cart:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch cart data',
      status: error.response?.status,
    };
  }
};
