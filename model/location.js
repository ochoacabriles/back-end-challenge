const mongoose = require('mongoose')

// Location Schema
const LocationSchema = new mongoose.Schema({
  name: String,
  type: String,
  dimension: String,
  residents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
  created: Date
})

module.exports = mongoose.model('Location', LocationSchema)