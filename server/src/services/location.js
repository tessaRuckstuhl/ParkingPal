const axios = require('axios');

const url =
  'https://maps.googleapis.com/maps/api/geocode/json?address=Berlin&key=AIzaSyAOBrNc1pHa44FYbGL1hVS6FzJZpOxBmgw';
module.exports = {
  async getLatLngByString(locationString) {
    try {
      const res = await axios.get(url);
      if (res.data.status == 'OK') {
        return res.data.results;
      }
      return res;
    } catch (error) {
      console.error(error);
    }
  },
};
