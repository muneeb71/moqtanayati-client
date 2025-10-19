import api from "../axios";

export const getWatchlist = async () => {
  try {
    const response = await api.get("/buyers/watchlist");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log("Error fetching watchlist:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to get watchlist data",
      status: error.response?.status,
    };
  }
};
