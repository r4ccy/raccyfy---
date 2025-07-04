import {usarAutenticacionSpotify} from "../hooks/useSpotifyAuth.js";
import {useUserStore} from "../store/useUserStore.js";

function Login() {
    const {iniciarSesionConSpotify} = usarAutenticacionSpotify();
    const {setGuestName} = useUserStore();

    const ingresarComoInvitado = () => {
        setGuestName("Invitado");
        window.location.href = "/";
    };

return (
    <div className="welcome">
        <h1>Bienvenida a Raccyfy</h1>
        <p>¡Hola! Elegí cómo querés ingresar 🎧</p>

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
