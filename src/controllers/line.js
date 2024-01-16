const axios = require('axios')
const { zScore, resError } = require('../functions/zScore')
const { test } = require('../functions/test')

exports.test = async (req, res, next) => {
  res.send("yoyo")
}

exports.webhook = async (req, res, next) => {
  // test();
  if (req.query.apikey !== process.env['API_KEY']) {
    return 'not from line'
  }
  
  for (const event of req.body.events) {
    if (event.message.text.split(' ').length === 1) {
      zScore(event.replyToken, event.message.text.split(' ')[0].toUpperCase())
    } else if (event.message.text.split(' ')[0].toLowerCase() === 'zscore') {
      zScore(event.replyToken, event.message.text.split(' ')[1].toUpperCase())
    } else {
      resError(event.replyToken)
    }
  }

  return
}

