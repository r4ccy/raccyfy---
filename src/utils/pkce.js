function base64urlencode(str) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return base64urlencode(digest);
}

export function generateCodeVerifier(length = 128) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let verifier = '';
    for (let i = 0; i < length; i++) {
    verifier += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return verifier;
}

export async function buildSpotifyAuthUrl(clientId, redirectUri) {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("code_verifier", verifier);

    const scopes = [
        "user-read-playback-state",
        "user-read-currently-playing"
    ];

    const scopeParam = scopes.join("%20");

    const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&scope=${scopeParam}&code_challenge_method=S256&code_challenge=${challenge}`;

    return url;
}