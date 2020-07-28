# spotify-auth
> A simple Spotify authentication microservice.

With `spotify-auth`, you no longer have to concern yourself with Spotify's OAUTH authentication flow when prototyping applications that leverage the Spotify API. `spotify-auth` runs as a tiny standalone server and exposes a single endpoint for authenticating with Spotify within any application.

> `spotify-auth` is meant for local development / prototyping. 

## Local Installation

1. Create a new Spotify app in your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
2. Note your app's `Client ID` and `Client Secret`, then add `http://localhost:7768/callback` to your app's Redirect URIs. 
3. Clone this repository, then create a file named `.env` in the project's root directory with the following values:

```bash
CLIENT_ID=YOUR_CLIENT_ID_HERE
CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
REDIRECT_URI=http://localhost:7768/callback
```

4. Install and serve using NPM.

```bash
npm i
npm run start
```

## Usage

Within the application that you're authenticating, programatically navigate to the `/auth` route of the microservice. The following query parameters are available:

* `target` (required) – a URL; once the authentication flow is complete, the page you'll be redirected to
* `payload` (query | cookie) – how you'd like to expose tokens to the page; either by query parameters or cookies (default: `cookie`)
* `scope` – a comma-delimited list of [API authorization scopes](https://developer.spotify.com/documentation/general/guides/scopes/) (default: `user-read-email,user-read-private`)

The simplest example would be to initiate the auth flow and return to the current page.
```javascript
window.location.href = `http://localhost:7768/auth?target=${window.location.href}`
```
Once redirected, the page will now have access to two cookies: `SPOTIFY_ACCESS_TOKEN` and `SPOTIFY_REFRESH_TOKEN`, enabling access to whichever Spotify API you're interested in consuming. 

When your access token expires (you'll receieve a `401` error from the Spotify API), you can get a new token by passing your refresh token as a query parameter to the `/refresh` route of the microservice. 

```javascript
const { access_token } = await fetch(`http://localhost:7768/refresh?token=${yourRefreshToken}`).then(res => res.json())
```