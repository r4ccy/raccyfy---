function Login() {
    const CLIENT_ID = "e083c518971545e686864f2cb358988b";
    const REDIRECT_URI = "https://zippy-unicorn-dcb83e.netlify.app/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    const SCOPES = [
        "user-read-private",
        "user-read-email",
        "user-top-read"
    ].join(" ");

    const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;

    const handleSpotifyLogin = () => {
        window.location.href = loginUrl;
    };

    const handleLogin = () => {
        alert("Login");
        console.log("Clicked");
    };

    return (
    <div className="welcome">
        <h1>Welcome to Raccyfy</h1>
        <p>Login :)</p>

        <button onClick={handleLogin}>Login :p</button>

        <button onClick={handleSpotifyLogin} className="spotify-button">
        Iniciar con Spotify...
        </button>
    </div>
    );
}

export default Login;
