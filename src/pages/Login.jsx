import React from "react";
import useUserStore from "../store/useUserStore.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import { buildSpotifyAuthUrl } from "../utils/pkce.js";

function Login() {
    const { setGuestName } = useUserStore();
    const navigate = useNavigate();
    const [mostrarInput, setMostrarInput] = useState(false);
    const [nombreInvitado, setNombreInvitado] = useState("");

    const handleLogin = async () => {
        const clientId = "e083c518971545e686864f2cb358988b";
        const redirectUri = "https://zippy-unicorn-dcb83e.netlify.app/callback";

        const authUrl = await buildSpotifyAuthUrl(clientId, redirectUri);
        window.location.href = authUrl;
    };

    const ingresarComoInvitado = () => {
        if (nombreInvitado.trim() === "") {
            alert("Por favor, ingresa tu nombre.");
            return;
        }
        setGuestName(nombreInvitado.trim());
        navigate("/home");
    };

    return (
        <div className="welcome">
            <div className="login-box">
                <h1 className="title">🎧 Bienvenid@ a Raccyfy</h1>
                <p className="subtitle">Tu línea del tiempo musical personalizada</p>

                {!mostrarInput ? (
                    <button
                        onClick={() => setMostrarInput(true)}
                        className="guest-button fade-in"
                    >
                        Ingresar como invitado
                    </button>
                ) : (
                    <div className="guest-entry slide-up">
                        <input
                            type="text"
                            placeholder="Ingresa tu nombre"
                            value={nombreInvitado}
                            onChange={(e) => setNombreInvitado(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") ingresarComoInvitado();
                            }}
                            className="guest-input"
                        />
                        <button
                            onClick={ingresarComoInvitado}
                            className={`invite-button ${nombreInvitado.trim() ? "activo" : ""}`}
                        >
                            Ingresar como invitado
                        </button>
                    </div>
                )}

                <div className="separator">o</div>

                <button onClick={handleLogin} className="spotify-button bounce">
                    Ingresar con Spotify
                </button>
            </div>
        </div>
    );
}

export default Login;
