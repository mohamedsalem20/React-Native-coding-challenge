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

const CharacterList = () => {
  const characters = gql`
    query {
      characters {
        results {
          id
          name
          image
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
    const {loading, error, data} = useQuery(characters);

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
          style={{
            margin: 5,
          }}
          data={data.characters.results}
          renderItem={({item}) => {
            return (
              <CharachterCard
                image={item.image}
                id={item.id}
                name={item.name}
              />
            );
          }}
        />
      </View>
    );
  }
  const [namequeryHolder, setnamequeryHolder] = useState('');

  // on selct Charachter
  function onSelectCharachter(id: number) {
    console.log('selectedCharacter id :' + id);
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
          onSelectCharachter(id);
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
