import FaqSection from "@/components/sections/landing/help-center/FaqSection";
import UserGuidesSection from "@/components/sections/landing/help-center/UserGuidesSection";

const HelpCenterFaqPage = async ({ params }) => {
  const { category, subCategory } = await params;
  if (category == "faqs")
    return <FaqSection category={category} subCategory={subCategory} />;
  return <UserGuidesSection category={category} subCategory={subCategory} />;
};

export default HelpCenterFaqPage;
