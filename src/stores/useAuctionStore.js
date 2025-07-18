import { create } from "zustand";
import toast from "react-hot-toast";
import { getAllAuctions } from "@/lib/api/admin/auctions/getAllAuctions";
import { cancelAuctionById } from "@/lib/api/admin/auctions/cancelAuctionById";

const useAuctionStore = create((set, get) => ({
  auctions: [],
  auctionsLoading: false,
  selectedAuctionRows: [],
  currentAuctionPage: 1,
  rowsPerAuctionPage: 10,
  totalAuctionPages: 1,
  totalAuctions: 0,
  auctionSearchTerm: "",
  auctionSortBy: "",
  debouncedAuctionSearchTerm: "",
  editingAuctionId: null,
  editAuctionValues: {
    status: "",
  },

  // ============== UI State ==============
  setAuctionSearchTerm: (val) => set({ auctionSearchTerm: val }),
  setAuctionSortBy: (val) => set({ auctionSortBy: val }),
  setDebouncedAuctionSearchTerm: (val) =>
    set({ debouncedAuctionSearchTerm: val }),
  setCurrentAuctionPage: (page) => set({ currentAuctionPage: page }),
  setSelectedAuctionRows: (rows) => set({ selectedAuctionRows: rows }),
  toggleAuctionRowSelection: (auctionId) => {
    const { selectedAuctionRows } = get();
    set({
      selectedAuctionRows: selectedAuctionRows.includes(auctionId)
        ? selectedAuctionRows.filter((id) => id !== auctionId)
        : [...selectedAuctionRows, auctionId],
    });
  },
  setEditingAuctionId: (id) => set({ editingAuctionId: id }),
  setEditAuctionValues: (values) =>
    set((state) => ({
      editAuctionValues: { ...state.editAuctionValues, ...values },
    })),

  // ============== Fetch All Auctions ==============
  fetchAuctions: async () => {
    try {
      const { currentAuctionPage, debouncedAuctionSearchTerm, auctionSortBy } =
        get();
      set({ auctionsLoading: true });
      const res = await getAllAuctions({
        currentPage: currentAuctionPage,
        search: debouncedAuctionSearchTerm.trim(),
        filter: auctionSortBy.trim(),
      });
      const { auctions = [], pagination = {} } = res?.data || {};
      set({
        auctions,
        rowsPerAuctionPage: pagination.limit || 10,
        totalAuctionPages: pagination.pages || 1,
        totalAuctions: pagination.total || auctions.length,
      });
    } catch (error) {
      set({ auctions: [] });
      toast.error("Failed to load auctions");
    } finally {
      set({ auctionsLoading: false });
    }
  },

  // ============== Cancel Auction ==============
  cancelAuction: async (auctionId) => {
    try {
      await cancelAuctionById(auctionId);
      toast.success("Auction cancelled successfully");
      get().fetchAuctions();
    } catch (error) {
      toast.error("Failed to cancel auction");
    }
  },
}));

export default useAuctionStore;
