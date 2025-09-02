import SignUpForm1 from "@/components/forms/sign-up/SignUpForm1";

const PersonalDetailsStepPage = async ({ params }) => {
  const { role } = await params;

  return <SignUpForm1 role={role} />;
};

export default PersonalDetailsStepPage;
