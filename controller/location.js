const Location = require('../model/location')

module.exports.paginatedLocationQuery = async(page) => {
  const limit = 20
  const sort = {'created': 1}
  const skip = (page - 1) * limit
  const count = await Location.countDocuments({})
  const totalPages = Math.ceil(count/limit)
  if (page < 1 || page > totalPages)
    throw new Error(`Page out of range. Valid values from 1 to ${totalPages}`)
  const nextPage = page +1
  const prevPage = page >= 2
  try {
    var locations = await Location.find({})
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('residents')

  } catch(err) {
    throw new Error (`Failed to execute query due to the following error: ${err.message}`)
  }    
  const paginatedLocationsQueryObject = {
    info: {
      next: nextPage,
      pages: totalPages,
      count: count,
      prev: prevPage
    },
    results: locations
  }
  return paginatedLocationsQueryObject
}


module.exports.locationQuery = async(id) => {
  try {
    var location = await Location.findById(id)
      .populate('residents')
    return location
  } catch (err) {
    throw new Error (`Failed to execute query due to the following error: ${err.message}`)
  }
}

module.exports.removeCharacterReferences = async(charId) => {
  try {
    await Location.updateMany({}, {$pull: {residents: charId}})
    return
  } catch(err) {
    throw err
  }
}

module.exports.addCharacterReferences = async(charId, origin, location) => {
  try {
    await Location.updateOne({'_id': origin}, {$push: {residents: charId}})
    if (origin !== location) {
      await Location.updateOne({':id': location}, {$push: {residents: charId}})
    }
  } catch (err) {
    throw err
  }
}