const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode');
const weather = require('./weather');

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

geocode.geocodeAddress(address, (err, body) => {
  if (err) {
    console.log('Something bad happened...')
  } else {
    weather.getWeather(body.latitude, body.longitude, (err, temp) => {
      if (err) console.log('Oops, what happened here?');
      else console.log(`It's currently ${temp} at ${body._address}.`);
    });
  };
});