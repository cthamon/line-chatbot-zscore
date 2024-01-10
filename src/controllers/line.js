const axios = require('axios')
const { zScore } = require('../functions/zScore')

exports.webhook = async (req, res, next) => {
  console.log(req.body)
  if (req.query.apikey !== process.env['API_KEY']) {
    return 'not from line'
  }

  for (const event of req.body.events) {
    if (event.message.text.split(' ')[0].toLowerCase() === 'zscore') {
        zScore(event.replyToken, event.message.text.split(' ')[1].toUpperCase())
      }
  }
  
  return
}

