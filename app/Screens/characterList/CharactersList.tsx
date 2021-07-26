import React from 'react';

import {useQuery} from '@apollo/client';
import {FlatList, Text} from 'react-native';
import {View} from 'react-native';
import {client, GET_CHARACHTERS, loadMore} from '../../GraphqlHelper';
import CharachterCard from './CharacterCard';
import Error from './components/Error';
import Loading from './components/Loading';
import {useEffect} from 'react';
import {styles} from '../styles/Styles';
import {filterListByName, hasNextPage} from '../../functions';

export default function CharactersList({
  namequeryHolder,
  navigation,
}: {
  namequeryHolder: string;
  navigation: object;
}) {
  const {loading, error, data, fetchMore} = useQuery(GET_CHARACHTERS, {
    variables: {
      charactersPage: 1,
      charactersFilter: {name: namequeryHolder},
    },
    client: client,
  });
  interface IItem {
    image: string;
    id: number;
    name: string;
    episode: [{name: string; air_date: string}];
    species: string;
    gender: string;
    navigation: object;
  }

  useEffect(() => {
    filterListByName(loading, fetchMore, namequeryHolder);
    console.log(JSON.stringify(data));
  }, [namequeryHolder]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return <Text>hi</Text>;
}
