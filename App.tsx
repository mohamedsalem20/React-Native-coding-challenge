import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {client} from './app/GraphqlHelper';
import StackNavigator from './app/Navigation/StackNavigator';

// import StackNavigator from './app/Navigation/StackNavigator';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StackNavigator />
    </ApolloProvider>
  );
};

export default App;
