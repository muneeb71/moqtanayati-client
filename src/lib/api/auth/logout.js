"use server";

import { cookies } from "next/headers";
import api from "../axios";

export async function logoutUser() {
  const cookiesStore = await cookies();

  cookiesStore.delete("token");
  cookiesStore.delete("userId");
  cookiesStore.delete("role");
  cookiesStore.delete("survey");
  cookiesStore.delete("storeId");

  try {
    await api.post("auth/logout");
  } catch (error) {
    console.error("Logout API call failed:", error);
  }

  return { success: true, message: "Logged out successfully" };
}
