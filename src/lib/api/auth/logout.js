"use server";

import { cookies } from "next/headers";
import api from "../axios";

export async function logoutUser() {
  const cookiesStore = await cookies();

  cookiesStore.delete("token");
  cookiesStore.delete("user");

  try {
    await api.post("auth/logout");
  } catch (error) {
    console.error("Logout API call failed:", error);
  }

  return { success: true, message: "Logged out successfully" };
}


