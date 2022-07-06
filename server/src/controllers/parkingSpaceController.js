const { ParkingSpace } = require('../models');
const { getLatLngByString } = require('../services/location');
const { toIsoString } = require('../services/toIsoString');
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
      const { formattedAddress, basePrice, dayPrice, longTermStayPrice, radius, from, to } =
        req.query;
      // console.log('REQUEST QUERY', req.query);
      // create copy, in js objects are passed and assigned by reference thus modifying the same if not copied correctly
      // deleting object so properties can be filtered in final step
      const query = Object.assign({}, req.query);
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
      if (from && to) {
        mongoQuery.availability = {
          $elemMatch: {
            from: { $lte: toIsoString(new Date(from)) },
            to: { $gte: toIsoString(new Date(to)) },
          },
        };
      } else if (from) {
        mongoQuery.availability = {
          $elemMatch: { from: { $lte: toIsoString(new Date(from)) } },
        };
      } else if (to) {
        mongoQuery.availability = {
          $elemMatch: { to: { $gte: toIsoString(new Date(to)) } },
        };
      }
      // build parking space features filter
      Object.keys(query).map((key, index) => {
        if (query[key] === 'true') {
          return (mongoQuery[key] = true);
        }
      });
      // console.log('MONGO QUERY BUILT: ', JSON.stringify(mongoQuery), { ...mongoQuery });
      const allParkingSpaces = await ParkingSpace.find({
        ...mongoQuery,
      });
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
