import api from "../axios";

export async function loginBuyerUser({
  role,
  name,
  email,
  phone,
  address,
  nationalId,
  password,
  latitude,
  longitude,
}) {
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
  });

  return response.data;
}
