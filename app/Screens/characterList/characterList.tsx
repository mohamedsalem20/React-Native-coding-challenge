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

const CharacterList = () => {
  const [namequeryHolder, setnamequeryHolder] = useState('');

  const [isLoading, setisLoading] = useState(false);

  const resultsSimulation = [
    {
      id: 361,
      name: 'Toxic Rick',
      image: 'https://rickandmortyapi.com/api/character/avatar/361.jpeg',
    },
    {
      id: 2,
      name: 'Morty Smith',
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    },
    {
      id: 183,
      name: 'Johnny Depp',
      image: 'https://rickandmortyapi.com/api/character/avatar/183.jpeg',
    },
  ];

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
      {/* Loading Case */}
      {isLoading ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 10,
            backgroundColor: '#27ae60',
          }}>
          <ActivityIndicator size={'small'} color={'white'} />
          <Text
            style={{
              fontWeight: 'bold',
              color: '#2c3e50',
              marginHorizontal: 10,
            }}>
            Fetching data ...
          </Text>
        </View>
      ) : null}
      {/* Empty state Case  */}
      {!isLoading && resultsSimulation.length == 0 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#bdc3c7',
            height: '100%',
            margin: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#2c3e50',
              marginHorizontal: 10,
            }}>
            No Charachter found !
          </Text>
        </View>
      ) : null}
      {/* List of charachters  */}
      <FlatList
        data={resultsSimulation}
        renderItem={({item}) => {
          return (
            <CharachterCard image={item.image} id={item.id} name={item.name} />
          );
        }}
      />
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
    margin: 10,
  },
});

export default CharacterList;
