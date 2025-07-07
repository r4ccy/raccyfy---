import { useEffect, useState } from "react";
import axios from "axios";

function useTopTracksHistory(token) {
    const [history, setHistory] = useState([]);
    const [genresPerYear, setGenresPerYear] = useState({});

    useEffect(() => {
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };

        const fetchTopTracks = async () => {
            try {
                const res = await axios.get(
                    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
                    { headers }
                );

                const items = res.data.items;
                if (!items || items.length === 0) {
                    setHistory([]);
                    return;
                }

                const yearGenreMap = {};
                const processedTracks = [];

                for (const track of items) {
                    const year = new Date(track.album.release_date).getFullYear();
                    const artistId = track.artists[0]?.id;

                    processedTracks.push({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0]?.name,
                        date: year,
                    });

                    if (artistId) {
                        try {
                            const artistRes = await axios.get(
                                `https://api.spotify.com/v1/artists/${artistId}`,
                                { headers }
                            );

                            const genres = artistRes.data.genres;

                            if (!yearGenreMap[year]) yearGenreMap[year] = {};
                            for (const genre of genres) {
                                yearGenreMap[year][genre] = (yearGenreMap[year][genre] || 0) + 1;
                            }
                        } catch (error) {
                            console.warn(`Error obteniendo géneros del artista ${artistId}:`, error.message);
                        }
                    }
                }

                const dominantGenres = {};
                for (const year in yearGenreMap) {
                    const entries = Object.entries(yearGenreMap[year]);
                    if (entries.length > 0) {
                        const [topGenre] = entries.reduce((a, b) => (b[1] > a[1] ? b : a));
                        dominantGenres[year] = topGenre;
                    }
                }

                setHistory(processedTracks);
                setGenresPerYear(dominantGenres);
            } catch (error) {
                console.error("Error fetching top tracks:", error);
            }
        };

        fetchTopTracks();
    }, [token]);

    return { history, genresPerYear };
}

export default useTopTracksHistory;
