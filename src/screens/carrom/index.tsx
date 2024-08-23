import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Piece from './Piece';

const {width} = Dimensions.get('window');
const BOARD_SIZE = width * 0.8;

const Board = () => {
  const [pieces, setPieces] = useState([
    {id: '1', x: BOARD_SIZE / 2, y: BOARD_SIZE / 2},
    {id: '2', x: BOARD_SIZE / 4, y: BOARD_SIZE / 4},
    // Add more pieces as needed
  ]);

  const movePiece = (id: string, x: number, y: number) => {
    setPieces(prev =>
      prev.map(piece => (piece.id === id ? {...piece, x, y} : piece)),
    );
  };

  return (
    <GestureHandlerRootView style={styles.board}>
      <View style={styles.board}>
        {pieces.map(piece => (
          <Piece
            key={piece.id}
            id={piece.id}
            x={piece.x}
            y={piece.y}
            movePiece={movePiece}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: '#000',
    borderRadius: BOARD_SIZE / 2,
    borderWidth: 5,
    borderColor: '#fff',
    position: 'relative',
  },
});

export default Board;
