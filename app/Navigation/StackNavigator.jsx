import React from 'react';
import CharachterDetails from '../Screens/charachterDetails/CharachterDetails';
import {createStackNavigator} from '@react-navigation/stack';
import CharacterList from '../Screens/characterList/characterList';
import {NavigationContainer} from '@react-navigation/native';

export default function StackNavigator() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CharacterList" component={CharacterList} />
        <Stack.Screen name="CharachterDetails" component={CharachterDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
