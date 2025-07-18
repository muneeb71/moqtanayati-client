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
    const token = data.token;
    const user = data.user;

    const cookiesStore = cookies();

    if (user.role.toLowerCase() !== role.toLowerCase()) {
      return {
        success: false,
        message: `You are trying to log in as a ${user.role}. Please log in as a ${role}.`,
      };
    }

    // Set cookies (7-day expiration)
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookiesStore.set("token", token, { expires });
    cookiesStore.set("userId", user.id, { expires });
    cookiesStore.set("role", user.role, { expires });
    cookiesStore.set("survey", JSON.stringify(user.sellerSurvey), { expires });

    // Fetch profile with token in Authorization header
    let profileResponse;
    if (role.toLowerCase() === "admin") {
      profileResponse = await api.get(`admin/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      profileResponse = await api.get(`sellers/profile/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    const profileData = profileResponse.data.data;

    if (profileData.store) {
      cookiesStore.set("storeId", profileData.store.id, { expires });
    }

    return response.data;
  } catch (error) {
    console.error("Login Error:", error);

    return {
      success: false,
      message:
        error?.response?.data?.message || error.message || "Login failed",
    };
  }
}
