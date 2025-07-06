import "./Layout.css";
import {Outlet} from "react-router-dom";
import { useEffect, useState } from "react";
import useSpotifyPlayer from "../hooks/useSpotifyPlayer";
import useUserStore from "../store/useUserStore";

function Layout () {
    const [mostrarSidebar, setMostrarSidebar] = useState(window.innerWidth > 768);
    const token = useUserStore((state) => state.token);
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
            <div className={`main-wrapper ${mostrarSidebar ? "shifted" : ""}`}>
                <header className="header">
                    parte spotifyUser
                </header>
                <section className="content">
                    <Outlet />
                </section>
                <footer className="footer"> {
                        track ? (
                            <>
                                <p>{track.title}</p>
                                <p style={{ fontSize: "0.8rem", color: "#aaa" }}>{track.artist}</p>
                            </>
                        ) : (
                            "reproductor de musica"
                        )
                    }
                </footer>
            </div>
        </div>
    );
}

export default Layout;