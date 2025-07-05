import "./Home.css";
import useUserStore from "../store/useUserStore.js"; // Importar el store de Zustand

function Home() {
    const {guestName, token} = useUserStore();

    return (
        <div className="home">
            <h1>
                holiii {guestName ? `${guestName}` : token ? "Spotify" : ""}
            </h1>
            <p>prueba 1</p>
        </div>
    );
}

export default Home;
