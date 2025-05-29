"use server";

import api from "../axios";

export async function checkExistingUser({ email, phone }) {
  const response = await api.post("sellers/check-existing", {
    email,
    phone,
  });

  return response.data;
}
