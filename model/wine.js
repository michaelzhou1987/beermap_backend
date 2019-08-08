const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const obj = {
  name: String,
  brewery: String,
  type: String,
  region: String,
  date: Number,
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
  latitude: String,
  longitude: String,
  city: String,
  state: String,
  country: String
};

const __Schema = new Schema(obj);
const __Model = mongoose.model('Wine', __Schema);

module.exports = __Model;
