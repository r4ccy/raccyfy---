import {create} from "zustand";

const useUserStore = create((set) => ({
  guestName: "",
  token: "",
  setGuestName: (name) => set({ guestName: name }),
  setToken: (token) => set({ token }),
  clearUser: () => set({ guestName: "", token: "" }),
}));

export default useUserStore;