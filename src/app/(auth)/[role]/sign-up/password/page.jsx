import SignUpForm3 from "@/components/forms/sign-up/SignUpForm3";

const PasswordStepPage = async ({ params }) => {
  const { role } = await params;

  return <SignUpForm3 role={role} />;
};

export default PasswordStepPage;
