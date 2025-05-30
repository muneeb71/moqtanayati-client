import GoalForm from "@/components/forms/survey/GoalForm";

const GoalPage = async ({ params }) => {
  const { role } = await params;

  return <GoalForm role={role} />;
};

export default GoalPage;
