import api from "../../axios";

export async function getReport({
  role,
  currentPage,
  search = "",
  filter = "",
}) {
  try {
    const response = await api.get(
      `/admin/reports?role=${role}&page=${currentPage}&search=${search}&filter=${filter}`,
    );
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
}
