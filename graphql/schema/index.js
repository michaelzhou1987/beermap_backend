const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    email: String!
    pwd: String!
    nickname: String!
    firstName: String
    lastName: String
    prefix: String
    phoneNumber: String
    avatar: String
    role: String
    beers: [Beer]
    wines: [Wine]
  }

  type Geolocation {
    latitude: String
    longtitude: String
    city: String
    state: String
    country: String
  }

  type Beer {
    _id: ID!
    name: String!
    brewery: Brewery
    breweryName: String
    type: String
    region: String
    date: String
    rate: Int
    price: String
    recommand: String
    description: String
    keyNotes: [String]
    location: String
    thumbnail: String
    user: User
    latitude: String
    longtitude: String
    city: String
    state: String
    country: String
  }

  type Brewery {
    _id: ID!
    name: String!
    beers: [Beer]
    address: String
    latitude: String
    longtitude: String
    city: String
    state: String
    country: String
  }

  type Wine {
    _id: ID!
    name: String!
    breweryId: ID
    breweryName: String
    type: String
    region: String
    date: Int
    rate: Int
    price: String
    recommand: String
    description: String
    keyNotes: [String]
    location: String
    thumbnail: String
    user: User    
    latitude: String
    longtitude: String
    city: String
    state: String
    country: String
  }

  type AuthData {
    userId: ID!
    nickname: String!
    token: String!
    role: String!
  }

  input UserInput {
    email: String!
    pwd: String!
    confirmPwd: String!
    nickname: String!
    firstName: String
    lastName: String
    prefix: String
    phoneNumber: String
    agreement: Boolean
  }

  input BeerInput {
    name: String!
    brewery: ID
    breweryName: String
    type: String
    region: String
    date: String
    rate: Int
    price: String
    recommand: String
    description: String
    keyNotes: [String]
    location: String
    thumbnail: String
    latitude: String
    longtitude: String
    city: String
    state: String
    country: String
  }

  input BreweryInput {
    name: String!
    address: String
    latitude: String
    longtitude: String
    city: String
    state: String
    country: String
  }

  type RootQuery {
    users: [User!]!
    user(_id: ID!): User!
    beers: [Beer!]!
    beer(_id: ID!): Beer!
    brewerys: [Brewery!]!
    brewery: Brewery!
    wines: [Wine!]!
    wine: Wine!
  }

  type RootMutation {
    createUser(userInput: UserInput): User
    createBeer(beerInput: BeerInput): Beer
    createBrewery(breweryInput: BreweryInput): Brewery
    login(email: String!, pwd: String!, rememberMe: Boolean!): AuthData!
    checkAuth(check: Int): AuthData!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);