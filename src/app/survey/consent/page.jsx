"use client";

import ConsentForm from "@/components/forms/survey/ConsentForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ConsentPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return <ConsentForm userId={userData.id} userData={userData} />;
};

export default ConsentPage;
