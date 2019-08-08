const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const obj = {
  name: {
    type: String,
    required: true
  },
  breweryId: {
    type: ObjectId,
    ref: 'Brewery'
  },
  breweryName: {
    type: String,
    required: true
  },
  type: String,
  region: String,
  date: String,
  rate: Number,
  price: String,
  recommand: String,
  description: String,
  keyNotes: [String],
  comments: [
    {
      type: ObjectId,
      ref: 'Comment'
    }
  ],
  location: String,
  thumbnail: String,
  images: [String],
  user: {
    type: ObjectId,
    ref: 'User'
  },
  peers: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  latitude: String,
  longitude: String,
  city: String,
  state: String,
  country: String
};

const __Schema = new Schema(obj);
const __Model = mongoose.model('Beer', __Schema);

module.exports = __Model;