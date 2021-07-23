import React from 'react';
import {Text, View} from 'react-native';

export default function Error() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
      }}>
      <Text
        style={{
          color: 'white',
          marginHorizontal: 10,
        }}>
        No charachter found.
      </Text>
    </View>
  );
}
