import {create} from "zustand";

const useUserStore = create((set) => ({
  token: localStorage.getItem("Spotify_token") || "",
  spotifyUser: null,
  setSpotifyUser: (user) => set({ spotifyUser: user }),
  guestName: localStorage.getItem("guest_name") || "",
  setGuestName: (name) => {
    localStorage.setItem("guest_name", name);
    set({ guestName: name });
  },
  setToken: (token) => {
    localStorage.setItem("Spotify_token", token);
    set({ token });
  },
  clearUser: () => {
    localStorage.removeItem("guest_name");
    localStorage.removeItem("Spotify_token");
    set({ guestName: "", token: "", spotifyUser: null });
  },
}));

export default useUserStore;
