const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dateStart: {
    type: Date,
  },
  dateEnd: {
    type: Date,
  },
  unit: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true,
    default: 0
  },
  pricePerOne: {
    type: Number,
    required: true,
    default: 0
  },
  projectId: {
    type: Types.ObjectId, 
    ref: 'Project' 
  }
});

module.exports = model('Works', schema);
