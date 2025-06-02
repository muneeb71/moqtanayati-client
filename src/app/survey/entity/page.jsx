import ChooseSellerEntityForm from "@/components/forms/survey/ChooseSellerEntityForm";
import React from "react";

const EntityPage = async ({ params }) => {
  const { role } = await params;

  return <ChooseSellerEntityForm role={role} />;
};

export default EntityPage;
