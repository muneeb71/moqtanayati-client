import HomeSuppliesForm from "@/components/forms/survey/HomeSuppliesForm";


const HomeSuppliesPage = async ({ params }) => {
  const { role } = await params;
  
  return <HomeSuppliesForm role={role} />;
};

export default HomeSuppliesPage;
