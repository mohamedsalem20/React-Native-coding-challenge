import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {Button} from 'react-native';
import {FlatList, Text} from 'react-native';
import {View} from 'react-native';
import {CharachterCard} from './CharacterCard';

export default function CharactersList() {
  const GET_CHARACHTERS = gql`
    query Characters($charactersPage: Int) {
      characters(page: $charactersPage) {
        results {
          id
          name
          image
          species
          gender
          episode {
            name
            air_date
          }
        }
        info {
          next
          count
        }
      }
    }
  `;

  const {loading, error, data, fetchMore} = useQuery(GET_CHARACHTERS, {
    variables: {
      charactersPage: 1,
    },
  });
  if (loading) {
    return <Text>Laodnig ...</Text>;
  }
  if (loading) {
    return <Text>error ...</Text>;
  }

  function loadMore() {
    if (data.characters.info.next) {
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
      <Button
        title="MORE"
        onPress={() => {
          console.log('fetchMore....');
        }}
      />
      <FlatList
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
