import Image from "next/image";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-[#FFFFFE]">
      <div className="absolute top-0 z-10 flex w-full px-10 py-10">
        <Image
          src="/logo.png"
          width={161}
          height={81}
          loading="eager"
          alt="Logo"
          quality={100}
          className="rounded-[10px]"
        />
      </div>
      
      <div className="z-20 flex w-full max-w-[450px] flex-col px-5 py-10 mt-[115px] md:mt-0">
        {children}
      </div>
      <div className="absolute left-0 top-0 z-[1]">
        <Image
          src="/bg/blob.svg"
          width={600}
          height={600}
          alt="blob"
          loading="eager"
        />
      </div>
      <div className="absolute right-0 z-[1] hidden h-screen w-full max-w-[457px] items-end justify-end bg-[#D3EDF0] xl:flex">
        <Image
          src="/newlogo.svg"
          width={712}
          height={712}
          loading="lazy"
          alt="Logo"
          quality={100}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
