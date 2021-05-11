const axios = require('axios');

const forecast = (location, callback) => { // this should return the localstion

  const url = "http://api.weatherapi.com/v1/current.json?key=0c2baf42f73c48b09e6143550212304&q=" + encodeURIComponent(location) + "&aqi=no" //encodeURIComponent -> zorgt ervoor dat spaties en dergelijke in code zijn omgezet

  axios.get(url)
  .then(function ({ data }) {
    callback(undefined, data.current.temp_c);
  })
  .catch(function (error) {
    callback('This adress could not be found', undefined);
  })
}

module.exports = forecast
