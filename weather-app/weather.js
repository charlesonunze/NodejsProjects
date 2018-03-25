const request = require('request');
const apiKey = '5523f97ce7a3171c2398d7502e97c0e3';

module.exports.getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`,
    json: true
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) callback(undefined, body.currently.temperature);
    else callback(err);
  })
}