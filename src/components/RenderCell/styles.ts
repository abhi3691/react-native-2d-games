import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  square: {
    width: '30%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 10,
    margin: 5,
  },
  icon: {
    width: 50,
    height: 50,
  },
  defaultSquare: {
    backgroundColor: 'transparent',
  },
  greyBackground: {
    backgroundColor: 'grey',
  },
  winningSquare: {
    backgroundColor: 'green',
  },
});
export default styles;
