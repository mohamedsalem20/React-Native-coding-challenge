import React from 'react';
import {FlatList} from 'react-native';
import {Image} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native';

const CharachterDetails = ({route}: any) => {
  const image = route.params.image;
  const name = route.params.name;
  const id = route.params.id;

  return (
    <View>
      <Image
        source={{uri: image}}
        style={{
          height: 200,
          width: 200,
        }}
      />
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 30,
        }}>
        {name}
      </Text>
      <Text
        style={{
          color: 'gray',
          fontSize: 20,
        }}>
        species
      </Text>
      <Text
        style={{
          color: 'gray',
          fontSize: 20,
        }}>
        gender
      </Text>

      {/* list of episodes */}
      <Text>episodes : </Text>
      <FlatList
        data={[
          {
            id: 1,
            name: 'Pilot',
            air_date: 'December 2, 2013',
          },
        ]}
        renderItem={({item}) => {
          return (
            <View
              style={{
                backgroundColor: 'gray',
                padding: 10,
                margin: 5,
              }}>
              <Text>
                {item.name} / {item.air_date}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CharachterDetails;
