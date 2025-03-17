import OtpForm from "@/components/forms/OtpForm";

const OtpPage = async ({ params }) => {
  const role = (await params).role;
  return <OtpForm role={role} />;
};

export default OtpPage;
