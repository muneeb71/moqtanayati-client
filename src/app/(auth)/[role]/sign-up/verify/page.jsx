import EmailOtpForm from "@/components/forms/EmailOtpForm";

const OtpPage = async ({ params }) => {
  const role = (await params).role;
  return <EmailOtpForm role={role} />;
};

export default OtpPage;