const axios = require('axios');

const url =
  'https://maps.googleapis.com/maps/api/geocode/json';
module.exports = {
  async getLatLngByString(locationString) {
    try {
      const res = await axios.get(url,{ params: {address: locationString, key: process.env.GOOGLE_MAPS_API_KEY}});
      if (res.data.results) {
        return res.data.results;
      } 
      throw 'something went wrong...'
    } catch (error) {
      console.error(error);
    }
  },
};
