import api from "../../axios";
import Cookies from "js-cookie";

export async function getUserById(id) {
  try {
    const token = Cookies.get("token");

    if (!token) {
      console.warn("No token found in cookies.");
      return;
    }

    const response = await api.get(`/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("check response", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
