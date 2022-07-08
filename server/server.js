const express = require('express');
const { ApolloServer } = require('apollo-server-express');
/*import graphqlUpload express from grapql-upload */
/*graphql-upload library doesn't have any main index.js re-export for all of its functions. It has direct file exports for all the specific functionalities. 
hence the graphql-upload/graphqlUploadExpress.js in require statement */
const { graphqlUploadExpress } = require('graphql-upload')
const path = require('path');
/**import typedefs and resovers for apollo-server-express consumption */
const { typeDefs, resolvers } = require('./schemas');

/* database connection */
const database = require('./config/connection');
const { authMiddleware } = require('./utils/contactAuth');

const PORT = process.env.PORT || 3001;
const app = express();

/*apollo sever start function*/
  const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        context: authMiddleware
    });

    // start apollo server 
    await server.start();

   //this comes from graphql-upload and is needed by express for file uploads 
    //This middleware should be added before calling `applyMiddleware`. 
    app.use(graphqlUploadExpress());

    // integrate with apollo server with express as middleware 
    server.applyMiddleware({ app });

    // log where we can go to test our gql api 
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
