const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
  type Review {
    _id: ID
    reviewText: String
    createdAt: String
    firstName: String
    lastName: String
  }

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
    isClient: Boolean
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
   addContact(firstName: String!, lastName: String!, email: String!, password: String! descriptionText: String!, phone: String, isClient: Boolean): ContactAuth 
   loginContact(email: String!, password: String!): ContactAuth
   updateContact(contactId: ID!, firstName: String, lastName: String, email: String, descriptionText: String, phone: String): Contact
   deleteContact(contactId: ID!): Contact
   singleFileUpload(ETag:String, Location:String, key:String, Key:String, Bucket:String): Contact 
   removeFileById(fileId: ID!): Contact
   addReview(reviewText: String!, firstName: String!, lastName: String!): Review
  }
`;

module.exports = typeDefs;

/*
{
  "data": {
    "loginContact": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6IlJlYWwiLCJsYXN0TmFtZSI6IkNsaWVudCIsImVtYWlsIjoiYUNsaWVudEBlbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaXNDbGllbnQiOnRydWUsIl9pZCI6IjYyZDlkMzJhYmVlNmQ3NGU0N2E1OWMyZCJ9LCJpYXQiOjE2NTg0NDI5MjAsImV4cCI6MTY1ODQ1NzMyMH0.8xWCjJqVe3IPCDCmtu1tWynn3rtj2pr-_cLhqKkV3to",
      "user": {
        "_id": "62d9d32abee6d74e47a59c2d",
        "email": "aClient@email.com",
        "descriptionText": "this will be first to add picture to data!",
        "firstName": "Real",
        "lastName": "Client",
        "phone": "385-549-4194",
        "isAdmin": false
      }
    }
  }
}
*/