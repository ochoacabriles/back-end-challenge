const Episode = require('../model/episode')

module.exports.paginatedEpisodeQuery = async(page) => {
  const limit = 20
  const sort = {'episode': 1}
  const skip = (page - 1) * limit
  const count = await Episode.countDocuments({})
  const totalPages = Math.ceil(count/limit)
  if (page < 1 || page > totalPages)
    throw new Error(`Page out of range. Valid values from 1 to ${totalPages}`)
  const nextPage = page +1
  const prevPage = page >= 2
  try {
    var episodes = await Episode.find({})
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('characters')
  } catch(err) {
    throw new Error (`Failed to execute query due to the following error: ${err.message}`)
  }    
  const paginatedEpisodeQueryObject = {
    info: {
      next: nextPage,
      pages: totalPages,
      count: count,
      prev: prevPage
    },
    results: episodes
  }
  return paginatedEpisodeQueryObject
}

module.exports.episodeQuery = async(id) => {
  try {
    var episode = await Episode.findById(id)
      .populate('characters')
    return episode
  }catch (err) {
    throw new Error (`Failed to execute query due to the following error: ${err.message}`)
  }
}

module.exports.removeCharacterReferences = async(charId) => {
  try {
    await Episode.updateMany({}, {$pull: {characters: charId}})
    return
  } catch(err) {
    throw err
  }
}

module.exports.addCharacterReferences = (episodes, charId) => {
  episodes.forEach(async (episode, i) => {
    try {
      await Episode.updateOne({'_id': episode}, {$push: {characters: charId}})
      if (i === episode.length - 1) {
        return
      }
    } catch (err) {
      throw err
    }
  })
}