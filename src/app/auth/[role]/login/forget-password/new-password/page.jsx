import NewPasswordForm from "@/components/forms/NewPasswordForm";

const NewPasswordPage = async ({ params }) => {
  const role = (await params).role;
  return (
    <div className="flex w-full flex-col gap-10 pt-20 md:gap-[66px] md:pt-10 lg:pt-0">
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-xl md:text-[33px] md:leading-[50px]">
          Reset Your Password
        </h1>
        <span className="text-darkBlue/50 md:text-[19px] md:leading-[29px]">
          Enter a new password below to reset your account access.
        </span>
      </div>
      <NewPasswordForm role={role} />
    </div>
  );
};

export default NewPasswordPage;
