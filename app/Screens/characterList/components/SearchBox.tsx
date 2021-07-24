import React from 'react';

import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from '../../styles/Styles';

export const SearchBox = ({namequeryHolder, setnamequeryHolder}) => {
  function searchForUserByName(value) {
    console.log('searchForUserByName');
    setnamequeryHolder(value);
  }
  return (
    <View>
      <TextInput
        value={namequeryHolder}
        style={styles.SearchBox}
        placeholder={'Search by name'}
        onChangeText={searchForUserByName}
      />

      {/* Clear search box  */}
      {namequeryHolder.length > 0 ? (
        <TouchableOpacity
          onPress={() => {
            setnamequeryHolder('');
          }}
          style={styles.SearchAreaClearBtn}>
          <Text style={styles.XBtn}>X</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
