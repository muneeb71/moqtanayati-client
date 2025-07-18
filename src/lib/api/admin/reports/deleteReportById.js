import api from "../../axios";

export async function deleteReportById(id) {
  try {
    const response = await api.delete(`/admin/reports/${id}`);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
}
