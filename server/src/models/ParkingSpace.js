const mongoose = require('mongoose');
const { Schema } = mongoose;


const ParkingSpaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  images: {
    type: [String],
    required: false,
  },
  description: {
    type: String,
    required : false
  },
  formattedAddress: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [String,String], 
      required: true
    }
  },
  availability: {
    type: [String,String],
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
