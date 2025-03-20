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
      <div className="absolute right-0 z-[1] hidden h-screen w-full max-w-[457px] items-end justify-end bg-[#D3EDF0] xl:flex overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src="/bg/home/main-banner.png"
            width={712}
            height={839}
            loading="lazy"
            alt="banner"
            quality={100}
            className="min-w-[700px] top-[750px] -right-[200px] absolute"
          />
          <div className="absolute left-1/2  z-10">
            <Image
              src="/newlogo.png"
              width={50}
              height={50}
              quality={100}
              alt="logo"
              loading="lazy"
              className="md:min-w-[150px] min-w-[100px] lg:min-w-[150px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
