import React from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import CharactersList from '../CharactersList';
import {SearchBox} from '../components/SearchBox';

export default function characterListScreen() {
  return (
    <View style={{height: '100%', backgroundColor: '#223762'}}>
      <CharactersList />
    </View>
  );
}
