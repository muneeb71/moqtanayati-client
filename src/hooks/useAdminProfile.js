"use client";

import { useState, useEffect } from "react";
import { getAdminProfile } from "@/lib/api/admin/settings/getAdminProfile";

export const useAdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAdminProfile();
        const profileData = response.data?.data || response.data;

        setProfile({
          id: profileData.id,
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          avatar:
            profileData.avatar || profileData.profileImage || profileData.image,
          role: profileData.role,
          createdAt: profileData.createdAt,
        });
      } catch (err) {
        console.error("Failed to fetch admin profile:", err);
        setError(err.message || "Failed to fetch profile");
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminProfile();
      const profileData = response.data?.data || response.data;

      setProfile({
        id: profileData.id,
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        avatar:
          profileData.avatar || profileData.profileImage || profileData.image,
        role: profileData.role,
        createdAt: profileData.createdAt,
      });
    } catch (err) {
      console.error("Failed to refetch admin profile:", err);
      setError(err.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, refetch };
};
