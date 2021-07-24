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
});
