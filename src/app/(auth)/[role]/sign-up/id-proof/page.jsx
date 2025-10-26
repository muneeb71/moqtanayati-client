import SignUpForm2 from "@/components/forms/sign-up/SignUpForm2";

const IdProofStepPage = async ({ params }) => {
  const { role } = await params;

  return <SignUpForm2 role={role} />;
};

export default IdProofStepPage;
