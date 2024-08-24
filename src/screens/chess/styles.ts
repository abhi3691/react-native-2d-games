import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgb(36, 35, 32)',
  },
  playerInfo: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    marginVertical: 20,
  },
  box: {
    width,
    height: width,
  },
  absolute: {
    position: 'absolute',
  },
  capturedPiecesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  capturedPiecesText: {
    fontSize: 16,
    fontWeight: '600',
  },
  pieces: {
    width: 40,
    height: 40,
  },
});

export default styles;
