import React, {useState} from 'react';

import {useQuery} from '@apollo/client';
import {Button, FlatList, Text} from 'react-native';
import {View} from 'react-native';
import {cache, client, GET_CHARACHTERS, loadMore} from '../../GraphqlHelper';
import {CharachterCard} from './CharacterCard';
import Error from './components/Error';
import Loading from './components/Loading';
import {SearchBox} from './components/SearchBox';
import {TextInput} from 'react-native-gesture-handler';
import {useEffect} from 'react';

export default function CharactersList({namequeryHolder}) {
  // const [namequeryHolder, setnamequeryHolder] = useState('');
  const [filtredData, setfiltredData] = useState([]);

  useEffect(() => {
    client.clearStore().then(() => {
      fetchMore({
        variables: {
          charactersFilter: {name: namequeryHolder},
        },
      });
    });
  }, [namequeryHolder]);
  const [result, setresult] = useState([]);

  // async function filterCharacters(value) {
  //   // if (value === '') {
  //   //   setnamequeryHolder(value);
  //   // } else {
  //   //   setnamequeryHolder(value);
  //   //   try {
  //   //     const response = await fetch(
  //   //       'https://rickandmortyapi.com/api/character/?name=' + value,
  //   //     );
  //   //     const json = await response.json();
  //   //     console.log(response);

  //   //     setfiltredData(json.results);
  //   //   } catch (error) {
  //   //     console.log(error);
  //   //     setfiltredData([]);
  //   //   }
  //   // }
  //   setnamequeryHolder(value);

  //   client.clearStore();

  //   fetchMore({
  //     variables: {
  //       charactersFilter: {name: namequeryHolder},
  //     },
  //   });
  // }
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
      <Button
        title={'modify cach'}
        onPress={() => {
          client.clearStore();
          fetchMore({
            variables: {
              charactersFilter: {name: namequeryHolder},
            },
          });
        }}
      />

      <View
        style={{
          height: '90%',
        }}>
        <FlatList
          // ListFooterComponent={() => {
          //   return (
          //     <View>
          //       {data.characters.info.next && namequeryHolder.length === 0 ? (
          //         <Loading />
          //       ) : null}
          //     </View>
          //   );
          // }}
          numColumns={3}
          keyboardShouldPersistTaps="always"
          onEndReachedThreshold={0.01}
          onEndReached={() => {
            if (namequeryHolder.length <= 0) {
              loadMore(fetchMore, data, loading);
            }
          }}
          // data={
          //   namequeryHolder.length > 0 ? filtredData : data.characters.results
          // }
          data={data?.characters?.results}
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
    </View>
  );
}
