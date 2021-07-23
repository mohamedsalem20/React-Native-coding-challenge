import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import CharacterList from './app/Screens/characterList/characterList';
import CharachterDetails from './app/Screens/charachterDetails/CharachterDetails';
import {offsetLimitPagination} from '@apollo/client/utilities';
import CharactersList from './app/Screens/characterList/CharactersList';

// import StackNavigator from './app/Navigation/StackNavigator';

const App = () => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            keyArgs: false,
            merge(existing = [], incoming) {
              var mergeExistingIncoming;
              if (existing.results) {
                mergeExistingIncoming = [
                  ...existing.results,
                  ...incoming.results,
                ];
              } else {
                mergeExistingIncoming = [...incoming.results];
              }

              const resultHolder = {
                info: incoming.info,
                results: mergeExistingIncoming,
                __typename: incoming.__typename,
              };

              return resultHolder;
            },
          },
        },
      },
    },
  });
  // Initialize Apollo Client
  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache,
  });
  const Stack = createStackNavigator();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            animationEnabled: true,
            animationTypeForReplace: 'pop',
            headerStyle: {backgroundColor: '#223762'},
            headerTintColor: 'white',
          }}>
          <Stack.Screen
            options={{
              // headerShown: false,
              title: 'Rick and Morty',
              headerTintColor: 'white',
            }}
            name="CharacterList"
            component={CharactersList}
          />
          <Stack.Screen
            options={{
              title: 'Charachter Details',
            }}
            name="CharachterDetails"
            component={CharachterDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
