const mongoose = require('mongoose')
const Character = require('./character')

// Episode Schema
const EpisodeSchema = new mongoose.Schema({
  name: String,
  air_date: Date,
  episode: String,
  characters: [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
  created: Date
})

module.exports = mongoose.model('Episode', EpisodeSchema)