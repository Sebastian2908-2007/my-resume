const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
/**import typedefs and resovers for apollo-server-express consumption */
const { typeDefs, resolvers } = require('./schemas');

/* database connection */
const database = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

/*apollo sever start function*/
const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    /* start apollo server */
    await server.start();

    /* integrate with apollo server with express as middleware */
    server.applyMiddleware({ app });

    /* log where we can go to test our gql api */
    console.log(`Use graphQL at http://localhost:${PORT}${server.graphqlPath}`);

};
/* initialize apollo server */
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



/* start express server */
database.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on Port ${PORT}!!!`);
    });
});
