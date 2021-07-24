import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

export default function Loading() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
      }}>
      <ActivityIndicator size={'small'} color={'green'} />
      <Text
        style={{
          color: 'white',
          marginHorizontal: 10,
          fontSize: 20,
        }}>
        Loadin charachters ...
      </Text>
    </View>
  );
}
