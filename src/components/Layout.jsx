import "./Layout.css";
import {Outlet} from "react-router-dom";
import { useEffect, useState } from "react";
import useSpotifyPlayer from "../hooks/useSpotifyPlayer";
import useUserStore from "../store/useUserStore";
import useSpotifyLibrary from "../hooks/useSpotifyLibrary";


function Layout () {
    const [mostrarSidebar, setMostrarSidebar] = useState(window.innerWidth > 768);
    const {token} = useUserStore();
    const track = useSpotifyPlayer(token);
    const { playlists, artists } = useSpotifyLibrary(token);


    useEffect(() => {
        const handleResize = () => {
            const isLarge=window.innerWidth > 768;
            setMostrarSidebar(isLarge);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function formatTime(ms) {
        const minutes = Math.floor(ms/60000);
        const seconds = Math.floor((ms % 60000) / 1000)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}`;
    }

    return (
        <div className="layout">
            <button className = "menu-button"
                onClick={() => setMostrarSidebar(!mostrarSidebar)}
            >
                ☰
            </button>

            <aside className={`sidebar ${mostrarSidebar ? "visible" : ""}`}>

            <h2
                className="sidebar-title">
                    Biblioteca
            </h2>

            <ul className="sidebar-list">
                {playlists.length > 0 ? (
                    playlists.map((playlist) => (
                        <li key={playlist.id} className="sidebar-item">
                            {playlist.name && (
                                <img
                                    src={playlist.image}
                                    alt={playlist.name}
                                    className="sidebar-image"
                                />
                            )}
                            <span>{playlist.name}</span>
                        </li>
                    ))
                ):(
                    <li className="sidebar-item">Cargando playlists...</li>
                )}
            </ul>

            <h3
                className="sidebar-subtitle">
                    Artistas
            </h3>

            <ul className="sidebar-list">
                {artists.length > 0 ? (
                    artists.map((artist) => (
                        <li key={artist.id} className="sidebar-item">
                            {artist.image && (
                                <img src={artist.name}
                                    alt={artist.name}
                                    className="sidebar-image"
                                />
                            )}
                            <span>{artist.name}</span>
                        </li>
                    ))
                ):(
                    <li className="sidebar-item">Cargando artistas...</li>
                )}
            </ul>
        </aside>

            <div className={`main-wrapper`}>
                <header className="header">
                    parte spotifyUser
                </header>
                <section className="content">
                    <Outlet />
                </section>
                <footer className={`footer ${mostrarSidebar ? "sidebar-visible" : ""}`}>
                    {track ? (
                        <div className="player">
                            <div className="player-left">
                            <img src={track.image} alt="cover" className="cover" />
                            <div className="info">
                                <div className="name">{track.title}</div>
                                <div className="artist">{track.artist}</div>
                            </div>
                            </div>

                            <div className="player-center controls">
                                <button className="control-button">
                                    ⏮
                                </button>
                                <button className="control-button">{track.isPlaying ? "⏸" : "▶️"}</button>
                                <button className="control-button">
                                    ⏭
                                </button>
                            </div>

                            <div className="player-right progress">
                                <span className="time">{formatTime(track.progress)}</span>
                                <div className="bar-container">
                                    <div
                                        className="bar"
                                        style={{
                                            width: `${(track.progress / track.duration) * 100}%`,
                                        }}
                                    />
                                </div>
                                <span className="time">{formatTime(track.duration)}</span>
                            </div>
                        </div>
                        ) : (
                        <span>
                            𝄪 ✧˖° 🦝♪ °˖✧ 𝄪
                        </span>
                    )}
                </footer>
            </div>
        </div>
    );
}

export default Layout;
