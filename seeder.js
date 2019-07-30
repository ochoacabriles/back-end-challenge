const mongoose = require('mongoose')
const Character = require('./model/character')
const Episode = require('./model/episode')
const Location = require('./model/location')

const charactersData = require('./data/characters.json')
const episodesData = require('./data/episodes.json')
const locationsData = require('./data/locations.json')

require('dotenv').config()

async function seedDB () {
  try {
    console.log('Conectándose a MongoDB')
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
  } catch(err) {
    console.log('Ocurrió un error al conectarse a la base de datos: ', err.message)
    throw err
  }
  try {
    console.log('Borrando datos existentes')
    await Character.deleteMany({})
    await Episode.deleteMany({})
    await Location.deleteMany({})
  } catch(err) {
    console.log('Ocurrió un error al borrar los datos')
    throw err
  }
  try {
    console.log('Cargando los datos')
    await Character.insertMany(charactersData)
    await Episode.insertMany(episodesData)
    await Location.insertMany(locationsData)
  } catch(err) {
    console.log('Ocurrió un error al cargar los datos')
    throw err
  }
}

seedDB()
  .then(() => {
    console.log('Los datos han sido cargados con éxito')
    process.exit(0)
  })
  .catch((err) => {
    console.log('Ocurrió un error: ', err.message)
    process.exit(1)
  })