const { ParkingSpace } = require('../models');

module.exports = {
  async createParkingSpace(req, res) {
    try {
      const parkingSpace = await ParkingSpace.create(req.body);
      return res.send(parkingSpace.toJSON());
    } catch (error) {
      console.log(error)
      return res.status(400).send({ error: 'Error when creating a Parking Space' });
    }
  },
  //we will not expose _id to the user therefore we need to delete with location or name
  async deleteParkingSpace(req, res) {
    try {
      const { id } = req.params;
      await ParkingSpace.deleteOne(id);
      return res.status(200).send({success: 'ParkingSpace was deleted'})

    } catch (error) {
      return res.status(500).send({ error: 'Could not remove this ParkingSpace' }); // 'we have an error we don\'t know what to do' })
    }
  },
  async getParkingSpaceById(req, res) {
    try {
      const { id } = req.params;
      const parkingSpace = await ParkingSpace.findById(id);
      return res.send(parkingSpace)
    } catch (error) {
      return res.status(400).send({ error: 'Could not find parkingSpace with this ID' });
    }
  },
  async listParkingSpaces(req, res) {
    try {
      const allParkingSpaces = await ParkingSpace.find();
      return res.send(allParkingSpaces);
    } catch (error) {
      return res.status(400).send({ error: 'There was an error trying to get all parkingSpaces' });
    }
  },
};
