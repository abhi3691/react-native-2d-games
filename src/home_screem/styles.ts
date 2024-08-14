import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#101010',
  },
  moveDetection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  playerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  currentMove: {
    color: 'blue',
  },
  gameHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  squareWrapper: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  finishedStateText: {
    fontSize: 24,
    marginTop: 16,
    color: 'white',
  },
  playOnline: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
  },
  playOnlineText: {
    color: 'white',
    fontSize: 18,
  },
  waitingText: {
    fontSize: 24,
  },
  resetButton: {
    backgroundColor: 'red',

    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default styles;
