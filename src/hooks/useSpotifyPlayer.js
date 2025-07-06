import { useEffect, useState } from "react";

function useSpotifyPlayer(token) {
    const [tracker, setTracker] = useState(null);

    useEffect(() => {
        if (!token) return;

        const obtenerCancionActual = async () => {
            try {
                const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.status === 204 || res.status > 400) {
                    console.log("No hay canción reproduciéndose actualmente.");
                    setTracker(null);
                    return null;
                }

                const data = await res.json();
                if (data && data.item) {
                    setTracker({
                        title: data.item.name,
                        artist: data.item.artists[0].name,
                        album: data.item.album.name,
                        image: data.item.album.images[0].url,
                        duration: data.item.duration_ms,
                        progress: data.progress_ms,
                        isPlaying: data.is_playing,
                    });
                }
            } catch (error) {
                console.error("Error al obtener la canción actual:", error);
            }
        };

        obtenerCancionActual();
        const interval = setInterval(obtenerCancionActual, 5000);

        return () => clearInterval(interval);
    }, [token]);

    return tracker;
}

export default useSpotifyPlayer;
