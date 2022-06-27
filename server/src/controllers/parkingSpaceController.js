const { ParkingSpace } = require('../models');
const { getLatLngByString } = require('../services/location');
module.exports = {
  async createParkingSpace(req, res) {
    try {
      console.log(req.body)
      const parkingSpace = await ParkingSpace.create(req.body);
      return res.send(parkingSpace.toJSON());
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: 'Error when creating a Parking Space' });
    }
  },
  //we will not expose _id to the user therefore we need to delete with location or name
  async deleteParkingSpace(req, res) {
    try {
      const { id } = req.params;
      await ParkingSpace.deleteOne(id);
      return res.status(200).send({ success: 'ParkingSpace was deleted' });
    } catch (error) {
      return res.status(500).send({ error: 'Could not remove this ParkingSpace' }); // 'we have an error we don\'t know what to do' })
    }
  },
  async getParkingSpaceById(req, res) {
    try {
      const { id } = req.params;
      const parkingSpace = await ParkingSpace.findById(id);
      return res.send(parkingSpace);
    } catch (error) {
      return res.status(400).send({ error: 'Could not find parkingSpace with this ID' });
    }
  },
  async listParkingSpaces(req, res) {
    try {
      const { formattedAddress, basePrice, dayPrice, radius } = req.query;
      console.log(req.query)
      // build query from filter configurations...
      let mongoQuery = {};

      if (formattedAddress) {
        const locationGeoCoded = await getLatLngByString(formattedAddress);
        if(locationGeoCoded[0]){
          const lat = locationGeoCoded[0].geometry.location.lat;
          const lng = locationGeoCoded[0].geometry.location.lng;
  
          mongoQuery.location = {
            $near: {
              $geometry: { type: 'Point', coordinates: [lat, lng] },
              $maxDistance: radius ? radius * 1000: 10000, // search within a readius of 5 km, else within specified radius
            },
          };
        } else {
          throw 'Not a valid location string'
        }       
      }
      if (basePrice) {
        mongoQuery.basePrice = { $gt: parseInt(basePrice[0]), $lt: parseInt(basePrice[1]) };
      }
      if (dayPrice) {
        mongoQuery.dayPrice = { $gt: parseInt(dayPrice[0]), $lt: parseInt(dayPrice[1]) };
      }
      const allParkingSpaces = await ParkingSpace.find({
        ...mongoQuery,
      });
      console.log(allParkingSpaces.length);
      return res.send(allParkingSpaces);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: 'There was an error trying to get all parkingSpaces' });
    }
  },
};
