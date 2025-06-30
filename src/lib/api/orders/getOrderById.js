import axios from '../axios';

/**
 * Fetches order data by order ID.
 * @param {string} orderId - The order ID.
 * @returns {Promise<Object>} The order data from the backend.
 */
export async function getOrderById(orderId) {
  try {    
    const response = await axios.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
} 