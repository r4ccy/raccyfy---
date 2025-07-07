import {generateCodeChallenge, generateCodeVerifier} from "../utils/pkce";

export function usarAutenticacionSpotify() {
  const CLIENTE_ID = "e083c518971545e686864f2cb358988b";
  const REDIRECCION = "https://zippy-unicorn-dcb83e.netlify.app/callback";
  const SCOPES = [
    "user-read-private",
    "user-read-email",
    "user-top-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-library-read"
  ].join(" ");

  const iniciarSesionConSpotify = async () => {
    const verificador = generateCodeVerifier();
    const desafio = await generateCodeChallenge(verificador);

    localStorage.setItem("code_verifier", verificador);

    const urlDeLogin = `https://accounts.spotify.com/authorize?client_id=${CLIENTE_ID}&response_type=code&redirect_uri=${encodeURIComponent(
      REDIRECCION
    )}&scope=${encodeURIComponent(
      SCOPES
    )}&code_challenge_method=S256&code_challenge=${desafio}`;

    window.location.href = urlDeLogin;
  };

  return { iniciarSesionConSpotify };
}
