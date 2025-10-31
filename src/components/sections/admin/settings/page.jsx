"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getAdminProfile } from "@/lib/api/admin/settings/getAdminProfile";
import { updateAdminProfile } from "@/lib/api/admin/settings/updateAdminProfile";
import toast from "react-hot-toast";
import formatDateTime from "@/utils/dateFormatter";
import ShimmeringCard from "@/components/shimmer/shimmerCard";
import useTranslation from "@/hooks/useTranslation";

const iconMap = {
  name: "/static/user.svg",
  phone: "/static/phone.svg",
  email: "/static/email.svg",
  cnic: "/static/id.svg",
  location: "/static/location.svg",
  password: "/static/id.svg", // Using id icon for password as lock icon doesn't exist
};

export default function ProfilePage() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

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
          avatar: data.avatar || data.profileImage,
        });
        setOriginalProfile({
          name: data.name,
          joined: data.createdAt,
          phone: data.phone,
          email: data.email,
          cnic: data.nationalId,
          location: data.address,
          createdAt: data.createdAt,
          avatar: data.avatar || data.profileImage,
        });
        setProfileImage(data.avatar || data.profileImage);
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

  const handlePasswordChange = (field, value) => {
    setPasswordData({ ...passwordData, [field]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setImgFailed(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImgFailed(false);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    if (!profile || !originalProfile) return;

    // Check for password changes
    const hasPasswordChanges =
      passwordData.currentPassword ||
      passwordData.newPassword ||
      passwordData.confirmPassword;

    if (hasPasswordChanges) {
      // Validate password fields
      if (!passwordData.currentPassword) {
        toast.error("Current password is required");
        return;
      }
      if (!passwordData.newPassword) {
        toast.error("New password is required");
        return;
      }
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error("New password and confirm password do not match");
        return;
      }
      if (passwordData.newPassword.length < 6) {
        toast.error("New password must be at least 6 characters long");
        return;
      }
    }

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

    if (
      Object.keys(changedFields).length === 0 &&
      !hasPasswordChanges &&
      !imageFile
    ) {
      toast.error("No changes detected");
      return;
    }

    setUpdating(true);
    try {
      // Update everything in one API call (profile fields, image, and password)
      if (
        Object.keys(changedFields).length > 0 ||
        imageFile ||
        hasPasswordChanges
      ) {
        const passwordDataToSend = hasPasswordChanges ? passwordData : null;
        const res = await updateAdminProfile(
          changedFields,
          imageFile,
          passwordDataToSend,
        );
        console.log("Profile update response:", res);
      }

      toast.success("Profile updated successfully!");

      // Reset password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Reset image fields
      setImageFile(null);
      setImagePreview(null);

      // Refresh profile data
      const fresh = await getAdminProfile();
      const data = fresh.data?.data || fresh.data;
      setProfile({
        name: data.name,
        joined: data.createdAt,
        phone: data.phone,
        email: data.email,
        cnic: data.nationalId,
        location: data.address,
        createdAt: data.createdAt,
        avatar: data.avatar || data.profileImage,
      });
      setOriginalProfile({
        name: data.name,
        joined: data.createdAt,
        phone: data.phone,
        email: data.email,
        cnic: data.nationalId,
        location: data.address,
        createdAt: data.createdAt,
        avatar: data.avatar || data.profileImage,
      });
      setProfileImage(data.avatar || data.profileImage);

      // Notify other parts of the app (e.g., header) to refresh avatar
      if (typeof window !== "undefined") {
        try {
          window.dispatchEvent(new CustomEvent("admin_profile_updated"));
        } catch (_) {}
      }
    } catch (error) {
      console.log("Profile update error:", error);

      // Extract detailed error message
      let errorMessage = "Failed to update profile";

      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error?.response?.status) {
        // Handle specific HTTP status codes
        switch (error.response.status) {
          case 400:
            errorMessage = "Bad request - Please check your input data";
            break;
          case 401:
            errorMessage = "Unauthorized - Please log in again";
            break;
          case 403:
            errorMessage =
              "Forbidden - You don't have permission to update profile";
            break;
          case 404:
            errorMessage = "Profile not found";
            break;
          case 413:
            errorMessage = "File too large - Please select a smaller image";
            break;
          case 422:
            errorMessage = "Invalid data - Please check your input";
            break;
          case 500:
            errorMessage = "Server error - Please try again later";
            break;
          default:
            errorMessage = `Request failed with status ${error.response.status}`;
        }
      } else if (error?.code === "ERR_NETWORK") {
        errorMessage = "Network error - Please check your connection";
      } else if (error?.code === "ECONNREFUSED") {
        errorMessage = "Cannot connect to server - Please try again later";
      }

      // Show detailed error in console for debugging
      console.error("Detailed error:", {
        message: errorMessage,
        status: error?.response?.status,
        data: error?.response?.data,
        fullError: error,
      });

      toast.error(errorMessage);
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
    <div className="min-h-screen bg-[#EDF3F7] p-4 pb-20">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-md">
        <div className="mb-6 flex flex-col items-center">
          <div className="relative">
            {(() => {
              const resolved = (() => {
                if (imagePreview) return imagePreview;
                if (!profileImage || imgFailed) return null;
                const isAbsolute = /^https?:\/\//i.test(profileImage);
                const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
                const prefixed = isAbsolute
                  ? profileImage
                  : `${base.replace(/\/$/, "")}${profileImage.startsWith("/") ? "" : "/"}${profileImage}`;
                const sep = prefixed.includes("?") ? "&" : "?";
                return `${prefixed}${sep}t=${Date.now()}`;
              })();
              console.log("[AdminSettings] avatar preview:", imagePreview);
              console.log(
                "[AdminSettings] avatar raw profileImage:",
                profileImage,
              );
              console.log("[AdminSettings] avatar resolved src:", resolved);
              return null;
            })()}
            {imagePreview || (profileImage && !imgFailed) ? (
              <Image
                src={(() => {
                  if (imagePreview) return imagePreview;
                  const isAbsolute = /^https?:\/\//i.test(profileImage);
                  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
                  const prefixed = isAbsolute
                    ? profileImage
                    : `${base.replace(/\/$/, "")}${profileImage.startsWith("/") ? "" : "/"}${profileImage}`;
                  const sep = prefixed.includes("?") ? "&" : "?";
                  return `${prefixed}${sep}t=${Date.now()}`;
                })()}
                alt="User Avatar"
                width={100}
                height={100}
                className="h-[100px] w-[100px] rounded-full object-cover"
                unoptimized
                onError={() => setImgFailed(true)}
              />
            ) : (
              <div className="grid h-[100px] w-[100px] place-items-center rounded-full bg-gray-200">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-500"
                >
                  <path
                    d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 14c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
            {!imagePreview && (
              <div className="absolute -bottom-2 -right-2">
                <label
                  htmlFor="profile-image-upload"
                  className="cursor-pointer"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-moonstone text-white hover:bg-moonstone/80">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                </label>
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            )}
            {imagePreview && (
              <button
                onClick={removeImage}
                className="absolute -right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <h2 className="mt-4 text-xl font-semibold">{profile.name || "-"}</h2>
          <p className="text-sm text-gray-500">
            {t("admin.settings.joined")}{" "}
            {formatDateTime.formatMonthYear(profile.createdAt)}
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

          {/* Password Fields */}
          <div className="mt-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              {t("admin.settings.change_password")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-md bg-[#F2F0FE] p-3">
                <div className="flex w-full items-center gap-2">
                  <Image
                    src={iconMap.password}
                    alt="password icon"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                  <input
                    type={showPasswords.currentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      handlePasswordChange("currentPassword", e.target.value)
                    }
                    className="w-full border-none bg-transparent text-sm focus:outline-none"
                    placeholder="Current Password"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("currentPassword")}
                    className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200"
                  >
                    {showPasswords.currentPassword ? (
                      <svg
                        className="h-4 w-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                  <Image
                    src="/static/edit.svg"
                    alt="password icon"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-md bg-[#F2F0FE] p-3">
                <div className="flex w-full items-center gap-2">
                  <Image
                    src={iconMap.password}
                    alt="password icon"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                  <input
                    type={showPasswords.newPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      handlePasswordChange("newPassword", e.target.value)
                    }
                    className="w-full border-none bg-transparent text-sm focus:outline-none"
                    placeholder="New Password"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("newPassword")}
                    className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200"
                  >
                    {showPasswords.newPassword ? (
                      <svg
                        className="h-4 w-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                  <Image
                    src="/static/edit.svg"
                    alt="password icon"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-md bg-[#F2F0FE] p-3">
                <div className="flex w-full items-center gap-2">
                  <Image
                    src={iconMap.password}
                    alt="password icon"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                  <input
                    type={showPasswords.confirmPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      handlePasswordChange("confirmPassword", e.target.value)
                    }
                    className="w-full border-none bg-transparent text-sm focus:outline-none"
                    placeholder="Confirm New Password"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200"
                  >
                    {showPasswords.confirmPassword ? (
                      <svg
                        className="h-4 w-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                  <Image
                    src="/static/edit.svg"
                    alt="password icon"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex w-full justify-center">
        <button
          onClick={handleSave}
          className="text-md rounded-full bg-moonstone px-32 py-4 text-lg font-medium text-white hover:bg-moonstone/80"
          disabled={updating}
        >
          {updating ? t("admin.settings.saving") : t("admin.settings.save")}
        </button>
      </div>
      <div className="h-20"></div>
    </div>
  );
}
