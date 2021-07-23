import React from 'react';
import {ApolloClient, ApolloProvider} from '@apollo/client';
import {cache} from './app/GraphqlHelper';
import StackNavigator from './app/Navigation/StackNavigator';
import {View} from 'react-native';

// import StackNavigator from './app/Navigation/StackNavigator';

const App = () => {
  // Initialize Apollo Client
  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache,
  });
  return (
    <ApolloProvider client={client}>
      <StackNavigator />
    </ApolloProvider>
  );
};

export default App;
