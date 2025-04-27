import Payment from "@/components/sections/admin/payment/Payment"

const page = async ({ params }) => {
  const role = (await params).method;
    return (
    <Payment role={role}/>
  )
}

export default page