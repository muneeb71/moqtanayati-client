"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getAdminProfile } from "@/lib/api/admin/settings/getAdminProfile";
import { updateAdminProfile } from "@/lib/api/admin/settings/updateAdminProfile";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await getAdminProfile();
        const data = res.data?.data || res.data;
        setProfile({
          name: data.name,
          phone: data.phone,
          email: data.email,
          cnic: data.nationalId,
          location: data.address,
        });
        setOriginalProfile({
          name: data.name,
          phone: data.phone,
          email: data.email,
          cnic: data.nationalId,
          location: data.address,
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
          phone: updated.phone,
          email: updated.email,
          cnic: updated.nationalId,
          location: updated.address,
        });
        setOriginalProfile({
          name: updated.name,
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
          phone: data.phone,
          email: data.email,
          cnic: data.nationalId,
          location: data.address,
        });
        setOriginalProfile({
          name: data.name,
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EDF3F7]">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EDF3F7]">
        <div className="text-lg text-red-500">Failed to load profile.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EDF3F7] flex items-center flex-col justify-center p-4">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-md bg-white">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/static/testuser.svg"
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
          <h2 className="text-xl font-semibold mt-4">{profile.name || "-"}</h2>
          <p className="text-gray-500 text-sm">Joined Jan, 2024</p>
        </div>

        <div className="space-y-4">
          {[
            { field: "name", placeholder: "Full Name", value: profile.name },
            { field: "phone", placeholder: "Phone No", value: profile.phone },
            { field: "email", placeholder: "Email", value: profile.email },
            { field: "cnic", placeholder: "National ID", value: profile.cnic },
            { field: "location", placeholder: "Location", value: profile.location },
          ].map(({ field, value, placeholder }) => (
            <div
              key={field}
              className="flex items-center bg-[#F2F0FE] p-3 rounded-md justify-between"
            >
              <input
                type="text"
                value={value || ""}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none text-sm"
                placeholder={placeholder}
                disabled={field === "email" ? true: false}
              />
              {field !== "email" && <Pencil className="w-4 h-4 text-gray-500 ml-2" />}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={handleSave}
          className=" mt-6 px-32 py-4 bg-moonstone hover:bg-moonstone/80 text-lg font-medium rounded-full text-white text-md"
          disabled={updating}
        >
          {updating ? "Saving..." : "Save"}
        </button>
        </div>
    </div>
  );
}
