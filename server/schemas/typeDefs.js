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
    pictures: [FileUpload]
  }

  type contactAuth {
    contactToken: ID
    contact: Contact
  }

  type Query {
   helloWorld: String
  }  

  type Mutation {
   addContact(firstName: String!, lastName: String!, email: String!, password: String! descriptionText: String!, phone: String): contactAuth 
  }
`;

module.exports = typeDefs;