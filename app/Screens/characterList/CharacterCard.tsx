// list Item
import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles/Styles';

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
  const navigation = useNavigation();
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
      <View style={styles.ImageHolder}>
        <Image
          source={{uri: image}}
          style={styles.imageSize}
          resizeMode={'stretch'}
        />
        <Text style={styles.charachterName}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};
