const {Contact, FileUpload, Review} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const {signToken} = require('../utils/contactAuth');



const resolvers = {
    Query: {
        getContacts: async (parent, {firstName}, context) => {
            if (context.user.isAdmin) {
                const params = firstName ? { firstName }: {};
                return await Contact.find(params).sort({ createdAt: -1 });
                
               
            }
            throw new AuthenticationError('No permissions');
        },
        getReviews: async (parent,args) => {
          return await Review.find().sort({createdAt: -1});
        }
    },
    Mutation: {
        addContact: async (parent,args) => {
            const user = await Contact.create(args);
            const token = signToken(user);
            
            /**token name below must be the same in contactAuth type in type defs always else the token will return null */
            return { user,token };
        },
        loginContact: async (parent, {email, password}) => {
          const user = await Contact.findOne({ email });

          if(!user) {
            throw new AuthenticationError('incorrect credentials');
          }

          const correctPw = await user.isCorrectPassword(password);

          if(!correctPw) {
            throw new AuthenticationError('incorrect credentials');
          }
          const token = signToken(user);
          // i have changed all instances of contactToken to token and contact to user but now looking at this
          // i think maybe i am having issues because I am returning user first here and declaring it second in contact auth
          return {user,token};
        },
        updateContact: async (parent, args, context) => {
            if(context.user.isAdmin || context.user._id === args.contactId) {
              const updatedContact = await Contact.findOneAndUpdate(
                {  _id: args.contactId },
                { 
                firstName: args.firstName,
                 lastName: args.lastName,
                 email: args.email,
                 descriptionText: args.descriptionText,
                 phone: args.phone,
                },
                { new: true, runValidators: true }
              )
              return updatedContact;
            }
            throw new AuthenticationError('No permissions');
        },
        deleteContact: async (parent, {contactId}, context) => {
             if(context.user.isAdmin || context.user._id === contactId) {
                const deletedContact = await Contact.deleteOne({ _id: contactId });
                console.log(deletedContact);
                return deletedContact;
             }
             throw new AuthenticationError('No permissions');
        },
        singleFileUpload: async (parent, {ETag, Location, key, Key, Bucket}, context) => {
          if(context.user) {
         const newFile = await FileUpload.create({
          ETag: ETag,
          Location: Location,
          key: key,
          Key: Key, 
          Bucket: Bucket
         });
         // push file upload to the current user
         const updatedContact = await Contact.findByIdAndUpdate(
             {_id: context.user._id },
             { $push: {files:  newFile } },
             { new: true, runValidators: true }
         );
           return updatedContact;
        }
        throw new AuthenticationError('No permissions');
       
        },
        removeFileById: async (parent, {fileId},context) => {
          if (context.user) {
            console.log(fileId);
            const contact = await Contact.findByIdAndUpdate(
              {_id: context.user._id},
              {$pull: {files: {_id: fileId }}},
              {new: true}
              );
           return contact;
          }
          throw new AuthenticationError('no permissions');
        },
        addReview: async (parent, args, context)  => {
          if(context.user.isClient) {
            const review = await Review.create(args);
            return review;
          }
          throw new AuthenticationError('you must be a paying customer to leave a review');
        },
        updateReview: async (parent, {reviewId, reviewText}, context) => {
          if(context.user.isClient) {
            const review = await Review.findOne({_id: reviewId});
            if(context.user.lastName ===  review.lastName) {
              await review.updateOne({reviewText: reviewText},{new: true});
             return review;
            }
          throw new AuthenticationError('you must be a client and have submitted this review to update it'); 
          }
          throw new AuthenticationError('you must be a client and have submitted this review to update it');
        },
        deleteReview: async (parent,{reviewId},context) => {
          const review = await Review.findOne({_id: reviewId});
            if(context.user.isClient && context.user.lastName === review.lastName) {
               review.deleteOne();
               return true;
            }
            throw new AuthenticationError('you must be a client and have submitted this review to delete it')
        }
    }
};

module.exports = resolvers;


/*
admin info
{
  "data": {
    "loginContact": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6Im5ld2VzdDUiLCJsYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJuZXdlc3Q3QWRtaW5AZW1haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiX2lkIjoiNjJjNjEzMjY5MTY2NTBjZTg4NDdlODcwIn0sImlhdCI6MTY1ODA5Nzc5MywiZXhwIjoxNjU4MTEyMTkzfQ.WqpaFGqMfEK8b-1BAA8jW1Q7GIKg0s27u3XGvw1UXl4",
      "user": {
        "_id": "62c61326916650ce8847e870",
        "email": "newest7Admin@email.com",
        "descriptionText": "payload test!",
        "firstName": "newest5",
        "lastName": "admin",
        "phone": "888-549-4190",
        "isAdmin": true
      }
    }
  }
}
*******regular user I use***************
{
  "data": {
    "addContact": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6InVwbG9hZCIsImxhc3ROYW1lIjoiY29udGFjdCIsImVtYWlsIjoidXBsMkBlbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiX2lkIjoiNjJkOTcxMzE5Zjc0YTU1Y2ZkYjE4MTkyIn0sImlhdCI6MTY1ODQxNzQ1NywiZXhwIjoxNjU4NDMxODU3fQ.LVZc_EvpYJNypF-keXv6alW0ML0_-GcHqiN8sN6ysws",
      "user": {
        "firstName": "upload",
        "lastName": "contact",
        "email": "upl2@email.com",
        "password": "$2b$11$r1Q4HY1KFXdgFEkTWjY/le8H.cLOGxprS2AYrlxbbfIw17TGhMAQ.",
        "descriptionText": "this will be first to add picture to data!",
        "phone": "385-549-4194",
        "isAdmin": false,
        "files": []
      }
    }
  }
}

LOGIN PASS: Contactauth88#

*******CONTACTS************************
{
  "data": {
    "addContact": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6Ik5vdCIsImxhc3ROYW1lIjoiQ2xpZW50IiwiZW1haWwiOiJub0NsaWVudEBlbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaXNDbGllbnQiOmZhbHNlLCJfaWQiOiI2MmQ5ZDg3OWRiNWFlMzViZGMxNzdlMWYifSwiaWF0IjoxNjU4NDQzODk3LCJleHAiOjE2NTg0NTgyOTd9.kMT80juhN7W0GdXQ4Mqsf-dBuoJ0aKqUTQBvL9Ww7Gs",
      "user": {
        "firstName": "Not",
        "lastName": "Client",
        "email": "noClient@email.com",
        "password": "$2b$11$UmtfUoBhhdrh2DGp7y1dP.BjG6GKAKQl24y/Km6ZoUlzdoZwB.QcC",
        "descriptionText": "this will be first to add picture to data!",
        "phone": "385-549-4194",
        "isAdmin": false,
        "isClient": false,
        "files": []
      }
    }
  }
}
     
      
*/