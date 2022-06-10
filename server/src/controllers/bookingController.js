const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Booking } = require('../models');

function jwtSignUser(user) {
  const ONE_WEEK = 7 * 24 * 60 * 60;
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK
  });
}

module.exports = {
  async createBooking(req, res) {
    try {
      const booking = await Booking.create(req.body);
      return res.send(booking.toJSON());
    } catch (error) {
      console.log(error)
      return res.status(400).send({ error: 'Error when creating a booking' });
    }
  },
  async getBookingById(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.findById(id);
      return res.send(booking)
    } catch (error) {
      return res.status(400).send({ error: 'Could not find booking with this ID' });
    }
  },

  async updateById(req, res) {
    const {id} = req.params;
    const update = req.body;
    try {
      const updatedUser = await User.findOneAndUpdate({_id: id}, {...update}, {new:true})
      const userObjJson = updatedUser.toJSON();
      return res.send({
        user: userObjJson,
      });
    } catch (error) {
      return res.status(400).send({ error: 'something is wrong' });
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
  }


};
