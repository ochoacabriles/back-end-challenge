const characterController = require('../controller/character')
const episodeController = require('../controller/episode')
const locationController = require('../controller/location')

module.exports.resolvers = {
  Query: {
    characters: async (parent, { page }) => {
      try {
        var paginatedCharacters = await characterController.paginatedCharQuery(page)
        return paginatedCharacters
      } catch (err) {
        throw new Error (err)
      }
    },
    character: async (parent, { id }) => {
      var character = await characterController.characterQuery(id)
      return character
    },
    episodes: async (parent, { page }) => {
      var paginatedEpisodes = await episodeController.paginatedEpisodeQuery(page)
      return paginatedEpisodes
    },
    episode: async (parent, { id }) => {
      var episode = await episodeController.episodeQuery(id)
      return episode
    },
    locations: async(parent, {page}) => {
      var paginatedLocations = await locationController.paginatedLocationQuery(page)
      return paginatedLocations
    },
    location: async(parent, { id }) => {
      var location = await locationController.locationQuery(id)
      return location
    }
  },
  Mutation: {
    deleteCharacter: async (parent, { id }) => {
      var success = await characterController.deleteCharacter(id)
      return success
    },
    addCharacter: async (parent, newCharacter) => {
      var character = await characterController.addCharacter(newCharacter.newCharacter)
      return character
    }
  }
};