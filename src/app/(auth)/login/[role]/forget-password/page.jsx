import ForgetPasswordForm from "@/components/forms/ForgetPasswordForm";

const ForgetPasswordPage = async ({ params }) => {
  const role = (await params).role;
  return (
    <div className="flex w-full flex-col gap-10 pt-20 md:gap-[66px] md:pt-10 lg:pt-0">
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-xl md:text-[33px] md:leading-[50px]">
          Forgot Password?
        </h1>
        <span className="text-darkBlue/50 md:text-[19px] md:leading-[29px]">
          Don’t worry! Enter your registered email address or Phone Number, and
          we’ll help you reset your password.
        </span>
      </div>
      <ForgetPasswordForm role={role} />
    </div>
  );
};

export default ForgetPasswordPage;
