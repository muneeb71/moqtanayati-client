import StartSellingForm from "@/components/forms/survey/StartSellingForm";

const StartSellingPage = async ({ params }) => {
  const { role } = await params;

  return <StartSellingForm role={role} />;
};

export default StartSellingPage;
