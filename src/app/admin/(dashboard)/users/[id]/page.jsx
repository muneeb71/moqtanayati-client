"use client";
import UserDetails from "@/components/sections/admin/userdetails/UserDetails";
import UserSkeleton from "@/components/shimmer/userSkeleton";
import { useParams } from "next/navigation";

const UserDetailsPage = () => {
  console.log("in detail page");
  const params = useParams();
  const id = params?.id;

  if (!id) return <div>Loading...</div>;

  return <UserDetails userId={id} />;
};

export default UserDetailsPage;
