
# spotify-auth-express
> Plug-and-play Spotify OAUTH flow for Express.

```js
const spotify = require('spotify-auth-express')

// Instantiate and initialize a new Express API.
const app = spotify({
  client: 'CLIENT_ID_HERE',
  secret: 'CLIENT_SECRET_HERE'
})

// Extend an existing Express API.
const express = require('express')
const spotify = require('spotify-auth-express')

const app = express()

spotify({
  app,
  client: 'CLIENT_ID_HERE',
  secret: 'CLIENT_SECRET_HERE'
})

app.listen(...)

/**

app.get('/spotify/auth', (req, res) => {
   ...
   res.redirect('YOUR_REDIRECT_URL')
})

*/
```

### Configuration

The following optional keys can be passed in addition to your application & client IDs:

* app | `express application instance` | default: `null`
* scope | `String` | default: `'streaming user-read-email user-read-private user read-playback-state user-modify-playback-state'`
* port | `Number` | default: `6868`
* payload | `String` | default: `'COOKIE'` / `'QUERY_PARAM'` | default: `'COOKIE'`
* setCrossOrigin | `Boolean` | default: `true`
* crossOrigin | `String` | default: `'*'` 
* root | `String` | default: `'/spotify'`
* intialize | `Boolean` | default: `false`
* gzip | `Boolean` | default: true`
* redirect | `String` | default: \``http://localhost:${config.port || DEFAUL_PORT}${config.root || DEFAULT_ROOT}${config.redirect || DEFAULT_REDIRECT}`
* accessTokenKey | `String` |  default: \``SPOTIFY_ACCESS_TOKEN`\`,
* refreshTokenKey | `String` | default: \``SPOTIFY_REFRESH_TOKEN`'`,
* spotifyAuthUrl | `String` | defailt: `https://accounts.spotify.com/authorize?`
* spotifyTokenUrl | `String` | default: `https://accounts.spotify.com/api/token`