import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {Button} from 'react-native';
import {FlatList, Text} from 'react-native';
import {View} from 'react-native';
import {GET_CHARACHTERS} from '../../GraphqlHelper';
import {CharachterCard} from './CharacterCard';
import Error from './components/Error';
import Loading from './components/Loading';

export default function FilterCharacters({namequeryHolder}) {
  const FILTER_CHARACHTERS = gql`
  query {
    characters(filter: {name: "${namequeryHolder}"}) {
      results {
        id
        name
        image
        species
        gender
        episode{
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
  const {loading, error, data, fetchMore} = useQuery(FILTER_CHARACHTERS);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  console.log(data);

  return (
    <View
      style={{
        backgroundColor: '#223762',
      }}>
      <Text>filter</Text>
      <FlatList
        ListFooterComponent={() => {
          return <View>{data.characters.info.next ? <Loading /> : null}</View>;
        }}
        numColumns={3}
        keyboardShouldPersistTaps="always"
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
