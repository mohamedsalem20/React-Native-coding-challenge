import React from 'react';

import {useQuery} from '@apollo/client';
import {FlatList} from 'react-native';
import {View} from 'react-native';
import {client, GET_CHARACHTERS, loadMore} from '../../GraphqlHelper';
import {CharachterCard} from './CharacterCard';
import Error from './components/Error';
import Loading from './components/Loading';
import {useEffect} from 'react';

export default function CharactersList({namequeryHolder}) {
  useEffect(() => {
    client.clearStore().then(() => {
      fetchMore({
        variables: {
          charactersFilter: {name: namequeryHolder},
        },
      });
    });
  }, [namequeryHolder]);

  const {loading, error, data, fetchMore} = useQuery(GET_CHARACHTERS, {
    variables: {
      charactersPage: 1,
      charactersFilter: {name: namequeryHolder},
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
        height: '100%',
      }}>
      <View
        style={{
          height: '90%',
        }}>
        <FlatList
          ListFooterComponent={() => {
            return (
              <View>
                {data.characters.info.next && namequeryHolder.length === 0 ? (
                  <Loading />
                ) : null}
              </View>
            );
          }}
          numColumns={3}
          keyboardShouldPersistTaps="always"
          onEndReachedThreshold={0.01}
          onEndReached={() => {
            // get next list ( pagination with auto merge in cache)
            if (namequeryHolder.length <= 0) {
              loadMore(fetchMore, data, loading);
            }
          }}
          data={data?.characters?.results}
          renderItem={({item}) => {
            return (
              <CharachterCard
                image={item.image}
                id={item.id}
                name={item.name}
                // to use in the second screen
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
    </View>
  );
}
