import ExperienceForm from "@/components/forms/survey/ExperienceForm";

const ExperiencePage = async ({ params }) => {
  const { role } = await params;

  return <ExperienceForm role={role} />;
};

export default ExperiencePage;
