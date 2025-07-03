function Login() {
    const handleLogin = () => {
        alert("Login");
        console.log("Login button clicked");
    };

    return (
        <div className="welcome">
            <h1>Welcome to Raccyfy</h1>
            <p>Login :)</p>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;