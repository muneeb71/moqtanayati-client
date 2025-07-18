import api from "../../axios";

export async function editUser(id, data) {
  try {
    const response = await api.put(`/admin/users/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function editUserAccountStatus(id, data) {
  try {
    const response = await api.patch(`/admin/users/${id}/status`, {
      status: data,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function editUserVerificationStatus(id, data) {
  try {
    const response = await api.patch(`/admin/users/${id}/verify`, {
      status: data,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
