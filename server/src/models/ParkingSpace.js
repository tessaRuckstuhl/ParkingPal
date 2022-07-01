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
  properties: {
    parking:{
      streetside: {
        type: Boolean,
        default: false
      },
      illuminated: {
        type: Boolean,
        default: false
      },
      e_charging: {
        type: Boolean,
        default: false
      },
      garage: {
        type: Boolean,
        default: false
      }
    }, 
    cancellation_and_access: {
      free_24h_before: {
        type: Boolean,
        default: false
      },
      no_meetup: {
        type: Boolean,
        default: false
      },
      pin: {
        type: Boolean,
        default: false
      },
      security_gate: {
        type: Boolean,
        default: false
      }
    }
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
    // coordinates[0] = lat, coordinates[1]=lng
    coordinates: {
      type: [Number], 
      required: true
    },
  },
  availability: {
    type: [Object],
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
ParkingSpaceSchema.index({location: '2dsphere'});
ParkingSpaceSchema.index({'location.coordinates': '2dsphere'});

const ParkingSpace = mongoose.model('ParkingSpace', ParkingSpaceSchema);
ParkingSpace.createIndexes()

module.exports = ParkingSpace;
