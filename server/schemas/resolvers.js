const {Contact, FileUpload} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const {signToken} = require('../utils/contactAuth');



const resolvers = {
    Query: {
        getContacts: async (parent, {firstName}, context) => {
            if (context.user.isAdmin) {
                 console.log(context);
                const params = firstName ? { firstName }: {};
                return await Contact.find(params).sort({ createdAt: -1 });
                
               
            }
            throw new AuthenticationError('No permissions');
        }
    },
    Mutation: {
        addContact: async (parent,args) => {
            const user = await Contact.create(args);
            const token = signToken(user);
            console.log(contactToken);
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
          //if(context.user) {
         const newFile = await FileUpload.create({
          ETag: ETag,
          Location: Location,
          key: key,
          Key: Key, 
          Bucket: Bucket
         });
         return newFile;
        //}
        throw new AuthenticationError('No permissions');
       
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

LOGIN PASS: Contactauth88#

*******CONTACTS************************
{
  "data": {
    "getContacts": [
      {
        "_id": "62c23064501387010abf871c",
        "firstName": "Bill",
        "lastName": "Jones",
        "phone": "+1 (615) 243-5172",
        "descriptionText": "this is my desc",
        "email": "bill@jones.com",
        "password": null,
        "isAdmin": false,
        "pictures": []
      },
      {
        "_id": "62c243082819fd97bed20b5a",
        "firstName": "jill",
        "lastName": "jones",
        "phone": "123-456-7890",
        "descriptionText": "this is updated jill jones",
        "email": "JJillthe@jones.com",
        "password": "$2b$11$oJbWx1O6LKUcliMtNK2riOvwyK0480vfZ9vKEnXahYbbRGMFDs/hS",
        "isAdmin": false,
        "pictures": []
      },
      {
        "_id": "62c2457b2819fd97bed20b62",
        "firstName": "Till",
        "lastName": "Mones",
        "phone": "1 (888) 549-4194",
        "descriptionText": "this is Till I want an awesome App Sebastian!",
        "email": "Till@Mones.com",
        "password": "$2b$11$Rpfp2VHm.gHulm42mljKLuG6gyxztXRs9AOubl9DLCym91LopkaUK",
        "isAdmin": false,
        "pictures": []
      },
      {
        "_id": "62c245ae2819fd97bed20b64",
        "firstName": "ill",
        "lastName": "Mones",
        "phone": "1 (888) 5494194",
        "descriptionText": "this is Till I want an awesome App Sebastian!",
        "email": "ill@Mones.com",
        "password": "$2b$11$XhiD25XRSQqaiCD.IeqDj.AVdWzqJEOGvD1uCne7k01npTJS384jG",
        "isAdmin": false,
        "pictures": []
      },
      {
        "_id": "62c245e62819fd97bed20b66",
        "firstName": "ll",
        "lastName": "Mones",
        "phone": "1 888 5494194",
        "descriptionText": "this is Till I want an awesome App Sebastian!",
        "email": "ll@Mones.com",
        "password": "$2b$11$xfzTQl4aBqCqW0fiejzRx.IZvBNp4kgNvzReFB8f6yDp6RtLSCT02",
        "isAdmin": false,
        "pictures": []
      },
      {
        "_id": "62c246122819fd97bed20b68",
        "firstName": "jl",
        "lastName": "Mones",
        "phone": "18885494194",
        "descriptionText": "this is Till I want an awesome App Sebastian!",
        "email": "jj@Mones.com",
        "password": "$2b$11$Yhdvm..mhqN3C1UXnpgQXeSl7sO/PJkamY49WQ.aA6xcTYtyom/c.",
        "isAdmin": false,
        "pictures": []
      },
      {
        "_id": "62c246242819fd97bed20b6a",
        "firstName": "j",
        "lastName": "Mones",
        "phone": "188854944",
        "descriptionText": "this is Till I want an awesome App Sebastian!",
        "email": "j@Mones.com",
        "password": "$2b$11$eP6Ow59W4lWOfnE13e/ZDuKhreM0QjhoSSbT7QbkxXUJxbAxxg3h2",
        "isAdmin": false,
        "pictures": []
      },
      {
        "_id": "62c2491581b948bcb8911e7c",
        "firstName": "tj",
        "lastName": "Mones",
        "phone": "8885494194",
        "descriptionText": "this is Till I want an awesome App Sebastian!",
        "email": "tj@Mones.com",
        "password": "$2b$11$pP7ZiSxHm8d.nRWiAtOrm.kfF45aIcvkcJoVkpi/yOHidenKwh50y",
        "isAdmin": false,
        "pictures": []
      },
      {
        "_id": "62c24a5bf592aad4d04e5381",
        "firstName": "thh",
        "lastName": "Mones",
        "phone": "(888) 549 4194",
        "descriptionText": "this is Till I want an awesome App Sebastian!",
        "email": "thh@Mones.com",
        "password": "$2b$11$toIWez8spB6p934hPibWG.D5RPIfPFmDvog3X/LQZiV4x3UtdU1OC",
        "isAdmin": false,
        "pictures": []
      },
     
      
*/