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
   getReviews: [Review]
  }  

  type Mutation {
   addContact(firstName: String!, lastName: String!, email: String!, password: String! descriptionText: String!, phone: String, isClient: Boolean): ContactAuth 
   loginContact(email: String!, password: String!): ContactAuth
   updateContact(contactId: ID!, firstName: String, lastName: String, email: String, descriptionText: String, phone: String): Contact
   deleteContact(contactId: ID!): Contact
   singleFileUpload(ETag:String, Location:String, key:String, Key:String, Bucket:String): Contact 
   removeFileById(fileId: ID!): Contact
   addReview(reviewText: String!, firstName: String!, lastName: String!): Review
   updateReview(reviewId: ID!, reviewText: String!): Review
   deleteReview(reviewId: ID!): Boolean!
  }
`;

module.exports = typeDefs;

/*
{
 {
  "data": {
    "loginContact": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6IlJlYWwiLCJsYXN0TmFtZSI6IkNsaWVudCIsImVtYWlsIjoiYUNsaWVudEBlbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaXNDbGllbnQiOnRydWUsIl9pZCI6IjYyZDlkMzJhYmVlNmQ3NGU0N2E1OWMyZCJ9LCJpYXQiOjE2NTg0NjIyMzYsImV4cCI6MTY1ODQ3NjYzNn0.cFs0bGB9tjZxmpTwF6eMCqhmPcmLcugwfusul3RToCo",
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
 {
  "data": {
    "getReviews": [
      {
        "_id": "62da1524fa23b842ac40bbab",
        "createdAt": "1658459428568",
        "firstName": "Real",
        "lastName": "Client",
        "reviewText": "This should be the review I edit!"
      },
      {
        "_id": "62da1358505aa1e2bec3c5a0",
        "createdAt": "1658458968172",
        "firstName": "Real",
        "lastName": "Client",
        "reviewText": "updated review"
      },
      {
        "_id": "62d9d804db5ae35bdc177e1d",
        "createdAt": "1658443780212",
        "firstName": "Zeb",
        "lastName": "Bower",
        "reviewText": "This is the first review"
      }
    ]
  }
}
*/