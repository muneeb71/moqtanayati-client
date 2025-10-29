import api from "../../axios";
import Cookies from "js-cookie";

export async function updateAdminPassword(data) {
  try {
    const token = Cookies.get("token");

    if (!token) {
      console.warn("No token found in cookies.");
      return;
    }

    const response = await api.put("/admin/profile/change-password", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
}
