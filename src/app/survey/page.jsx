import DraftsSection from "@/components/sections/seller/home/DraftsSection";
import SellerBanner from "@/components/sections/seller/home/seller-banner/SellerBanner";

const SurveyPage = async () => {
  return (
    <div className="flex w-full flex-col items-center justify-center px-3">
      <SellerBanner />
      <DraftsSection />
    </div>
  );
};

export default SurveyPage;

// import { ChevronRight } from "lucide-react/dist/cjs/lucide-react";
// import Link from "next/link";

// const SurveyPage = async () => {
//   return (
//     <div className="flex h-full flex-col pb-10 pt-28">
//       <h1 className="text-center text-4xl">👋</h1>
//       <h2 className="mt-4 text-center text-3xl text-darkBlue">
//         Welcome Ahsan Khan
//       </h2>
//       <p className="mt-2 text-center text-base text-darkBlue/50">
//         We would love to learn more about you and your business through short
//         questions designed to personalize your experience.{" "}
//       </p>
//       <div className="mt-8 flex w-full justify-center">
//         <p className="flex w-56 items-center justify-center rounded-lg bg-russianViolet/10 px-2 py-1 text-russianViolet">
//           Estimated Time: 1 Minute
//         </p>
//       </div>
//       <div className="flex w-full justify-center">
//         <Link
//           href="/survey/entity"
//           className="mt-56 flex h-14 w-72 items-center justify-center rounded-full bg-moonstone font-medium text-white"
//         >
//           Lets Start <ChevronRight />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default SurveyPage;
