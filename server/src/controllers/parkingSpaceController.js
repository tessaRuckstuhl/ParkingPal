const { ParkingSpace } = require('../models');

module.exports = {
  async addParkingSpace(req, res) {
    try {
        const newParkingSpace = await ParkingSpace.create(req.body);
        
        return res.status(200).send('ParkingSpace added!')      
    } catch (error) {
        return res.status(400).send({ error : 'Error when creating a Parking Space'});
    }
  },
  //we will not expose _id to the user therefore we need to delete with location or name
  async removeParkingSpace(req, res) {
    try {
      ParkingSpace.deleteOne(req.body.id)
     
    } catch (error) {
      return res.status(500).send({ error : 'Could not remove this ParkingSpace' });// 'we have an error we don\'t know what to do' })
    }
  },
  async getParkingSpace(req, res) {
    try {
      ParkingSpace.findById(req.body.id)
    }
    catch (error) {
      return res.status(400).send({ error: 'Could not find parkingSpace with this ID'});
    }

  },

  async getAllParkingSpaces(req, res) {
    try {
      ParkingSpace.find().then(() => res.json('All ParkingSpaces returned!'))
    }
    catch (error) {
      return res.status(400).send({ error: 'There was an error trying to get all parkingSpaces' });
    }


}
};
