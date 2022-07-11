const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const BookingSchema = new Schema({
  parkingSpace: {
    type: Schema.Types.ObjectId,
    ref: 'ParkingSpace',
    required: true,
  },
  guest: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  terms: {
    type: String,
    trim: true
  },
  issueDate: {
    type: Date,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true,
    trim: true
  },
  endDate: {
    type: Date,
    required: true,
    trim: true
  },
  price: {
    type: Number, 
    trim: true
  }
},

  {
    timestamps: true
  });


const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
