import api from '../axios';

export const updateItemQuantity = async (itemId, quantity, price) => {       
  try {
    const response = await api.patch(`/buyers/cart/${itemId}`, {
        quantity, price
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // console.error('Error updating cart:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to update cart data',
      status: error.response?.status,
    };
  }
};
