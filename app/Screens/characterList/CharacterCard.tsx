// list Item
import React from 'react';

import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';

export const CharachterCard = ({
  image,
  name,
  id,
  moreInfo,
}: {
  image: string;
  name: string;
  id: number;
  moreInfo: object;
}) => {
  const screenWidth = Dimensions.get('window').width;

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

  return (
    <TouchableOpacity
      style={{}}
      onPress={() => {
        onSelectCharachter({image, name, id, moreInfo});
      }}>
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
