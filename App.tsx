import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import CharacterList from './app/Screens/characterList/characterList';
import CharachterDetails from './app/Screens/charachterDetails/CharachterDetails';

// import StackNavigator from './app/Navigation/StackNavigator';

const App = () => {
  // Initialize Apollo Client
  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
  });
  const Stack = createStackNavigator();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CharacterList" component={CharacterList} />
          <Stack.Screen
            name="CharachterDetails"
            component={CharachterDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
