import ConsentForm from "@/components/forms/survey/ConsentForm";
import { cookies } from "next/headers";


const ConsentPage = async () => {
  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId").value;

  return <ConsentForm userId={userId} />;
};

export default ConsentPage;
