import SignUpForm4 from "@/components/forms/sign-up/SignUpForm4";

const LocationSelectionPage = async ({ params }) => {
  const { role } = await params;

  return <SignUpForm4 role={role} />;
};

export default LocationSelectionPage;
