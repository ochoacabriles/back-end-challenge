const mongoose = require('mongoose')
const Location = require('./location')
const Episode = require('./episode')

// Character Schema
const CharacterSchema = new mongoose.Schema({
  name: String,
  status: String,
  species: String,
  type: String,
  gender: String,
  origin: {type: mongoose.Schema.Types.ObjectId, ref: 'Location'},
  location: {type: mongoose.Schema.Types.ObjectId, ref: 'Location'},
  image: String,
  episode: [{type: mongoose.Schema.Types.ObjectId, ref: 'Episode'}],
  created: {type: Date, required: true, default: Date.now()}
})

module.exports = mongoose.model('Character', CharacterSchema)