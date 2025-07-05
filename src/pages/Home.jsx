import "./Home.css";
import useUserStore from "../store/useUserStore.js"; // Importar el store de Zustand
import { useEffect } from "react";

function Home() {
    const {guestName, token, spotifyUser, setSpotifyUser} = useUserStore();

    useEffect(() => {
        const obtenerperfil = async () => {
            if (token && !spotifyUser) {
                const res = await fetch("https://api.spotify.com/v1/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                setSpotifyUser(data);
            }
        };
        obtenerperfil();
    }, [token, spotifyUser, setSpotifyUser]);

    const mostrarNombre = () => {
        if (guestName)
            return `${guestName}`;
        if (spotifyUser?.display_name)
            return `${spotifyUser.display_name}`;
        if (token)
            return "Usuario de Spotify";
    };

    return (
        <div className="home">
            <h1>
                holiii {mostrarNombre()}
            </h1>
            <p>prueba 1</p>
        </div>
    );
}

export default Home;
