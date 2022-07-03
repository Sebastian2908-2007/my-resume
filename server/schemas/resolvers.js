const Contact = require('../models');

const resolvers = {
    Query: {
        helloWorld: () => {
            const hello = 'the server works hello world!!! im a programmer!!!!!!!!';
            return hello;
        }
    },
};

module.exports = resolvers;