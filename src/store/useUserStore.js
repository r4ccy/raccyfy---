import {create} from "zustand";

const useUserStore = create((set) => ({
  token: "",
  spotifyUser: null,
  setSpotifyUser: (user) => set({ spotifyUser: user }),
  guestName: localStorage.getItem("guest_name") || "",
  setGuestName: (name) => {
    localStorage.setItem("guest_name", name);
    set({ guestName: name });
  },
  clearUser: () => {
    localStorage.removeItem("guest_name");
    set({ guestName: "", token: "", spotifyUser: null });
  },
}));

export default useUserStore;
