import GoalForm from "@/components/forms/survey/GoalForm";
import ProductAndServicesForm from "@/components/forms/survey/ProductAndServicesForm";

const ProductAndServicesPage = async ({ params }) => {
  const { role } = await params;

  return <ProductAndServicesForm role={role} />;
};

export default ProductAndServicesPage;
