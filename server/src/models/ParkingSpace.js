const mongoose = require('mongoose');
const { Schema } = mongoose;

const ParkingSpaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  }, 
  dayPrice: {
    type: Number,
    required: false
  },
  longTermStayPrice: {
    type: Number,
    required: false
  }
}, {
  timestamps: true
});

const ParkingSpace = mongoose.model('ParkingSpace', ParkingSpaceSchema);

module.exports = ParkingSpace;
