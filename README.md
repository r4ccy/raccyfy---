# Raccyfy

Clon interactivo de Spotify con reproductor animado y funcionalidad exclusiva de líneas de tiempo musical.

## Funcionalidad destacada
Interfaz tipo Spotify con reproductor animado. 

Líneas de Tiempo Musical: Visualización interactiva de tu evolución musical a ñpartir de artistas, géneros y canciones favoritas a lo largo del tiempo.

## Tecnologías
### Frontend
- React + Vite
- JavaScript
- CSS

### Gestión de estado
- Zustand <!--(gestión ligera de estado)-->

### Datos musicales
- Spotify Web API
- Axios para peticiones HTTP

### Visualización
- Recharts <!--(gráficos interactivos)-->

### Calidad de código
- Prettier <!--(formateo automático)-->
- ESLint <!--(linting)-->

## Cómo ejecutarlo
```bash
git clone https://github.com/r4ccy/raccyfy---.git
cd raccyfy
npm install
npm run dev
```

## Sitio en producción
https://zippy-unicorn-dcb83e.netlify.app

## Seguridad en la autenticación

Este proyecto utiliza **OAuth 2.0 con PKCE (Proof Key for Code Exchange)** para el inicio de sesión con Spotify, lo que garantiza una mayor seguridad sin necesidad de exponer secretos del cliente.

### ¿Por qué PKCE?

PKCE protege las aplicaciones frontend al evitar ataques de interceptación del código de autorización.

### ¿Cómo funciona?

1. Se genera un code_verifier (una cadena aleatoria segura).
2. Se transforma en un code_challenge usando SHA256.
3. Se redirige al login de Spotify con ese challenge.
4. Luego del login, Spotify devuelve un code.
5. Este code se intercambia por un token usando el code_verifier.
