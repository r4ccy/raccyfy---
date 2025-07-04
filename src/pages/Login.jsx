import {usarAutenticacionSpotify} from "../hooks/useSpotifyAuth.js";
import useUserStore from "../store/useUserStore.js";   //no se lo importa con {}; {} -> nombre (algo especifico), sin {} -> todo lo que exporta el archivo
import {useNavigate} from "react-router-dom";
import "./Login.css";

function Login() {
    const {iniciarSesionConSpotify} = usarAutenticacionSpotify();
    const {setGuestName} = useUserStore();
    const navigate = useNavigate();

    const ingresarComoInvitado = () => {
        console.log("posi"); //borrar luego
        setGuestName("Invitado");
        navigate("/home");
    };

return (
    <div className="welcome">
        <h1>hiiii welcome</h1>
        <p>Zzzzz...</p>

        <button onClick={ingresarComoInvitado} className="invite-button">
            Ingresar como invitado
        </button>

        <button onClick={iniciarSesionConSpotify} className="spotify-button">
            Ingresar con Spotify
        </button>
    </div>
    );
}

export default Login;
// no funciona en el localhost, pero si en netlify por la direccion de la url
