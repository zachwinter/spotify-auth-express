const router = require('express').Router()
const request = require('request')
const state = require('../state')

router.get('/', (req, res) => {
  const refresh_code = req.query.code || null
  if (!refresh_code) return res.json({ error: true })
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: refresh_code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
    },
    json: true
  }
  
  request.post(authOptions, (error, { statusCode }, { access_token, refresh_token }) => {
    if (error || statusCode !== 200) return res.json({ error: true })
    if (state.payload === 'cookie') {
      res.cookie('SPOTIFY_ACCESS_TOKEN', access_token)
      res.cookie('SPOTIFY_REFRESH_TOKEN', refresh_token)
      res.cookie('SPOTIFY_REFRESH_CODE', refresh_code)
      res.redirect(state.target)
    } else if (state.payload === 'query') {
      res.redirect(state.target + `?access_token=${access_token}&refresh_token=${refresh_token}&refresh_code=${refresh_code}`)
    }
  })
})

module.exports = router