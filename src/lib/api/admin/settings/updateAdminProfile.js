import api from "../../axios";
import Cookies from "js-cookie";

export async function updateAdminProfile(
  body,
  imageFile = null,
  passwordData = null,
) {
  try {
    const token = Cookies.get("token");

    if (!token) {
      console.warn("No token found in cookies.");
      return;
    }

    console.log("response profile 1 token: ", token);
    console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

    let requestBody = { ...body };
    let headers = {
      Authorization: `Bearer ${token}`,
    };

    // Add password data if provided
    if (passwordData) {
      requestBody.currentPassword = passwordData.currentPassword;
      requestBody.newPassword = passwordData.newPassword;
    }

    // If there's an image file, use FormData
    if (imageFile) {
      const formData = new FormData();

      // Add profile fields to FormData
      Object.keys(requestBody).forEach((key) => {
        formData.append(key, requestBody[key]);
      });

      // Add image file
      formData.append("avatar", imageFile);

      requestBody = formData;
      // Don't set Content-Type manually for FormData - let browser set it with boundary
      delete headers["Content-Type"];
    }

    console.log("Request details:", {
      url: "/admin/profile/update",
      method: "PUT",
      headers,
      bodyType: imageFile ? "FormData" : "JSON",
      bodyKeys: imageFile ? "FormData fields" : Object.keys(requestBody),
    });

    const response = await api.put("/admin/profile/update", requestBody, {
      headers,
    });
    console.log("response profile 2: ", response);

    return response;
  } catch (error) {
    console.error("API Error Details:", {
      message: error.message,
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data,
      config: {
        url: error?.config?.url,
        method: error?.config?.method,
        headers: error?.config?.headers,
      },
    });

    // Return more detailed error information
    if (error.response?.data) {
      throw {
        ...error.response.data,
        status: error.response.status,
        statusText: error.response.statusText,
      };
    } else if (error.request) {
      throw {
        message: "Network error - no response received",
        code: error.code,
        originalError: error.message,
      };
    } else {
      throw {
        message: error.message || "An unexpected error occurred",
        originalError: error,
      };
    }
  }
}
