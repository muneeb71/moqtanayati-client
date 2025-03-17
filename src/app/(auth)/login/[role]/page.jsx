import LoginForm from "@/components/forms/LoginForm";

const RoleBasedLoginPage = async ({ params }) => {
  const role = (await params).role;
  return (
    <div className="flex w-full flex-col gap-8 md:gap-12">
      <div className="flex w-full flex-col gap-1">
        <h1 className="text-xl md:text-[33px] md:leading-[50px]">
          Welcome back
        </h1>
        <span className="max-w-[332px] text-darkBlue/50 md:text-[19px] md:leading-[29px]">
          Log in to explore exciting auctions and unique finds.
        </span>
      </div>
      <LoginForm role={role} />
    </div>
  );
};

export default RoleBasedLoginPage;
