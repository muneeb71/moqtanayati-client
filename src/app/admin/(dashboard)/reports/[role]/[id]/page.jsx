import UserDetails from "@/components/sections/admin/reports/UserDetails"

const page = async ({params}) => {
    const role = (await params).role
    console.log(role);
    
  return (
    <UserDetails role={role}/>
  )
}

export default page