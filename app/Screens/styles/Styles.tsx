import {Dimensions, StyleSheet} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const image_height = screenWidth / 2.5;
const image_width = screenWidth / 3.2;

export const styles = StyleSheet.create({
  imageSize: {
    height: image_height,
    width: image_width,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ImageHolder: {
    height: screenWidth / 2.5,
    width: screenWidth / 3.2,
    marginHorizontal: 4,
    marginVertical: 20,
  },
  charachterName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  SearchBox: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  SearchAreaClearBtn: {
    position: 'absolute',
    right: 25,
    top: 15,
  },
  XBtn: {
    backgroundColor: 'red',
    height: 20,
    width: 20,
    borderRadius: 10,
    textAlign: 'center',
    color: 'white',
  },
  DetailsScreen: {
    backgroundColor: '#223762',
  },
  CoverImage: {
    height: 200,
    width: '100%',
  },
  proflieImageHolder: {
    position: 'absolute',
    bottom: -90,
    left: 10,
  },
  proflieImage: {height: 150, width: 150, borderRadius: 10},
  speciesGender: {color: 'white', fontSize: 18},
  characterName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    marginHorizontal: 5,
  },
  episods: {color: 'white', fontWeight: 'bold', fontSize: 25},
  episodsList: {
    backgroundColor: '#F1F1F1',
    height: 80,
    margin: 5,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  episodTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  episeod_air_date: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
