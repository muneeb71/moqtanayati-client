import ConsentForm from "@/components/forms/survey/ConsentForm";
import React from "react";

const ConsentPage = async ({ params }) => {
  const { role } = await params;
  return <ConsentForm role={role} />;
};

export default ConsentPage;
