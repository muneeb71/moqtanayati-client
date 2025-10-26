import api from "../../axios";

export async function getAllNotifications() {
  try {
    const response = await api.get(`/admin/notifications`);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
}
