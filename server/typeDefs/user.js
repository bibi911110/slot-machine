const { gql } = require('apollo-server');

module.exports = gql`
  # scalar type
  scalar DateTime
  type Auth {
    id: ID
    email: String
    token: String
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
    getCurrentUser(token: String): String!
    verifyToken(token: String): Boolean!
  }
  
  type Mutation {
    register(email: String!, password: String!, dob: DateTime!): Auth!
    login(email: String!, password: String!): Auth!
  }
`;