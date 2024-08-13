import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  turnText: {
    fontSize: 24,
    marginBottom: 20,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  winnText: {
    fontSize: 100,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'green',
  },
  winnerText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'green',
  },
  resetButton: {
    marginTop: 20,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
});
export default styles;
