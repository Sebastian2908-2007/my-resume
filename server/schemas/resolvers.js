const {Contact, FileUpload} = require('../models');
const {signToken} = require('../utils/contactAuth');

const resolvers = {
    Query: {
        helloWorld: () => {
            const hello = 'the server works hello world!!! im a programmer!!!!!!!!';
            return hello;
        }
    },
    Mutation: {
        addContact: async (parent,args) => {
            const contact = await Contact.create(args);
            const contactToken = signToken(contact);
            console.log(contactToken);
            /**token name below must be the same in contactAuth type in type defs always else the token will return null */
            return { contact, contactToken };
        }
    }
};

module.exports = resolvers;