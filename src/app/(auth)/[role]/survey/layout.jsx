import GoBackButton from "@/components/buttons/GoBackButton";
import { SurveyStoreProvider } from "@/providers/survey-store-provider";

const SurveyLayout = ({ children }) => {
  return (
    <>
      <GoBackButton className="absolute left-10 top-[150px]" />
      <SurveyStoreProvider>{children}</SurveyStoreProvider>
    </>
  );
};

export default SurveyLayout;
