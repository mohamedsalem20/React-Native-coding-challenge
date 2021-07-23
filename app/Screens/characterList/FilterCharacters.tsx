import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {Button} from 'react-native';
import {FlatList, Text} from 'react-native';
import {View} from 'react-native';
import {GET_CHARACHTERS} from '../../GraphqlHelper';
import {CharachterCard} from './CharacterCard';
import Error from './components/Error';
import Loading from './components/Loading';

export default function FilterCharacters() {
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

  function loadMore() {
    if (data.characters.info.next && !loading) {
      fetchMore({
        variables: {
          charactersPage: data.characters.info.next,
        },
      });
    }
  }
  return (
    <View
      style={{
        backgroundColor: '#223762',
      }}>
      <FlatList
        ListFooterComponent={() => {
          return <View>{data.characters.info.next ? <Loading /> : null}</View>;
        }}
        numColumns={3}
        keyboardShouldPersistTaps="always"
        onEndReachedThreshold={0.01}
        onEndReached={loadMore}
        data={data.characters.results}
        renderItem={({item}) => {
          return (
            <CharachterCard
              image={item.image}
              id={item.id}
              name={item.name}
              // to be use in the second screen
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
