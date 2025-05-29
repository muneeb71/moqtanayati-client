"use server";

import { cookies } from "next/headers";
import api from "../axios";

export async function loginUser(email, password, role) {
  const response = await api.post("sellers/login", {
    email,
    password,
  });

  const data = response.data.data;

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

  cookiesStore.set("user", JSON.stringify(data.user), {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  return response.data;
}
