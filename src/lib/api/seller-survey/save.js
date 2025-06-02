"use server";

import { cookies } from "next/headers";
import api from "../axios";

export async function saveSellerSurvey({
  userId,
  entity,
  hasProducts,
  hasExperience,
  goal,
  productAndServices,
  homeSupplies,
  consent,
}) {
  try {
    const cookiesStore = await cookies();
    const response = await api.post("survey/save", {
      userId,
      entity,
      hasProducts,
      hasExperience,
      goal,
      productAndServices,
      homeSupplies,
      consent,
    });

    if (response.data.success) {
      const userJson = cookiesStore.get("user").value;
      let user = JSON.parse(userJson);
      user.sellerSurvey = {
        userId,
        entity,
        hasProducts,
        hasExperience,
        goal,
        productAndServices,
        homeSupplies,
        consent,
      };
      cookiesStore.set("user", JSON.stringify(user));
      console.log("sellerSurve", user.sellerSurvey);
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong.",
    };
  }
}
