import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CharacterList = () => {
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

  // on selectect Charachter
  function onSelectCharachter(id: number) {
    console.log('selectedCharacter id :' + id);
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
});

export default CharacterList;
