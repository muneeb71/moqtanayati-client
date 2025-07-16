import api from "../../axios";

export async function getAllAuctions({
  currentPage,
  search = "",
  filter = "",
}) {
  try {
    const response = await api.get(
      `/admin/auctions?page=${currentPage}&search=${search}&filter=${filter}`,
    );
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
}
