// useUserStore.ts
import { create } from "zustand";
import { getAllUsers } from "@/lib/api/admin/users/getAllUsers";
import {
  editUserAccountStatus,
  editUserVerificationStatus,
} from "@/lib/api/admin/users/editUser";
import { deleteUserFromDb } from "@/lib/api/admin/users/deleteUserFromDb";
import toast from "react-hot-toast";

const useUserStore = create((set, get) => ({
  users: [],
  usersLoading: false,
  selectedRows: [],
  currentPage: 1,
  rowsPerPage: 10,
  totalPages: 1,
  totalUsers: 0,
  searchTerm: "",
  sortBy: "",
  debouncedSearchTerm: "",
  editingUserId: null,
  editValues: {
    accountStatus: "",
    verificationStatus: "",
  },

  // ==================== UI States ===================
  setSearchTerm: (val) => set({ searchTerm: val }),
  setSortBy: (val) => set({ sortBy: val }),
  setDebouncedSearchTerm: (val) => set({ debouncedSearchTerm: val }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedRows: (rows) => set({ selectedRows: rows }),
  toggleRowSelection: (email) => {
    const { selectedRows } = get();
    set({
      selectedRows: selectedRows.includes(email)
        ? selectedRows.filter((e) => e !== email)
        : [...selectedRows, email],
    });
  },
  setEditingUserId: (id) => set({ editingUserId: id }),
  setEditValues: (values) =>
    set((state) => ({
      editValues: { ...state.editValues, ...values },
    })),

  // ==================== Get All Users ===================
  fetchUsers: async () => {
    try {
      const { currentPage, debouncedSearchTerm, sortBy } = get();
      set({ usersLoading: true });
      const res = await getAllUsers({
        currentPage,
        search: debouncedSearchTerm.trim(),
        filter: sortBy.trim(),
      });

      const { users = [], pagination = {} } = res?.data || {};
      set({
        users,
        rowsPerPage: pagination.limit || 10,
        totalPages: pagination.pages || 1,
        totalUsers: pagination.total || users.length,
      });
    } catch (e) {
      set({ users: [] });
    } finally {
      set({ usersLoading: false });
    }
  },

  // ==================== Edit User ===================
  handleSave: async (userId) => {
    try {
      const { editValues, fetchUsers, setEditingUserId } = get();
      await editUserAccountStatus(userId, editValues.accountStatus);
      await editUserVerificationStatus(userId, editValues.verificationStatus);
      toast.success("User updated successfully");
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update user");
    }
  },

  // ==================== Delete User ===================
  deleteUser: async (userId) => {
    try {
      console.log("in delete");
      await deleteUserFromDb(userId);
      console.log("after delete");
      toast.success("User deleted");
      get().fetchUsers();
      console.log("after fetching delete");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  },
}));

export default useUserStore;
