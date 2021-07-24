import React from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import CharactersList from '../CharactersList';
import {SearchBox} from '../components/SearchBox';

export default function characterListScreen() {
  const [namequeryHolder, setnamequeryHolder] = useState('');
  return (
    <View style={{height: '100%', backgroundColor: '#223762'}}>
      <CharactersList
        namequeryHolder={namequeryHolder}
        setnamequeryHolder={setnamequeryHolder}
      />
    </View>
  );
}
