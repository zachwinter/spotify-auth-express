const axios = require('axios')
const querystring = require('querystring')

module.exports = app => {
  const {
    root, 
    accessTokenKey, 
    refreshTokenKey,
    spotifyTokenUrl
  } = app._config

  app.get(`${root}/callback`, async (req, res) => {
    const { code } = req.query

    if (!code) {
      res.status(401)
      res.json({ success: false, error: 'No refresh code was provided. '})
      return
    }

    try {
      const { id, secret, redirect } = app._config
      const { data } = await axios({
        method: 'post',
        url: spotifyTokenUrl,
        headers: { 
          Authorization: 'Basic ' + new Buffer(`${id}:${secret}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
          code,
          redirect_uri: redirect,
          grant_type: 'authorization_code'
        })
      })

      const { access_token, refresh_token } = data
      const { target } = app._config
      res.cookie(accessTokenKey, access_token)
      res.cookie(refreshTokenKey, refresh_token)
      res.redirect(target)
    } catch (error) {
      res.status(401)
      res.json({ success: false, error })
    }
  })
}