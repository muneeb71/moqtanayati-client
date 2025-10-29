import api from "../axios";

export async function saveSurvey({
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
