import api from "../axios";

export async function signUpUser({
  role,
  name,
  email,
  phone,
  address,
  nationalId,
  password,
  latitude,
  longitude,
  sellerType,
  isVerified,
}) {
  try {
    const response = await api.post("sellers/register", {
      role,
      name,
      email,
      phone,
      address,
      nationalId,
      password,
      latitude,
      longitude,
      sellerType,
      isVerified,
    });

    console.log("register response : ", response);

    return response.data;
  } catch (error) {
    console.error("Registration API error:", error);
    // Extract the actual error message from the backend response
    const errorMessage =
      error?.response?.data?.message || error?.message || "Registration failed";
    throw new Error(errorMessage);
  }
}
