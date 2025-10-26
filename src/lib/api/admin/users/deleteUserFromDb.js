import api from "../../axios";

export async function deleteUserFromDb(id) {
  try {
    const response = await api.delete(`/admin/users/${id}`);
    console.log("in delete function : ", response);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
