import AdminLoginForm from "@/components/forms/AdminLoginForm";
import Image from "next/image";

const AdminLoginPage = () => {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-[#ECF1F5] px-4">
      <Image
        src="/static/bg/blob.svg"
        width={441}
        height={384}
        alt="blob"
        loading="eager"
        className="absolute left-0 top-0 max-h-[50%] sm:max-w-[50%]"
        style={{ width: "auto", height: "auto" }}
      />
      <AdminLoginForm />
      <Image
        src="/static/logo.png"
        width={161}
        height={81}
        alt="logo"
        className="absolute left-10 top-10 rounded-md"
        loading="eager"
        quality={100}
        style={{ width: "auto", height: "auto" }}
      />
      <div className="absolute right-0 hidden h-full w-1/2 flex-col bg-[#D3EDF0] md:flex">
        <div className="mr-8 mt-8 size-[27px] self-end rounded-full border border-moonstone/30"></div>
        <div className="size-[41px] self-center rounded-full border border-moonstone/30"></div>
        <div className="mr-16 mt-[50vh] size-[63px] self-end rounded-full border border-moonstone/30"></div>
        <div className="mt-[20vh] size-[14px] self-center rounded-full border border-moonstone/30"></div>
        <div className="ml-40 mt-5 size-[27px] rounded-full border border-moonstone/30"></div>
        <div className="mr-40 size-[47px] self-end rounded-full border border-moonstone/30"></div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
