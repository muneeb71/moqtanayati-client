"use server";

import { cookies } from "next/headers";
import api from "../axios";

export async function loginUserWithPhone(phone, role, deviceToken) {
  try {
    const requestBody = { phone };
    if (deviceToken) {
      requestBody.deviceToken = deviceToken;
    }

    const response = await api.post("sellers/login", requestBody);
    const data = response.data.data;
    const token = data.token;
    const user = data.user;
    const cookieStore = await cookies();

    if (user.role.toLowerCase() !== role.toLowerCase()) {
      return {
        success: false,
        message: `You are trying to log in as a ${user.role}. Please log in as a ${role}.`,
      };
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await cookieStore.set("token", token, { expires });
    await cookieStore.set("userId", user.id, { expires });
    await cookieStore.set("role", user.role, { expires });
    await cookieStore.set("survey", JSON.stringify(user.sellerSurvey), {
      expires,
    });

    let profileResponse;
    if (role.toLowerCase() === "admin") {
      profileResponse = await api.get(`admin/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      profileResponse = await api.get(`sellers/profile/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    const profileData = profileResponse.data.data;
    if (profileData.store) {
      await cookieStore.set("storeId", profileData.store.id, { expires });
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message || error.message || "Phone login failed",
    };
  }
}

