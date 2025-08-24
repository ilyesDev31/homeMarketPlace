const geocoder = require("node-geocoder");
const options = {
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const nodegeocoder = geocoder(options);

module.exports = nodegeocoder;
