const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const obj = {
  date: Number,
  author: {
    type: ObjectId,
    ref: 'User'
  },
  content: String,
  item: {
    type: ObjectId,
    refs: ['Beer', 'Wine']
  }
};

const __Schema = new Schema(obj, {
  timestamps: true
});
const __Model = mongoose.model('Comment', __Schema);

module.exports = __Model;