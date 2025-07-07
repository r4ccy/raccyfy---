import { useEffect, useState } from "react";
import axios from "axios";

function useTopTracksHistory(token) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (!token) return;

    const headers = { Authorization: `Bearer ${token}` };

    const fetchTopTracks = async () => {
        try {
            const res = await axios.get(
            "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
            { headers }
        );

        const tracks = res.data.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            date: new Date(track.album.release_date).getFullYear(),
        }));

        setHistory(tracks);
        } catch (error) {
            console.error("Error fetching top tracks:", error);
        }
    };

    fetchTopTracks();
    }, [token]);

    return history;
}

export default useTopTracksHistory;
