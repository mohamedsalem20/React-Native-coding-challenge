import React from 'react';
import {ApolloClient, ApolloProvider} from '@apollo/client';
import {cache, client} from './app/GraphqlHelper';
import StackNavigator from './app/Navigation/StackNavigator';
import {View} from 'react-native';

// import StackNavigator from './app/Navigation/StackNavigator';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StackNavigator />
    </ApolloProvider>
  );
};

export default App;
