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
                const formattedPlaylists = res.data.items.map((playlist) => ({
                    id: playlist.id,
                    name: playlist.name,
                    image: playlist.images[0]?.url || null
                }));
                setPlaylists(formattedPlaylists);
        } catch (error) {
            console.error("Error fetching playlists:", error);
        }
        };

        const fetchArtists = async () => {
            try {
                const res = await axios.get("https://api.spotify.com/v1/me/following?type=artist&limit=20", { headers });
                const formattedArtists = res.data.artists.items.map((artist) => ({
                    id: artist.id,
                    name: artist.name,
                    image: artist.images[0]?.url || null
                }));
                setArtists(formattedArtists);
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