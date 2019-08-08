const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const obj = {
  email: {
    type: String,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  prefix: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  avatar: {
    type: String,
    required: false
  },
  beers: [{
    type: ObjectId,
    ref: 'Beer'
  }],
  wines: {
    type: ObjectId,
    ref: 'Wine'
  },
  role: {
    type: String,
    required: false
  }
};

const userSchema = new Schema(obj);
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
