"use client";

import api from "../axios";

export async function updateProductBasics(id, data) {
  try {
    const formData = new FormData();

    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    // Do not send existingImageUrls/merge flags – backend does not accept them

    if (data.video) {
      formData.append("video", data.video);
    }

    if (typeof data.name !== "undefined") {
      formData.append("name", data.name);
    }

    if (typeof data.description !== "undefined") {
      formData.append("description", data.description);
    }

    if (typeof data.status !== "undefined") {
      formData.append("status", data.status);
    }

    // Debug
    try {
      const debugEntries = [];
      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") {
          debugEntries.push({ key, type: "string", value });
        } else if (value && typeof value === "object") {
          debugEntries.push({
            key,
            type: value.constructor && value.constructor.name,
            name: value.name,
            size: value.size,
            contentType: value.type,
          });
        }
      }
      console.log("[updateProductBasics:client] FormData:", debugEntries);
    } catch (_) {}

    const response = await api.patch(`products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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
      message: "Product updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Could not update product data.",
    };
  }
}
