"use server";

import api from "../axios";

export async function updateSellerStore(storeId, file) {
  try {
    console.log("1");
    const formData = new FormData();
    formData.append("backgroundImage", file);
    console.log("2");

    const response = await api.patch(
      `/sellers/store/detail/${storeId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    console.log("response from server: ", response);
    console.log("response data from server : ", response.data);

    return response.data;
  } catch (error) {
    console.error("Error uploading store image:", error);
    throw error;
  }
}
