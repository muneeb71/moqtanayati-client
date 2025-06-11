"use server";

import api from "../axios";

export async function addProduct(data) {
  try {
    const formData = new FormData();

    if (data.images && data.images.length > 0) {
      data.images.forEach((image, index) => {
        formData.append(`images`, image);
      });
    }
    
    if (data.video) {
      formData.append("video", data.video);
    }
    
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("storeId", data.storeId);
    formData.append("isDraft", data.isDraft);

    const response = await api.post("products/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("RESPONSE", response)

    if (!response.data) {
      return {
        success: false,
        data: null,
        message: "Invalid response from server",
      };
    }

    return {
      success: true,
      data: response.data.data || response.data,
      message: "Product added successfully",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Could not add product data.",
    };
  }
}
