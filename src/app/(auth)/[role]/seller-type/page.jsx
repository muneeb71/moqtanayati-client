import ChooseSellerTypeForm from "@/components/forms/sign-up/ChooseSellerTypeForm";

const SellerTypePage = async ({ params }) => {
  const { role } = await params;

  return <ChooseSellerTypeForm role={role} />;
};

export default SellerTypePage;
