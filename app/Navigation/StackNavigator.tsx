import React from 'react';
import CharachterDetails from '../Screens/charachterDetails/CharachterDetails';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import CharactersList from '../Screens/characterList/CharactersList';

export default function StackNavigator() {
  const Stack = createStackNavigator();

  return (
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
  );
}
