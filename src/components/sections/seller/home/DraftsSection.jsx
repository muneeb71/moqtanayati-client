"use client";

import DraftCard from "@/components/cards/DraftCard";
import { getDraftProducts } from "@/lib/api/product/getDraftProducts";
import { useProfileStore } from "@/providers/profile-store-provider";
import { useEffect, useState } from "react";

const DraftsSection = () => {
  const { store } = useProfileStore((state) => state);
  const [drafts, setDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrafts = async () => {
      if (store?.id) {
        try {
          const draftProducts = await getDraftProducts(store.id);
          setDrafts(draftProducts);
        } catch (error) {
          console.error("Error fetching drafts:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchDrafts();
  }, [store?.id]);

  if (isLoading) {
    return (
      <div className="flex w-full max-w-7xl flex-col gap-5 py-20">
        <h1 className="text-3xl font-medium text-[#3D3D5D]">Drafts</h1>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Add loading skeleton here if needed */}
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (drafts.length === 0) {
    return (
      <div className="flex w-full max-w-7xl flex-col gap-5 py-20">
        <h1 className="text-3xl font-medium text-[#3D3D5D]">Drafts</h1>
        <div className="text-center text-gray-500">No draft products found</div>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-7xl flex-col gap-5 py-20">
      <h1 className="text-3xl font-medium text-[#3D3D5D]">Drafts</h1>
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {drafts.map((draft) => (
          <DraftCard
            key={draft.id}
            draft={draft}
          />
        ))}
      </div>
    </div>
  );
};

export default DraftsSection;
