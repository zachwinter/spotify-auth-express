const express = require('express')
const compression = require('compression')
const routes = require('./routes')
const {
  DEFAULT_SCOPE, 
  DEFAULT_PORT, 
  DEFAULT_PAYLOAD,
  DEFAULT_ROOT,
  DEFAULT_CROSS_ORIGIN,
  DEFAULT_REDIRECT,
  DEFAULT_REFRESH_TOKEN_KEY,
  DEFAULT_ACCESS_TOKEN_KEY,
  SPOTIFY_AUTH_URL,
  SPOTIFY_TOKEN_URL
} = require('./constants')

module.exports = (config = {}) => {
  const { id, secret, app: initialize } = config

  if (!id || !secret) throw new Error('Client ID and Client Secret are both required.')

  const app = config.app || express()

  app._config = {
    app: null,
    scope: DEFAULT_SCOPE,
    port: process.env.PORT || DEFAULT_PORT,
    payload: DEFAULT_PAYLOAD,
    setCrossOrigin: true,
    crossOrigin: DEFAULT_CROSS_ORIGIN,
    root: DEFAULT_ROOT,
    initialize,
    gzip: true,
    redirect: `http://localhost:${config.port || DEFAULT_PORT}${config.root || DEFAULT_ROOT}${config.redirect || DEFAULT_REDIRECT}`,
    accessTokenKey: DEFAULT_ACCESS_TOKEN_KEY,
    refreshTokenKey: DEFAULT_REFRESH_TOKEN_KEY,
    spotifyAuthUrl: SPOTIFY_AUTH_URL,
    spotifyTokenUrl: SPOTIFY_TOKEN_URL,
    ...config
  }

  console.log('\n\nSERVER CONFIGURATION:\n')
  console.log(app._config)
  console.log('\n\n')

  const { gzip, setCrossOrigin, crossOrigin, } = app._config

  if (gzip) app.use(compression())

  if (setCrossOrigin) {
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', crossOrigin)
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    }) 
  }

  Object.keys(routes).forEach(key => routes[key](app))
  
  if (app._config.initialize) app.listen(app._config.port, () => console.log(`Server listening on port ${app._config.port}`))

  return app
}