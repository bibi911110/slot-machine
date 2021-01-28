const { gql } = require('apollo-server');

module.exports = gql`
  # scalar type
  scalar DateTime
  type Auth {
    id: ID
    email: String
  }
  type User {
    id: ID
    email: String
    password: String
    dob: DateTime
    active: Boolean
    attempts: Int
    points: Int
    coupons: [String]
  }

  type Query {
    getCurrentUser(token: string)
  }
  
  type Mutation {
    register(email: String!, password: String!, dob: DateTime!): Auth!
    login(email: String!, password: String!): Auth!
  }
`;