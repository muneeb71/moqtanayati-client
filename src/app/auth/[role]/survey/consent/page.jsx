import ConsentForm from "@/components/forms/survey/ConsentForm";


const ConsentPage = async ({ params }) => {
  const { role } = await params;

  return <ConsentForm role={role} />;
};

export default ConsentPage;
