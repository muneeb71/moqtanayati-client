import Reports from "@/components/sections/admin/reports/Reports"

const page = async ({ params }) => {
  const role = (await params).role
  return (
    <Reports role={role}/>
  )
}

export default page