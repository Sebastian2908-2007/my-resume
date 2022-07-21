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
    files: [FileUpload]
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
   updateContact(contactId: ID!, firstName: String, lastName: String, email: String, descriptionText: String, phone: String): Contact
   deleteContact(contactId: ID!): Contact
   singleFileUpload(ETag:String, Location:String, key:String, Key:String, Bucket:String): Contact 
   removeFileById(fileId: ID!): Contact
  }
`;

module.exports = typeDefs;

/*
{
  "data": {
    "singleFileUpload": {
      "_id": "62d971319f74a55cfdb18192",
      "firstName": "upload",
      "lastName": "contact",
      "descriptionText": "this will be first to add picture to data!",
      "email": "upl2@email.com",
      "phone": "385-549-4194",
      "files": [
        {
          "_id": "62d996a5113f9ed52ff1dad4",
          "ETag": "mytag83",
          "Bucket": "88my Great WORKING Bucket",
          "key": "88WORKINGpic.png",
          "Key": "88WORKINGNewpic.png",
          "Location": "https//:workingpic.com/pic"
        }
      ]
    }
  }
}
*/