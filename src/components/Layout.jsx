import "Layout.css";

function Layout () {
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
                contenido principal (musica)
            </section>
            </main>
            <footer className="footer">
                reproductor de musica
            </footer>
        </div>
    );
}

export default Layout;