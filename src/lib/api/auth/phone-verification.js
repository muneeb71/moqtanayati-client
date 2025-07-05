import api from "../axios";

export const sendPhoneOtp = async (data) => {
  try {
    // The endpoint should match your backend route for sending an OTP
    const response = await api.post('/auth/send-otp', data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // console.log("Error sending OTP:", error);
    return {
      success: false,
      // error: error.response?.data?.message || 'Failed to send OTP',
    };
  }
};

export const verifyPhoneOtp = async (data) => {
  try {
    // The endpoint should match your backend route for verifying an OTP
    const response = await api.post('/auth/verify-otp', data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log("Error verifying OTP:", error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to verify OTP',
    };
  }
}; 