import React from 'react';

import {useQuery} from '@apollo/client';
import {FlatList} from 'react-native';
import {View} from 'react-native';
import {client, GET_CHARACHTERS, loadMore} from '../../GraphqlHelper';
import {CharachterCard} from './CharacterCard';
import Error from './components/Error';
import Loading from './components/Loading';
import {useEffect} from 'react';
import {styles} from '../styles/Styles';
import {filterListByName, hasNextPage} from '../../functions';

export default function CharactersList({
  namequeryHolder,
}: {
  namequeryHolder: string;
}) {
  const {loading, error, data, fetchMore} = useQuery(GET_CHARACHTERS, {
    variables: {
      charactersPage: 1,
      charactersFilter: {name: namequeryHolder},
    },
    client: client,
  });
  interface IItem {
    name: string;
    image: string;
    gender: string;
    episode: [];
    species: string;
    id: number;
  }

  useEffect(() => {
    filterListByName(loading, fetchMore, namequeryHolder);
  }, [namequeryHolder]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const results = data?.characters?.results;
  return (
    <View style={styles.ListofCharacters}>
      <View style={styles.listSize}>
        <FlatList
          ListFooterComponent={() => {
            return (
              <View>
                {hasNextPage(data) && namequeryHolder.length === 0 ? (
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
          data={results}
          keyExtractor={(index: number) => (index + Math.random()).toString()}
          renderItem={({item}: {item: IItem}) => {
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
