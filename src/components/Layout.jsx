import "./Layout.css";
import {Outlet} from "react-router-dom";
import { useState } from "react";

function Layout () {
    const [mostrarSidebar, setMostrarSidebar] = useState(false);

    return (
        <div className="layout">
            <aside className="sidebar">
                barra lateral
            </aside>
            <main className="main-section">
                <header className="header">
                    parte superior
                </header>
            <section className="content">
                <Outlet />
            </section>
            </main>
            <footer className="footer">
                reproductor de musica
            </footer>
        </div>
    );
}

export default Layout;