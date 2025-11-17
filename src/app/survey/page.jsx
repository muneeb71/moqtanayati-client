"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";

const SurveyPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    // Get user data from sessionStorage
    const storedUserData = sessionStorage.getItem("surveyUserData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      // If no user data, redirect to login
      router.push("/seller/login");
    }
    setLoading(false);
  }, [router]);

  const handleStart = () => {
    setNavigating(true);
    router.push("/survey/entity");
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-moonstone border-t-transparent" />
      </div>
    );
  }

  if (!userData) {
    return null; // Will redirect
  }

  return (
    <div className="flex h-full flex-col pb-10 pt-28">
      <h1 className="text-center text-4xl">👋</h1>
      <h2 className="mt-4 text-center text-3xl text-darkBlue">
        {t("survey.welcome")} {userData.name}
      </h2>
      <p className="mt-2 text-center text-base text-darkBlue/50">
        {t("survey.intro")}
      </p>
      <div className="mt-8 flex w-full justify-center">
        <p className="flex w-56 items-center justify-center rounded-lg bg-russianViolet/10 px-2 py-1 text-russianViolet">
          {t("survey.eta")}
        </p>
      </div>
      <div className="flex w-full justify-center">
        <button
          onClick={handleStart}
          disabled={navigating}
          className="mt-56 flex h-14 w-72 items-center justify-center rounded-full bg-moonstone font-medium text-white transition hover:bg-moonstone/90 disabled:opacity-50"
        >
          {navigating ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              {t("survey.starting")}
            </>
          ) : (
            <>
              {t("survey.lets_start")} <ChevronRight />
            </>
          )}
        </button>
      </div>
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
