import Users from "@/components/sections/admin/users/Users";

const page = async ({ params }) => {
  const role = (await params).role
    return (
    <Users role={role}/>
  )
}

export default page