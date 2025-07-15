import api from "../../axios";

export async function getReport(role) {
  try {
    const response = await api.get(`/admin/reports?role=${role}`);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
}
