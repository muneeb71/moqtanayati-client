import api from "../axios";

export async function forgotPassword({ email, phone }) {
  try {
    const response = await api.post("/auth/forgot-password", email ? { email } : { phone });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function verifyForgotOtp({ email, phone, otp }) {
  try {
    const response = await api.post("/auth/verify-forgot-otp", email ? { email, otp } : { phone, otp });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function resetPassword({ email, phone, newPassword, confirmPassword }) {
  try {
    const response = await api.post("/auth/reset-password", email ? { email, newPassword, confirmPassword } : { phone, newPassword, confirmPassword });
    return response.data;
  } catch (error) {
    throw error;
  }
} 