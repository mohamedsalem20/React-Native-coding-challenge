import React from 'react';
import {Image} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {styles} from '../styles/Styles';

const CharachterDetails = ({route}: any) => {
  const image = route.params.image;
  const name = route.params.name;
  const moreInfo = route.params.moreInfo;

  return (
    <ScrollView style={styles.DetailsScreen}>
      <View>
        <Image source={{uri: image}} style={styles.CoverImage} blurRadius={3} />
        <View style={styles.proflieImageHolder}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <Image source={{uri: image}} style={styles.proflieImage} />
            <View>
              <Text style={styles.characterName}>{name}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 5,
                }}>
                <View>
                  <Text style={styles.speciesGender}>
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
        <Text style={styles.episods}> {moreInfo.episode.length} Episodes </Text>

        {moreInfo.episode.map(item => {
          return (
            <View key={item.name} style={styles.episodsList}>
              <View>
                <Text style={styles.episodTitle}>{item.name}</Text>
                <Text style={styles.episeod_air_date}>{item.air_date}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default CharachterDetails;
