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
import {Button} from 'react-native';

const CharacterList = ({navigation}) => {
  const [namequeryHolder, setnamequeryHolder] = useState('');
  const [nextPage, setnextPage] = useState(0);

  const GET_CHARACHTERS = gql`
    query Characters($charactersPage: Int) {
      characters(page: $charactersPage) {
        results {
          id
          name
          image
          species
          gender
          episode {
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
        count
      }
    }
  }
`;
  const [results, setresults] = useState([]);
  const [Limit, setLimit] = useState(5);

  function FetchCharachters() {
    const {loading, error, data, fetchMore} = useQuery(GET_CHARACHTERS, {
      variables: {
        charactersPage: 1,
      },
    });

    function loadMore() {
      console.log('loadMore');

      if (data.characters.info.next) {
        fetchMore({
          variables: {
            charactersPage: data.characters.info?.next,
          },
        });
      }
    }

    if (loading)
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <ActivityIndicator size={'small'} color={'white'} />
          <Text
            style={{
              color: 'white',
              marginHorizontal: 10,
            }}>
            Loadin charachters ...
          </Text>
        </View>
      );
    if (error)
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <Text
            style={{
              color: 'white',
              marginHorizontal: 10,
            }}>
            No charachter found.
          </Text>
        </View>
      );

    // EmptyList to be implimented

    if (data?.characters?.results.length <= 0) {
      return (
        <View style={styles.EmptyList}>
          <Text style={styles.EmptyCaseText}>No Charachter found !</Text>
        </View>
      );
    }

    // setresults([...results, ...data.characters.results]);
    // setresults(data.characters.results);

    const newReslut = data.characters.results;

    const mergedResult = [...results, ...newReslut];

    setresults(newReslut);
    return (
      <View>
        <Text
          style={{
            color: 'white',
          }}>
          {data.characters.results.length}
        </Text>
        <Button
          title={'load more'}
          onPress={() => {
            console.log('load more');

            // const {next} = data.charachters.info.next;

            // setnextPage(data.characters.info.next);

            // fetchMoreResult.viewer.repositories.edges = [
            //         ...prevResult.viewer.repositories.edges,
            //         ...fetchMoreResult.viewer.repositories.edges,
            //       ]

            // fetchMore({
            //   variables: {page: next},
            //   updateQuery: (prevResult, {fetchMoreResult}) => {
            //     fetchMoreResult.viewer.repositories.edges = [
            //       ...prevResult.viewer.repositories.edges,
            //       ...fetchMoreResult.viewer.repositories.edges,
            //     ];
            //     return fetchMoreResult;
            //   },
            // });
            if (data.characters.info.next) {
              fetchMore({
                variables: {
                  charactersPage: data.characters.info.next,
                },
              });
            }
          }}
        />
        {/* List of charachters  */}
        <FlatList
          ListFooterComponent={() => {
            return (
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  marginVertical: 50,
                }}>
                Loading more ...
              </Text>
            );
          }}
          numColumns={3}
          keyboardShouldPersistTaps="always"
          onEndReachedThreshold={0.01}
          onEndReached={loadMore}
          // data={results}
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
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const SearchBox = () => {
    return (
      <View>
        <TextInput
          value={namequeryHolder}
          style={{
            backgroundColor: 'white',
            padding: 10,
            marginHorizontal: 20,
            borderRadius: 5,
          }}
          placeholder={'Search by name'}
          onChangeText={searchForUserByName}
        />

        {/* Clear search box  */}
        {namequeryHolder.length > 0 ? (
          <TouchableOpacity
            onPress={() => {
              setnamequeryHolder('');
            }}
            style={{
              position: 'absolute',
              right: 25,
              top: 15,
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
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#223762',
        flex: 1,
        height: '100%',
      }}>
      {/* Search box area  */}
      <View style={{height: '10%'}}>
        <View>
          <TextInput
            value={namequeryHolder}
            style={{
              backgroundColor: 'white',
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 5,
              height: 40,
            }}
            placeholder={'Search by name'}
            onChangeText={searchForUserByName}
          />

          {/* Clear search box  */}
          {namequeryHolder !== '' ? (
            <TouchableOpacity
              onPress={() => {
                setnamequeryHolder('');
              }}
              style={{
                position: 'absolute',
                right: 25,
                top: 15,
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
      </View>
      <View style={{height: '90%'}}>
        <FetchCharachters />
      </View>
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
