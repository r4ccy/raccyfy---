import "./Layout.css";
import {Outlet} from "react-router-dom";
import { useEffect, useState } from "react";
import useSpotifyPlayer from "../hooks/useSpotifyPlayer";
import useUserStore from "../store/useUserStore";

function Layout () {
    const [mostrarSidebar, setMostrarSidebar] = useState(window.innerWidth > 768);
    const {token} = useUserStore();
    const track = useSpotifyPlayer(token);

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
                Biblioteca
            </aside>
            <div className={`main-wrapper`}>
                <header className="header">
                    parte spotifyUser
                </header>
                <section className="content">
                    <Outlet />
                </section>
                <footer className="footer">
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
