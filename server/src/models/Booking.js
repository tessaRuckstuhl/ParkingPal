const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const BookingSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: {
      unique: true
    }
  },
  owner: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: {
      unique: true
    }
  },
  terms: {
    type: String,
    required: true,
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
  endDate:{
    type: Date,
    required: true,
    trim: true
  }
},

{
  timestamps: true
});


const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
