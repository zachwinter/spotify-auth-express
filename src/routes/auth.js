const querystring = require('querystring')

module.exports = app => {
  const { root, spotifyAuthUrl } = app._config

  app.get(`${root}/auth`, ({ query }, res) => {
    const { target, payload, scope } = query

    if (!target) {
      res.status(401)
      res.json({ success: false, error: 'No target supplied.' })
      return
    }

    app._config.target = target
    app._config.payload = payload || app._config.payload
    app._config.scope = scope || app._config.scope

    const string = querystring.stringify({
      response_type: 'code',
      scope: [encodeURIComponent(app._config.scope)],
      state: Math.random().toString(36).slice(5, 11),
      client_id: app._config.id,
      redirect_uri: app._config.redirect
    })
    
    res.redirect(`${spotifyAuthUrl}${string}`)
  })
}