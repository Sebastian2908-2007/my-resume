const {Contact, FileUpload} = require('../models');

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
            return contact;
        }
    }
};

module.exports = resolvers;