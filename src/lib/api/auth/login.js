"use server";

import { cookies } from "next/headers";
import api from "../axios";

export async function loginUser(email, password, role) {
  try {
    const response = await api.post("sellers/login", {
      email,
      password,
    });

    const data = response.data.data;

    const responseProfile = await api.get(`sellers/profile/${data.user.id}`);
    const profileData = responseProfile.data.data;

    const cookiesStore = await cookies();

    if (data.user.role.toLowerCase() !== role.toLowerCase()) {
      return {
        success: false,
        message: `You are trying to log in as a ${data.user.role}. Please log in as a ${role}.`,
      };
    }

    cookiesStore.set("token", data.token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    cookiesStore.set("userId", data.user.id, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    cookiesStore.set("role", data.user.role, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    cookiesStore.set("survey", JSON.stringify(data.user.sellerSurvey), {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    if (profileData.store) {
      cookiesStore.set("storeId", profileData.store.id, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });
    }

    return response.data;
  } catch (error) {
    console.error(error);
    
    return {
      success: false,
      message:
        error?.response?.data?.message || error.message || "Login failed",
    };
  }
}
