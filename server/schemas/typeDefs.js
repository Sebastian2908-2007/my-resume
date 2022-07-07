const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type FileUpload {
    _id: ID
    ETag: String
    Location: String
    key: String
    Key: String
    Bucket: String
  }

  type Contact {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    descriptionText: String
    phone: String
    isAdmin: Boolean
    pictures: [FileUpload]
  }

  type ContactAuth {
    user: Contact!
    token: ID!
  }

  type Query {
   getContacts(firstName: String): [Contact]
  }  

  type Mutation {
   addContact(firstName: String!, lastName: String!, email: String!, password: String! descriptionText: String!, phone: String): ContactAuth 
   loginContact(email: String!, password: String!): ContactAuth
  }
`;

module.exports = typeDefs;