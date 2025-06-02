import ConsentForm from "@/components/forms/survey/ConsentForm";
import { cookies } from "next/headers";
import React from "react";

const ConsentPage = async () => {
  const cookiesStore = await cookies();
  const userJson = cookiesStore.get("user");
  const user = JSON.parse(userJson.value);

  return <ConsentForm user={user} />;
};

export default ConsentPage;
