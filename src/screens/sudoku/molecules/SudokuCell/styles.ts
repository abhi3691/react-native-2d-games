import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellInput: {
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  grayCell: {
    backgroundColor: '#d3d3d3', // Light gray color
  },
  whiteCell: {
    backgroundColor: '#ffffff', // White color
  },
  boldStyle: {
    fontWeight: 'bold',
    color: 'black',
  },
  normalStyle: {
    fontWeight: '500',
    color: 'gray',
  },
  incorrectText: {
    color: 'red',
  },
});

export default styles;
