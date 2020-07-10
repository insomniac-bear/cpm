const {Schema, model} = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  dateStart: {
    type: Date,
    required: true
  },
  dateEnd: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

module.exports = model('Project', schema);
