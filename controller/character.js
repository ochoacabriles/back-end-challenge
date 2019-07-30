const Character = require('../model/character')
const locationController = require('../controller/location')
const episodeController = require('../controller/episode')

module.exports.paginatedCharQuery = async(page) => {
  const limit = 20
  const sort = {'created': 1}
  const skip = (page - 1) * limit
  const count = await Character.countDocuments({})
  const totalPages = Math.ceil(count/limit)
  if (page < 1 || page > totalPages)
    throw new Error(`Page out of range. Valid values from 1 to ${totalPages}`)
  const nextPage = page +1
  const prevPage = page >= 2
  try {
    var characters = await Character.find({})
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('origin')
      .populate('location')
      .populate('episode')
  } catch(err) {
    throw new Error (`Failed to execute query due to the following error: ${err.message}`)
  }    
  const paginatedCharQueryObject = {
    info: {
      next: nextPage,
      pages: totalPages,
      count: count,
      prev: prevPage
    },
    results: characters
  }
  return paginatedCharQueryObject
}

module.exports.characterQuery = async(id) => {
  try {
    var character = await Character.findById(id)
      .populate('origin')
      .populate('location')
      .populate('episode')
    return character
  }catch (err) {
    throw new Error (`Failed to execute query due to the following error: ${err.message}`)
  }
}

module.exports.deleteCharacter = async(id) => {
  try {
    var deletedCharacter = await Character.deleteOne({'_id': id})
    if (deletedCharacter.deletedCount !== 0) {
      await locationController.removeCharacterReferences(id)
      await episodeController.removeCharacterReferences(id)
      return true
    } else {
      return false
    }
  } catch (err) {
    throw new Error (`Failed to execute mutation due to the following error: ${err.message}`)
  }
}

module.exports.addCharacter = async(newCharacter) => {
  const characterDoc = new Character(newCharacter)
  try {
    character = await characterDoc.save()
    await episodeController.addCharacterReferences(character.episode, character._id)
    await locationController.addCharacterReferences(character._id, character.origin, character.location)
    return character
  } catch (err) {
    throw new Error (`Failed to execute mutation due to the following error: ${err.message}`)
  }
}