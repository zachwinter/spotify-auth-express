const express = require('express')
const router = express.Router()
const querystring = require('querystring')
const state = require('../state')

router.get('/', (req, res) => {
  if (!req.query.target) return res.json({ error: true, message: 'No target supplied.' })
  state.target = req.query.target
  state.payload = req.query.payload || 'query'
  const scope = (req.query.scope ? req.query.scope.split(',').join(' ') : null) || 'user-read-email user-read-private'
  const query = querystring.stringify({
    response_type: 'code',
    scope: [scope],
    state: Math.random().toString(36).slice(5, 11),
    client_id: process.env.CLIENT_ID || 'YOUR CLIENT_ID HERE',
    redirect_uri: process.env.REDIRECT_URI || 'YOUR REDIRECT_URI HERE',
  })
  res.redirect('https://accounts.spotify.com/authorize?' + query)
})

module.exports = router