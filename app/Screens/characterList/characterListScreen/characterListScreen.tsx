import React from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import {styles} from '../../styles/Styles';
import CharactersList from '../CharactersList';
import {SearchBox} from '../components/SearchBox';

export default function characterListScreen({navigation}: {navigation: any}) {
  const [namequeryHolder, setnamequeryHolder] = useState('');
  return (
    <View style={styles.characterListScreen}>
      <SearchBox
        namequeryHolder={namequeryHolder}
        setnamequeryHolder={setnamequeryHolder}
        onSearchValueChange={(value): {value: any} => {
          setnamequeryHolder(value);
        }}
      />
      <CharactersList
        navigation={navigation}
        namequeryHolder={namequeryHolder}
      />
    </View>
  );
}
