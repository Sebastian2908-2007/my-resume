import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient,createHttpLink, from } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache'
import { setContext } from '@apollo/client/link/context';
import TestUpload from './TestUpload';
import { onError } from "@apollo/client/link/error";

// this actually gets me to the auth link I think
/*const cleanTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) => (key === '__typename' ? undefined : value);
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
  }
  return forward(operation).map((data) => {
    return data;
  });
});*/

// establish connection to /graphql endpoint
const httpLink = createHttpLink({
   uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// client prop to be passed in to ApolloProvider in order to give app access to all endpoint data
const client = new ApolloClient({
  link: from([errorLink,authLink, httpLink]),
  cache: new InMemoryCache()
});

function App() {
  

  return (
    <ApolloProvider client={client}>
      <Router>
      <Routes>
 <Route exact path="/" element={ <TestUpload /> }/>
     </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
