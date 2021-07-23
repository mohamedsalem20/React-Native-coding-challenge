import React from 'react';

import {Text, TextInput, TouchableOpacity, View} from 'react-native';

export const SearchBox = ({namequeryHolder, setnamequeryHolder}) => {
  function searchForUserByName(value) {
    console.log('searchForUserByName');
    setnamequeryHolder(value);
  }
  return (
    <View>
      <TextInput
        value={namequeryHolder}
        style={{
          backgroundColor: 'white',
          padding: 10,
          marginHorizontal: 20,
          borderRadius: 5,
        }}
        placeholder={'Search by name'}
        onChangeText={searchForUserByName}
      />

      {/* Clear search box  */}
      {namequeryHolder.length > 0 ? (
        <TouchableOpacity
          onPress={() => {
            setnamequeryHolder('');
          }}
          style={{
            position: 'absolute',
            right: 25,
            top: 15,
          }}>
          <Text
            style={{
              backgroundColor: 'red',
              height: 20,
              width: 20,
              borderRadius: 10,
              textAlign: 'center',
              color: 'white',
            }}>
            X
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
