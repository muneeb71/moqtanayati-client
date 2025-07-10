import api from "../../axios";
import Cookies from "js-cookie";

export async function getAllUsers() {
  try {
    const token = Cookies.get("token");

    if (!token) {
      console.warn("No token found in cookies.");
      return;
    }

    const response = await api.get("http://localhost:5000/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("user got: ", response);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
}
