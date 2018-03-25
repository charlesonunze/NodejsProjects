const request = require('request');

module.exports.geocodeAddress = (address, callback) => {
  request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) callback(undefined, {
      latitude: body.results[0].geometry.location.lat,
      longitude: body.results[0].geometry.location.lng,
      _address: body.results[0].formatted_address
    });
    else callback('error!!!!');
  })
}