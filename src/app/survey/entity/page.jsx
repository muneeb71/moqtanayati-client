"use client";

import ChooseSellerEntityForm from "@/components/forms/survey/ChooseSellerEntityForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EntityPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get user data from sessionStorage
    const storedUserData = sessionStorage.getItem("surveyUserData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      // If no user data, redirect to login
      router.push("/seller/login");
    }
  }, [router]);

  if (!userData) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-moonstone border-t-transparent" />
      </div>
    );
  }

  return <ChooseSellerEntityForm userData={userData} />;
};

export default EntityPage;
