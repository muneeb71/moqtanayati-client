"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getAdminProfile } from "@/lib/api/admin/settings/getAdminProfile";
import { updateAdminProfile } from "@/lib/api/admin/settings/updateAdminProfile";
import toast from "react-hot-toast";
import formatDateTime from "@/utils/dateFormatter";
import ShimmeringCard from "@/components/shimmer/shimmerCard";

const iconMap = {
  name: "/static/user.svg",
  phone: "/static/phone.svg",
  email: "/static/email.svg",
  cnic: "/static/id.svg",
  location: "/static/location.svg",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        console.log("profile 000");
        const res = await getAdminProfile();
        console.log("profile 3 ", res);
        const data = res.data?.data || res.data;
        console.log("profile created at : ", data.createdAt);
        setProfile({
          name: data.name,
          joined: data.createdAt,
          phone: data.phone,
          email: data.email,
          cnic: data.nationalId,
          location: data.address,
          createdAt: data.createdAt,
        });
        setOriginalProfile({
          name: data.name,
          joined: data.createdAt,
          phone: data.phone,
          email: data.email,
          cnic: data.nationalId,
          location: data.address,
          createdAt: data.createdAt,
        });
      } catch (err) {
        setProfile(null);
        setOriginalProfile(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = async () => {
    if (!profile || !originalProfile) return;
    const changedFields = {};
    ["name", "phone", "email", "cnic", "location"].forEach((key) => {
      if (profile[key] !== originalProfile[key]) {
        if (key === "cnic") {
          changedFields["nationalId"] = profile[key];
        } else if (key === "location") {
          changedFields["address"] = profile[key];
        } else {
          changedFields[key] = profile[key];
        }
      }
    });
    if (Object.keys(changedFields).length === 0) {
      toast.error("No changes detected");
      return;
    }
    setUpdating(true);
    try {
      const res = await updateAdminProfile(changedFields);
      toast.success(res.data?.message || "Profile updated successfully!");
      const updated = res.data?.data;
      if (updated) {
        setProfile({
          name: updated.name,
          joined: data.createdAt,
          phone: updated.phone,
          email: updated.email,
          cnic: updated.nationalId,
          location: updated.address,
        });
        setOriginalProfile({
          name: updated.name,
          joined: data.createdAt,
          phone: updated.phone,
          email: updated.email,
          cnic: updated.nationalId,
          location: updated.address,
        });
      } else {
        const fresh = await getAdminProfile();
        const data = fresh.data?.data || fresh.data;
        setProfile({
          name: data.name,
          joined: data.createdAt,
          phone: data.phone,
          email: data.email,
          cnic: data.nationalId,
          location: data.address,
        });
        setOriginalProfile({
          name: data.name,
          joined: data.createdAt,
          phone: data.phone,
          email: data.email,
          cnic: data.nationalId,
          location: data.address,
        });
      }
    } catch (err) {
      toast.error(err?.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <ShimmeringCard />;
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3F7]">
        <div className="text-lg text-red-500">Failed to load profile.</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#EDF3F7] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-md">
        <div className="mb-6 flex flex-col items-center">
          <Image
            src="/static/testuser.svg"
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
          <h2 className="mt-4 text-xl font-semibold">{profile.name || "-"}</h2>
          <p className="text-sm text-gray-500">
            {formatDateTime.formatJoinDate(profile.createdAt)}
          </p>
        </div>

        <div className="space-y-4">
          {[
            { field: "name", placeholder: "Full Name", value: profile.name },
            { field: "phone", placeholder: "Phone No", value: profile.phone },
            { field: "email", placeholder: "Email", value: profile.email },
            { field: "cnic", placeholder: "National ID", value: profile.cnic },
            {
              field: "location",
              placeholder: "Location",
              value: profile.location,
            },
          ].map(({ field, value, placeholder }) => (
            <div
              key={field}
              className="flex items-center justify-between rounded-md bg-[#F2F0FE] p-3"
            >
              <div className="flex w-full items-center gap-2">
                <Image
                  src={iconMap[field]}
                  alt={`${field} icon`}
                  width={16}
                  height={16}
                  className="object-contain"
                />
                <input
                  type="text"
                  value={value || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="w-full border-none bg-transparent text-sm focus:outline-none"
                  placeholder={placeholder}
                  disabled={field === "email"}
                />
              </div>
              {field !== "email" && (
                <Image
                  src="/static/edit.svg"
                  alt={`${field} icon`}
                  width={16}
                  height={16}
                  className="object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-20 mt-10 flex w-full justify-center">
        <button
          onClick={handleSave}
          className="text-md mt-6 rounded-full bg-moonstone px-32 py-4 text-lg font-medium text-white hover:bg-moonstone/80"
          disabled={updating}
        >
          {updating ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
