import "./Layout.css";
import {Outlet} from "react-router-dom";
import { useEffect, useState } from "react";

function Layout () {
    const [mostrarSidebar, setMostrarSidebar] = useState(window.innerWidth > 768);

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
            <aside className={`sidebar ${mostrarSidebar ? "visible" : ""}`}>
                barra lateral
            </aside>
            <header className="header">
                <button className = "menu-button"
                    onClick={() => setMostrarSidebar(!mostrarSidebar)}
                    >
                        ☰
                </button>
                    parte spotifyUser
            </header>
            <section className="content">
                <Outlet />
            </section>
            <footer className="footer">
                reproductor de musica
            </footer>
        </div>
    );
}

export default Layout;