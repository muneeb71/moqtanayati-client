import api from "../../axios";
import Cookies from "js-cookie";

export async function approveReview(id) {
  try {
    const token = Cookies.get("token");

    if (!token) {
      console.warn("No token found in cookies.");
      return;
    }

    const response = await api.patch(
      `http://localhost:5000/api/admin/reviews/${id}/approve`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("response : ", response);

    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
}
