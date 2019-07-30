const { gql } = require('apollo-server-express')

// GraphQL Schemas definition
module.exports.typeDefs = gql`
  type Query {
    characters(page: Int!): PaginatedCharacters
    character(id: ID!): Character
    episodes(page: Int!): PaginatedEpisodes
    episode(id: ID!): Episode
    locations(page: Int!): PaginatedLocations
    location(id: ID!): Location
  }

  type Mutation {
    deleteCharacter(id: ID!): Boolean!
    addCharacter(newCharacter: NewCharacter!): Character!
  }

  input NewCharacter {
    name: String!
    status: String
    species: String
    type: String
    gender: String
    origin: String
    location: String
    image: String
    episode: [String]
  }

  type Character {
    id: ID
    name: String
    status: String
    species: String
    type: String
    gender: String
    origin: Location
    location: Location
    image: String
    episode: [Episode]
    created: String
  }

  type Location {
    id: ID
    name: String
    type: String
    dimension: String
    residents: [Character]
    created: String
  }

  type Episode {
    id: ID
    name: String
    air_date: String
    episode: String
    characters: [Character]
    created: String
  }

  type Info {
    next: Int
    pages: Int!
    count: Int!
    prev: Int
  }

  type PaginatedCharacters {
    info: Info!
    results: [Character]
  }

  type PaginatedEpisodes {
    info: Info!
    results: [Episode]
  }

  type PaginatedLocations {
    info: Info!
    results: [Location]
  }
`;