import React from 'react';
import {Image, View, Text, ScrollView} from 'react-native';
import {styles} from '../styles/Styles';

interface episode {
  episode: [{name: string; air_date: string}];
}
const CharachterDetails = ({
  route,
}: {
  route: {
    params: {
      image: string;
      name: string;
      moreInfo: {
        episode: [{name: string; air_date: string}];
        species: string;
        gender: string;
      };
    };
  };
}) => {
  const image = route.params.image;
  const name = route.params.name;
  const moreInfo = route.params.moreInfo;

  return (
    <ScrollView style={styles.DetailsScreen}>
      <View>
        <Image source={{uri: image}} style={styles.CoverImage} blurRadius={3} />
        <View style={styles.proflieImageHolder}>
          <View style={styles.DetailsV1}>
            <Image source={{uri: image}} style={styles.proflieImage} />
            <View>
              <Text style={styles.characterName}>{name}</Text>
              <View style={styles.detailsV2}>
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
      <View style={styles.episodsV}>
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
