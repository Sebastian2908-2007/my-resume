const {Contact, FileUpload} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const {signToken} = require('../utils/contactAuth');

const resolvers = {
    Query: {
        getContacts: async (parent, {firstName}, context) => {
            if (context.user) {
                 console.log(context);
                const params = firstName ? { firstName }: {};
                return await Contact.find(params).sort({ createdAt: -1 });
                
               
            }
            throw new AuthenticationError('improper credentials');
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
        }
    }
};

module.exports = resolvers;


