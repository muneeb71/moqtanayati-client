import api from "../axios";

export async function sellerForgotPassword({ email, phone }) {
  try {
    const payload = phone ? { phone } : { email };
    const response = await api.post("/sellers/forgot-password", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function sellerVerifyOtp({ email, phone, otp }) {
  try {
    const payload = phone ? { phone, otp } : { email, otp };
    const response = await api.post("/sellers/verify-otp", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function sellerResetPassword({
  email,
  phone,
  otp,
  newPassword,
  confirmPassword,
}) {
  try {
    const payload = phone
      ? { phone, otp, newPassword, confirmPassword }
      : { email, otp, newPassword, confirmPassword };
    const response = await api.post("/sellers/reset-password", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

