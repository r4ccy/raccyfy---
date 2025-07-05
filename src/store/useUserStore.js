import {create} from "zustand";

const useUserStore = create((set) => ({
  guestName: "",
  token: "",
  spotifyUser: null,
  setSpotifyUser: (user) => set({ spotifyUser: user }),
  setGuestName: (name) => set({ guestName: name }),
  setToken: (token) => {
    set({ token });
    localStorage.setItem("Spotify_token", token);
  },
  clearUser: () => set({ guestName: "", token: "", spotifyUser: null }),
}));

export default useUserStore;