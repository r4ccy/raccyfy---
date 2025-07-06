import { useEffect, useState } from "react";
import axios from "axios";

function useSpotifyLibrary(token) {
    const [playlists, setPlaylists] = useState([]);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        if (!token) return;

        const headers = {
            Authorization: `Bearer ${token}`
        };

        const fetchPlaylists = async () => {
            try {
                const res = await axios.get("https://api.spotify.com/v1/me/playlists", { headers });
                setPlaylists(res.data.items);
        } catch (error) {
            console.error("Error fetching playlists:", error);
        }
        };

        const fetchArtists = async () => {
            try {
                const res = await axios.get("https://api.spotify.com/v1/me/following?type=artist", { headers });
                setArtists(res.data.artists.items);
            } catch (error) {
                console.error("Error fetching artists:", error);
            }
        };

        fetchPlaylists();
        fetchArtists();
        }, [token]);

        return { playlists, artists };
    }

export default useSpotifyLibrary;