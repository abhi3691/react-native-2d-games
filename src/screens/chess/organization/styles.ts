import {StyleSheet} from 'react-native';
const TILE_SIZE = 50;
const BOARD_SIZE = 8;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  board: {
    flexDirection: 'column',
    width: TILE_SIZE * BOARD_SIZE,
    height: TILE_SIZE * BOARD_SIZE,
  },
  row: {
    flexDirection: 'row',
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  piece: {
    fontSize: 50,
  },
});

export default styles;
