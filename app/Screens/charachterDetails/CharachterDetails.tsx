import React from 'react';
import {FlatList} from 'react-native';
import {Image} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const CharachterDetails = ({route}: any) => {
  const image = route.params.image;
  const name = route.params.name;
  const moreInfo = route.params.moreInfo;

  return (
    <ScrollView
      style={{
        backgroundColor: '#223762',
      }}>
      <View>
        <Image
          source={{uri: image}}
          style={{
            height: 200,
            width: '100%',
          }}
          blurRadius={3}
        />
        <View
          style={{
            position: 'absolute',
            bottom: -90,
            left: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <Image
              source={{uri: image}}
              style={{
                height: 150,
                width: 150,
                borderRadius: 10,
              }}
            />
            <View>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 30,
                  marginHorizontal: 5,
                }}>
                {name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 5,
                }}>
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                    }}>
                    {moreInfo.species}, {moreInfo.gender}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* list of episodes */}
      <View style={{marginTop: 100}}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 25,
          }}>
          {' '}
          {moreInfo.episode.length} Episodes{' '}
        </Text>

        {moreInfo.episode.map(item => {
          return (
            <View
              key={item.name}
              style={{
                backgroundColor: '#F1F1F1',
                height: 80,
                margin: 5,
                alignItems: 'center',
                flexDirection: 'row',
                padding: 10,
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  {item.air_date}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default CharachterDetails;
