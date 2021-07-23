import React, {useState} from 'react';

import {useQuery} from '@apollo/client';
import {FlatList, Text} from 'react-native';
import {View} from 'react-native';
import {GET_CHARACHTERS, loadMore} from '../../GraphqlHelper';
import {CharachterCard} from './CharacterCard';
import Error from './components/Error';
import Loading from './components/Loading';
import {SearchBar} from 'react-native-screens';
import {SearchBox} from './components/SearchBox';

export default function CharactersList() {
  const [namequeryHolder, setnamequeryHolder] = useState('');
  const {loading, error, data, fetchMore} = useQuery(GET_CHARACHTERS, {
    variables: {
      charactersPage: 1,
    },
  });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <View
      style={{
        backgroundColor: '#223762',
      }}>
      <SearchBox
        namequeryHolder={namequeryHolder}
        setnamequeryHolder={setnamequeryHolder}
      />
      <FlatList
        ListFooterComponent={() => {
          return <View>{data.characters.info.next ? <Loading /> : null}</View>;
        }}
        numColumns={3}
        keyboardShouldPersistTaps="always"
        onEndReachedThreshold={0.01}
        onEndReached={() => {
          loadMore(fetchMore, data, loading);
        }}
        data={data.characters.results}
        renderItem={({item}) => {
          return (
            <CharachterCard
              image={item.image}
              id={item.id}
              name={item.name}
              // to be used in the second screen
              moreInfo={{
                species: item.species,
                gender: item.gender,
                episode: item.episode,
              }}
            />
          );
        }}
      />
    </View>
  );
}
