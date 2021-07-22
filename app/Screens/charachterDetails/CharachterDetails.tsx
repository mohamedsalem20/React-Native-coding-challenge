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
    <ScrollView>
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
        {moreInfo.species}
      </Text>
      <Text
        style={{
          color: 'gray',
          fontSize: 20,
        }}>
        {moreInfo.gender}
      </Text>

      {/* list of episodes */}
      <Text>episodes : </Text>

      {moreInfo.episode.map(item => {
        return (
          <View
            key={item.name}
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
      })}
    </ScrollView>
  );
};

export default CharachterDetails;
