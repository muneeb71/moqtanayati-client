import GoBackButton from "@/components/buttons/GoBackButton";

const ForgetPasswordLayout = ({ children }) => {
  return (
    <>
      <GoBackButton className="absolute top-[150px] left-10" />
      {children}
    </>
  );
};

export default ForgetPasswordLayout;
