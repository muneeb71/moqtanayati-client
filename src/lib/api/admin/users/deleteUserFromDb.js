import api from "../../axios";

export async function deleteUserFromDb(id) {
  try {
    const response = await api.delete(`/admin/users/${id}`);
    console.log("Delete API response:", response);

    // Handle different response formats
    if (response.status === 200 || response.status === 204) {
      return { success: true, message: "User deleted successfully" };
    }

    return response.data || { success: true };
  } catch (error) {
    console.error("Delete user API error:", error);
    throw error.response?.data || error;
  }
}
