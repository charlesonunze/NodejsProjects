const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      describe: 'Address to fetch weather for',
      alias: 'address',
      string: true,
      demand: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const address = argv.a;

axios.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${address}`)
  .then((response) => {

    if (response.data.status === 'ZERO_RESULTS') throw new new Error('Unable to find that address...');

    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const _address = response.data.results[0].formatted_address;
    console.log(`Your current location is ${_address}.`);

    const apiKey = '5523f97ce7a3171c2398d7502e97c0e3';
    const weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`;
    return axios.get(weatherUrl);
  })
  .then((response) => {
    console.log(`The temperature is ${response.data.currently.temperature} degrees.`);
  })
  .catch((e) => {
    if (e.code === 'ENOTFOUND') console.log('Unable to connect to API servers...');
    else console.log(e.message);
  })


B935EWRAAEPSQR - 5309120