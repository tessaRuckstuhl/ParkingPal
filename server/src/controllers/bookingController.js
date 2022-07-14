const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User } = require('../models');
const { Booking } = require('../models');

module.exports = {
  async createBooking(req, res) {
    try {
      const booking = await Booking.create(req.body);
      return res.send(booking.toJSON());
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: 'Error when creating a booking' });
    }
  },
  async getBookingById(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.findById(id);
      return res.send(booking);
    } catch (error) {
      return res.status(400).send({ error: 'Could not find booking with this ID' });
    }
  },

  async deleteBooking(req, res) {
    try {
      const { id } = req.params;
      await Booking.deleteOne(id);
      return res.status(200).send({ success: 'Booking was deleted' });
    } catch (error) {
      return res.status(500).send({ error: 'Could not remove this Booking' });
    }
  },

  async updateBookingById(req, res) {
    console.log(req.params, req.body)
    const { id } = req.params;
    const update = req.body;
    try {
      const updatedBooking = await Booking.findOneAndUpdate(
        { _id: id },
        { ...update },
        { new: true }
      );
      const bookingObjJson = updatedBooking.toJSON();
      return res.send({
        booking: bookingObjJson,
      });
    } catch (error) {
      return res.status(400).send({ error: 'something is wrong' });
    }
  },

  async listBookings(req, res) {
    const { guestId } = req.query;
    try {
      if (guestId) {
        const allBookings = await Booking.find({
          guest: mongoose.Types.ObjectId(guestId),
        }).sort({ _id: -1 });
        return res.send(allBookings);
      } else {
        const allBookings = await Booking.find({}).sort({ _id: -1 });
        return res.send(allBookings);
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: 'something is wrong' });
    }
  },
};
