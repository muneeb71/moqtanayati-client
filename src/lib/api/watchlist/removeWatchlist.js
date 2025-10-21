import api from "../axios";

export const removeFromWatchlist = async (id) => {
  try {
    console.log("in remove function");
    const response = await api.delete(`/buyers/watchlist/${id}`);
    console.log("Removing : ", response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // console.log('Error updating cart:', error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update cart data",
      status: error.response?.status,
    };
  }
};
