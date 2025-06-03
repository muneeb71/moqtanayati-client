import SellerProfileEditForm from "@/components/forms/edit-profile/SellerProfileEditForm";
import { getUserProfile } from "@/lib/api/profile/getProfile";
import { cookies } from "next/headers";

const SellerProfileEditPage = async () => {
  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId").value;
  const userResponse = await getUserProfile(userId);
  const userData = userResponse.data;
  
  return <SellerProfileEditForm user={userData} />;
};

export default SellerProfileEditPage;
