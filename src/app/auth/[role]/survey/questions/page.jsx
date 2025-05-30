"use client";

import { useState } from "react";
import StartSelling from "./pages/StartSelling";
import SellingHistory from "./pages/SellingHistory";
import Purpose from "./pages/Purpose";
import CategorySelection from "./pages/CategorySelection";
import SubcategorySelection from "./pages/SubCategorySelection";
import Consent from "./pages/Consent";
import { useRouter } from "next/navigation";

const QuestionsPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    haveProductToSell: "",
    haveExperienceSelling: "",
    whatBringsYouHere: "",
    productsAndServicesToSell: "",
    supplies: [],
    consent: ""
  })
  const router = useRouter();

  const goBack = () => {
    if (step === 1) {
      router.back()
    }
    else {
      setStep(prev => prev-1)
    }
  }

  return <div>
    {step === 1 && <StartSelling setFormData={setFormData} setStep={setStep} goBack={goBack}/>}
    {step === 2 && <SellingHistory setFormData={setFormData} setStep={setStep} goBack={goBack}/>}
    {step === 3 && <Purpose setFormData={setFormData} setStep={setStep} goBack={goBack}/>}
    {step === 4 && <CategorySelection setFormData={setFormData} setStep={setStep} goBack={goBack}/>}
    {step === 5 && <SubcategorySelection setFormData={setFormData} setStep={setStep} formData={formData} goBack={goBack}/>}
    {step === 6 && <Consent setFormData={setFormData} setStep={setStep} goBack={goBack}/>}
  </div>;
};

export default QuestionsPage;
