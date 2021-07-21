import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {useQuery, gql} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';

const CharacterList = () => {
  const navigation = useNavigation();
  const CHARACTERS_QUERY = gql`
    query {
      characters {
        results {
          id
          name
          image
          species
          gender
        }
        info {
          next
          pages
          count
        }
      }
    }
  `;
  function FetchCharachters() {
    const {loading, error, data, fetchMore} = useQuery(CHARACTERS_QUERY, {
      variables: {
        offset: 0,
        limit: 10,
      },
    });

    if (loading)
      return (
        <View style={styles.LoadingHolder}>
          <ActivityIndicator size={'small'} color={'white'} />
          <Text style={styles.LoadingMsg}>Fetching data ...</Text>
        </View>
      );
    if (error) return <Text>Error :(</Text>;

    // EmptyList to be implimented

    if (data?.characters?.results.length <= 0) {
      return (
        <View style={styles.EmptyList}>
          <Text style={styles.EmptyCaseText}>No Charachter found !</Text>
        </View>
      );
    }

    return (
      <View>
        {/* List of charachters  */}
        <FlatList
          onEndReachedThreshold={0.01}
          onEndReached={info => {
            //  loadMoreResults(info);
            console.log('fetching more ...', data?.characters?.results.length);
            fetchMore({
              variables: {
                offset: data?.characters?.results.length,
              },
            });
          }}
          data={data.characters.results}
          renderItem={({item}) => {
            return (
              <CharachterCard
                image={item.image}
                id={item.id}
                name={item.name}
                //       species
                // gender
              />
            );
          }}
        />
      </View>
    );
  }
  const [namequeryHolder, setnamequeryHolder] = useState('');

  // on selct Charachter
  function onSelectCharachter({
    image,
    name,
    id,
  }: {
    image: string;
    name: string;
    id: number;
  }) {
    navigation.push('CharachterDetails', {id, name, image});

    console.log('selectedCharacter id :' + name);
  }

  // search for character by name (on the fly)
  function searchForUserByName(input: string) {
    setnamequeryHolder(input);
    console.log('https://rickandmortyapi.com/api/character/?name=' + input);
  }

  // list Item

  type CharachterCardProps = {
    image: string;
    name: string;
    id: number;
  };

  const CharachterCard = ({image, name, id}: CharachterCardProps) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onSelectCharachter({image, name, id});
        }}>
        <View style={styles.ListItemHolder}>
          <View style={styles.pictureHolder}>
            <ActivityIndicator
              size={'small'}
              color={'black'}
              style={{position: 'absolute'}}
            />
            <Image source={{uri: image}} style={styles.pictureSize} />
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.arrow}>{'>'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {/* Search box area  */}
      <TextInput
        value={namequeryHolder}
        style={styles.searchBar}
        placeholder={'Search by name'}
        onChangeText={searchForUserByName}
      />
      <FetchCharachters />
    </View>
  );
};

const styles = StyleSheet.create({
  ListItemHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 5,
  },
  pictureHolder: {
    backgroundColor: 'gray',
    height: 60,
    width: 60,
    borderRadius: 30,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pictureSize: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  name: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
  },
  arrow: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 10,
  },
  searchBar: {
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    // margin: 10,
  },
  LoadingHolder: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#27ae60',
  },
  LoadingMsg: {
    fontWeight: 'bold',
    color: '#2c3e50',
    marginHorizontal: 10,
  },
  EmptyList: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bdc3c7',
    height: '100%',
    margin: 10,
  },
  EmptyCaseText: {
    fontWeight: 'bold',
    color: '#2c3e50',
    marginHorizontal: 10,
  },
});

export default CharacterList;
