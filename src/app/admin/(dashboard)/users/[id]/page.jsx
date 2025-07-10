"use client";
import UserDetails from "@/components/sections/admin/userdetails/UserDetails";
import { useParams } from "next/navigation";

const UserDetailsPage = () => {
  console.log("in detail page");
  const params = useParams();
  const id = params?.id;

  console.log("in detail page id: ", id);

  if (!id) return <div>Loading...</div>;

  return <UserDetails userId={id} />;
};

export default UserDetailsPage;
