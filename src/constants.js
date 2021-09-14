const COOKIE = 'COOKIE'
const QUERY_PARAM = 'QUERY_PARAM'
const PROJECT_NAME = 'spotify-auth'
const DEFAULT_PAYLOAD = COOKIE
const DEFAULT_SCOPE = 'streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state'
const DEFAULT_PORT = 6868
const DEFAULT_ROOT = '/spotify'
const DEFAULT_REDIRECT = '/callback'
const DEFAULT_CROSS_ORIGIN = '*'
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize?'
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const DEFAULT_REFRESH_TOKEN_KEY = 'SPOTIFY_REFRESH_TOKEN'
const DEFAULT_ACCESS_TOKEN_KEY = 'SPOTIFY_ACCESS_TOKEN'

module.exports = {
  COOKIE,
  QUERY_PARAM,
  PROJECT_NAME,
  DEFAULT_PAYLOAD,
  DEFAULT_SCOPE,
  DEFAULT_PORT,
  DEFAULT_ROOT,
  DEFAULT_CROSS_ORIGIN,
  DEFAULT_REDIRECT,
  SPOTIFY_AUTH_URL,
  SPOTIFY_TOKEN_URL,
  DEFAULT_ACCESS_TOKEN_KEY,
  DEFAULT_REFRESH_TOKEN_KEY
}