const { ParkingSpace } = require('../models');
const { getLatLngByString } = require('../services/location');
module.exports = {
  async createParkingSpace(req, res) {
    try {
      console.log(req.body);
      const parkingSpace = await ParkingSpace.create(req.body);
      return res.send(parkingSpace.toJSON());
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: 'Error when creating a Parking Space' });
    }
  },
  //not tested but should work
  async updateParkingSpace(req, res) {
    try {
      console.log(req.body);
      const parkingSpace = await ParkingSpace.update({name: req.body.parkingSpaceName},{$set: req.body});
      return res.send(parkingSpace.toJSON());
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: 'Error when updating a Parking Space' });
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
      const { formattedAddress, basePrice, dayPrice, longTermStayPrice, radius, availability } =
        req.query;
      // create copy, in js objects are passed and assigned by reference thus modifying the same if not copied correctly
      // deleting object so properties can be filtered in final step
      const query = Object.assign({}, req.query);
      // console.log('FILTER CONFIG FROM USER: ', req.query);
      // build query from filter configurations...
      let mongoQuery = {};

      // build address + radius filter
      if (formattedAddress) {
        const locationGeoCoded = await getLatLngByString(formattedAddress);
        if (locationGeoCoded[0]) {
          const lat = locationGeoCoded[0].geometry.location.lat;
          const lng = locationGeoCoded[0].geometry.location.lng;

          mongoQuery.location = {
            $near: {
              $geometry: { type: 'Point', coordinates: [lat, lng] },
              $maxDistance: radius ? radius * 1000 : 10000, // search within a readius of 10 km, else within specified radius
            },
          };
          delete query.formattedAddress;
          delete query.radius;
        } else {
          throw 'Not a valid location string';
        }
      }
      // build price filter
      if (basePrice) {
        mongoQuery.basePrice = { $gt: parseInt(basePrice[0]), $lt: parseInt(basePrice[1]) };
        delete query.basePrice;
        console.log(query, '*** passed one:', req.query);
      }
      if (dayPrice) {
        mongoQuery.dayPrice = { $gt: parseInt(dayPrice[0]), $lt: parseInt(dayPrice[1]) };
        delete query.dayPrice;
      }
      if (longTermStayPrice) {
        mongoQuery.longTermStayPrice = {
          $gt: parseInt(longTermStayPrice[0]),
          $lt: parseInt(longTermStayPrice[1]),
        };
        delete query.longTermStayPrice;
      }
      // build availability filter
      // ...TODO
      // build parking space features filter
      Object.keys(query).map((key, index) => {
        // convert to boolean, omit false values...
        if(query[key] === 'true'){
          return (mongoQuery[key] = true);

        }
      });
      // console.log('MODIFIED QUERY', query);

      // console.log('MONGO QUERY BUILT: ', JSON.stringify(mongoQuery));
      const allParkingSpaces = await ParkingSpace.find({
        ...mongoQuery,
      });
      console.log('Found ', allParkingSpaces.length, ' matching results...');
      return res.send(allParkingSpaces);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: 'There was an error trying to get all parkingSpaces' });
    }
  },
  async getFilterConstraints(req, res) {
    // find max day price, base price, ... for filters
  },
};
