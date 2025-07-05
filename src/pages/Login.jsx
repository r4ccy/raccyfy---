import {usarAutenticacionSpotify} from "../hooks/useSpotifyAuth.js";
import useUserStore from "../store/useUserStore.js";   //no se lo importa con {}; {} -> nombre (algo especifico), sin {} -> todo lo que exporta el archivo
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import "./Login.css";

function Login() {
    const {iniciarSesionConSpotify} = usarAutenticacionSpotify();
    const {setGuestName} = useUserStore();
    const navigate = useNavigate();
    const [mostrarInput, setMostrarInput] = useState(false);
    const [nombreInvitado, setNombreInvitado] = useState("");

    const ingresarComoInvitado = () => {
        console.log("posi"); //borrar luego
        if(nombreInvitado.trim() === "") {
            alert("Por favor, ingresa tu nombre.");
            return;
        }
            setGuestName(nombreInvitado.trim());
            navigate("/home");
        };

return (
    <div className="welcome">
        <h1>hiiii welcome</h1>
        <p>Zzzzz...</p>

        {!mostrarInput ? (
            <button onClick={() => setMostrarInput(true)} 
            className="guest-button"
            >
                Ingresar como invitado
            </button>
        ) : (
        <div className = "guest-entry">
            <input
                type="text"
                placeholder="Ingresa tu nombre"
                value={nombreInvitado}
                onChange={(e) => setNombreInvitado(e.target.value)}
                className="guest-input"
            />

            <button onClick={ingresarComoInvitado} className="invite-button">
                Ingresar como invitado
            </button>
        </div>
        )}

            <button onClick={iniciarSesionConSpotify} className="spotify-button">
            Ingresar con Spotify
        </button>
    </div>
    );
}

export default Login;
// no funciona en el localhost, pero si en netlify por la direccion de la url
//.trim() -> quita los espacios al principio y al final de la cadena
