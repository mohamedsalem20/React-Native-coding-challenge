import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
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
import {Button} from 'react-native';

const CharacterList = () => {
  const [namequeryHolder, setnamequeryHolder] = useState('');
  const [nextPage, setnextPage] = useState(0);

  const CHARACTERS_QUERY = gql`
    query {
      characters(filter: {name: "${namequeryHolder}"}, page : ${nextPage}) {
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
        }
      }
    }
  `;

  const CHARACTERS_QUERY_FILTER = gql`
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
      }
    }
  }
`;
  const [results, setresults] = useState([]);

  const navigation = useNavigation();

  function FetchCharachters() {
    const {loading, error, data, fetchMore} = useQuery(
      namequeryHolder.length > 0 ? CHARACTERS_QUERY_FILTER : CHARACTERS_QUERY,
    );

    function loadMore() {
      const next = data?.characters.info.next;
      setnextPage(next);

      fetchMore({
        query: CHARACTERS_QUERY,
        updateQuery: (prev, {fetchMoreResult}) => {
          console.log('fetchMoreResult IDS');

          fetchMoreResult.characters.results.forEach(elm => {
            console.log(elm.id);
          });

          console.log('prev IDS');

          prev.characters.results.forEach(elm => {
            console.log(elm.id);
          });

          if (!fetchMoreResult) {
            return prev;
          }
          // return Object.assign({}, prev, {
          //   characters: [...prev.characters, ...fetchMoreResult.characters],
          // });
          // console.log(prev);
          const newReuslt = fetchMoreResult.characters.results;
          setresults([...results, ...newReuslt]);
        },
      });
    }

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
        {/* <Button title={'load more'} onPress={loadMore} /> */}
        {/* List of charachters  */}
        <FlatList
          style={{margin: 5}}
          numColumns={3}
          keyboardShouldPersistTaps="always"
          onEndReachedThreshold={0.01}
          onEndReached={loadMore}
          data={results}
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

  // on selct Charachter
  function onSelectCharachter({
    image,
    name,
    id,
    moreInfo,
  }: {
    image: string;
    name: string;
    id: number;
    moreInfo: object;
  }) {
    navigation.push('CharachterDetails', {id, name, image, moreInfo});
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
    moreInfo: object;
  };

  const screenWidth = Dimensions.get('window').width;
  const CharachterCard = ({image, name, id, moreInfo}: CharachterCardProps) => {
    return (
      <TouchableOpacity
        style={{}}
        onPress={() => {
          onSelectCharachter({image, name, id, moreInfo});
        }}>
        {/* <View style={styles.ListItemHolder}>
          <View style={styles.pictureHolder}>
            <ActivityIndicator
              size={'small'}
              color={'black'}
              style={{position: 'absolute'}}
            />
            <Image source={{uri: image}} style={styles.pictureSize} />
          </View>
          <Text style={styles.name}>{name}</Text>
        </View> */}
        <View
          style={{
            height: screenWidth / 2.5,
            width: screenWidth / 3.2,
            marginHorizontal: 4,
            marginVertical: 20,
          }}>
          <Image
            source={{uri: image}}
            style={{
              height: screenWidth / 2.5,
              width: screenWidth / 3.2,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
            resizeMode={'stretch'}
          />
          <Text style={{color: 'white', fontWeight: 'bold'}}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#223762',
        flex: 1,
      }}>
      {/* Search box area  */}
      <View style={{}}>
        <TextInput
          value={namequeryHolder}
          style={{
            backgroundColor: 'white',
            padding: 10,
            marginHorizontal: 10,
            marginTop: 10,
          }}
          placeholder={'Search by name'}
          onChangeText={searchForUserByName}
        />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
            marginLeft: 10,
          }}>
          Rick and Morty ({results.length})
        </Text>
        {/* Clear search box  */}
        {namequeryHolder.length > 0 ? (
          <TouchableOpacity
            onPress={() => {
              setnamequeryHolder('');
            }}
            style={{
              position: 'absolute',
              right: 35,
              top: 25,
            }}>
            <Text
              style={{
                backgroundColor: 'red',
                height: 20,
                width: 20,
                borderRadius: 10,
                textAlign: 'center',
                color: 'white',
              }}>
              X
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <FetchCharachters />
    </View>
  );
};

const styles = StyleSheet.create({
  ListItemHolder: {
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 5,
  },
  pictureHolder: {
    backgroundColor: 'gray',
    // height: 60,
    // width: 60,
    borderRadius: 30,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pictureSize: {
    height: 150,
    width: 90,
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
  clearSearchTextBtn: {},
  clearSearchText: {},
});

export default CharacterList;
