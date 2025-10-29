import api from "../axios";

export async function updateAuctionPreference(data) {
  try {
    const response = await api.put("buyers/preferences", data);
    const userData = response.data?.data;

    return {
      success: true,
      data: {
        ...userData,
      },
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Could not update auction preferences.",
    };
  }
}
