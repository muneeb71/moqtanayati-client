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

  return { success: true, message: "Logged out successfully" };
}
