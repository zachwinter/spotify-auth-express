const axios = require('axios')
const querystring = require('querystring')

module.exports = app => {
  const { root, id, secret, spotifyTokenUrl } = app._config

  app.get(`${root}/refresh`, async (req, res) => {
    const { token } = req.query

    if (!token) {
      res.status(401)
      res.json({ success: false, error: 'No token supplied.' })
      return
    }

    try {
      const { data } = await axios({
        method: 'post',
        url: spotifyTokenUrl,
        headers: { 
          Authorization: 'Basic ' + new Buffer(`${id}:${secret}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
          refresh_token: token,
          grant_type: 'refresh_token'
        })
      })

      const { access_token } = data
      res.status(200)
      res.json({ success: true, access_token })
    } catch (e) {
      console.log(e)
      res.status(401)
      res.json({ success: false, error: 'Could not refresh token.' })
    }
  })
}