import { useEffect } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

function Callback() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { setToken } = useUserStore();

    useEffect(() => {
        const code = params.get("code");
        const codeVerifier = localStorage.getItem("code_verifier");

        if (!code || !codeVerifier) return;

        const obtenerToken = async () => {
            const body = new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: "https://zippy-unicorn-dcb83e.netlify.app/",
                client_id: "e083c518971545e686864f2cb358988b",
                code_verifier: codeVerifier,
            });

            const res = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body,
            });

            const data = await res.json();
            if (data.access_token) {
                setToken(data.access_token);
                navigate("/home");
            } else {
                console.error("Error al obtener el token:", data);
            }
        };

        obtenerToken();
    }, []);

    return (
        <div>
            <h1>Callback</h1>
            <p>Procesando...espere</p>
        </div>
    );
}

export default Callback;

// click en login con spotify -> redirige a spotify -> spotify redirige a callback con el code -> callback obtiene el token y lo guarda en el store -> redirige a home
