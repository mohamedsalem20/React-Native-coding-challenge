import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

export default function Loading() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
      }}>
      <ActivityIndicator size={'small'} color={'white'} />
      <Text
        style={{
          color: 'white',
          marginHorizontal: 10,
        }}>
        Loadin charachters ...
      </Text>
    </View>
  );
}
