import api from "../axios";

export async function sendOtp({ phone, email }) {
  try {
    const payload = phone ? { phone } : { email };
    const response = await api.post("/auth/send-otp", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function verifyOtp({ phone, email, otp }) {
  try {
    const payload = phone ? { phone, otp } : { email, otp };
    const response = await api.post("/auth/verify-otp", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

