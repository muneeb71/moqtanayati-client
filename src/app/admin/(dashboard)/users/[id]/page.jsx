"use client";
import UserDetails from "@/components/sections/admin/userdetails/UserDetails";
import UserSkeleton from "@/components/shimmer/userSkeleton";
import { useParams } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";

const UserDetailsPage = () => {
  console.log("in detail page");
  const params = useParams();
  const id = params?.id;
  const { t } = useTranslation();

  if (!id) return <div>{t("common.loading")}</div>;

  return <UserDetails userId={id} />;
};

export default UserDetailsPage;
