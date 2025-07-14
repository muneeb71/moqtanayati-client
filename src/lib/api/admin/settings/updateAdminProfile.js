import api from "../../axios";
import Cookies from "js-cookie";

export async function updateAdminProfile(body) {
  try {
    const token = Cookies.get("token");

    if (!token) {
      console.warn("No token found in cookies.");
      return;
    }

    console.log("response profile 1 token: ", token);

    const response = await api.put("/admin/profile/update", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response profile 2: ", response);

    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
}
