const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const obj = {
  name: String,
  beers: [
    {
      type: ObjectId,
      ref: 'Beer'
    }
  ],
  address: String,
  latitude: String,
  longitude: String,
  city: String,
  state: String,
  country: String
};

const __Schema = new Schema(obj);
const __Model = mongoose.model('Brewery', __Schema);

module.exports = __Model;

