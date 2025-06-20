import api from '../axios';

export const addItemToCart = async ({ productId, quantity, price }) => {
  try {
    const response = await api.post('/buyers/cart', {
        productId, quantity, price
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching cart:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch cart data',
      status: error.response?.status,
    };
  }
};
