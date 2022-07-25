const { ParkingSpace } = require('../models');
const { getLatLngByString } = require('../services/location');
const { toIsoString } = require('../services/toIsoString');
const mongoose = require('mongoose');

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
    const { id } = req.params;
    const update = req.body;
    try {
      const parkingSpace = await ParkingSpace.findOneAndUpdate(
        { _id: id },
        { ...update },
        { new: true }
      );
      return res.send(parkingSpace);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: 'Error when updating a Parking Space' });
    }
  },
  //we will not expose _id to the user therefore we need to delete with location or name
  async deleteParkingSpace(req, res) {
    try {
      const { id } = req.params;
      await ParkingSpace.deleteOne({ _id: mongoose.Types.ObjectId(id) });
      return res.status(200).send({ success: 'ParkingSpace was deleted ' });
    } catch (error) {
      console.log(error);
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
      const allParkingSpaces = await ParkingSpace.find({});
      return res.send(allParkingSpaces);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: 'There was an error trying to get all parkingSpaces' });
    }
  },
  async filterParkingSpaces(req, res) {
    try {
      const { formattedAddress, basePrice, dayPrice, longTermStayPrice, radius, from, to, size } =
        req.query;

      // console.log('REQUEST QUERY', req.query);
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
          throw 'Please enter a valid location';
        }
      }
      // build price filter
      if (basePrice) {
        mongoQuery.basePrice = { $gte: parseInt(basePrice[0]), $lte: parseInt(basePrice[1]) };
        delete query.basePrice;
      }
      if (dayPrice) {
        mongoQuery.dayPrice = { $gte: parseInt(dayPrice[0]), $lte: parseInt(dayPrice[1]) };
        delete query.dayPrice;
      }
      if (longTermStayPrice) {
        mongoQuery.longTermStayPrice = {
          $gte: parseInt(longTermStayPrice[0]),
          $lte: parseInt(longTermStayPrice[1]),
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

      if (size) {
        mongoQuery.size = {
          $gte: parseInt(size[0]),
          $lte: parseInt(size[1]),
        };
      }
      // build parking space features filter from remaining keys...
      Object.keys(query).map((key, index) => {
        if (query[key] === 'true') {
          return (mongoQuery[key] = true);
        }
      });
      console.log('DB QUERY', JSON.stringify(mongoQuery));
      console.log('***\n***');
      console.log(JSON.stringify(query));
      // sorting by id so results appear in same order, also after filtering...
      const allParkingSpaces = await ParkingSpace.find({
        ...mongoQuery,
      }).sort({ _id: -1 });
      return res.send(allParkingSpaces);
    } catch (error) {
      return res
        .status(400)
        .send({ error: error || 'There was an error trying to get all parkingSpaces' });
    }
  },
  async listOwnedParkingSpaces(req, res) {
    const { id } = req.params;
    if (id) {
      const allParkingSpaces = await ParkingSpace.find({
        owner: mongoose.Types.ObjectId(id),
      }).sort({ _id: -1 });
      return res.send(allParkingSpaces);
    } else {
      return res
        .status(400)
        .send({ error: 'There was an error trying to get owner parking spaces' });
    }
  },
  // find max day price, base price, ... for filters

  async getFilterConstraints(req, res) {
    try {
      const maxDayPrice = await ParkingSpace.find({}, { dayPrice: 1, _id: 0 })
        .sort({ dayPrice: -1 })
        .limit(1); // for MAX
      const maxLongTermStayPrice = await ParkingSpace.find({}, { longTermStayPrice: 1, _id: 0 })
        .sort({ longTermStayPrice: -1 })
        .limit(1); // for MAX
      const maxBasePrice = await ParkingSpace.find({}, { basePrice: 1, _id: 0 })
        .sort({ basePrice: -1 })
        .limit(1); // for MAX
      return res.send({
        maxDayPrice: maxDayPrice[0].dayPrice,
        maxLongTermStayPrice: maxLongTermStayPrice[0].longTermStayPrice,
        maxBasePrice: maxBasePrice[0].basePrice,
      });
    } catch (error) {
      return res
        .status(400)
        .send({ error: 'There was an error trying to get owner parking spaces' });
    }
  },
};
