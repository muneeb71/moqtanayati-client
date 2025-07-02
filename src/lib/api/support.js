import axios from "../api/axios";

export const sendSupportRequest = async ({ name, email, category, description, file }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("category", category);
  formData.append("description", description);
  if (file) formData.append("file", file);

  const response = await axios.post("/support/contact", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}; 