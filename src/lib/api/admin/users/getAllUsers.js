import api from "../../axios";
import Cookies from "js-cookie";

export async function getAllUsers({ currentPage, search = "", filter = "" }) {
  try {
    const token = Cookies.get("token");

    if (!token) {
      console.warn("No token found in cookies.");
      return;
    }

    const response = await api.get(
      `/admin/users?page=${currentPage}&search=${search}&filter=${filter}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
}
