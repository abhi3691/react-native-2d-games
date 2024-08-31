import React, {useCallback} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Chess} from 'chess.js'; // Ensure Chess is imported

import {toTranslation, SIZE, toPosition} from '../../functions/Notation';

const styles = StyleSheet.create({
  piece: {
    width: SIZE,
    height: SIZE,
  },
  possibleMoveIndicator: {
    position: 'absolute',
    width: SIZE * 0.3,
    height: SIZE * 0.3,
    borderRadius: SIZE * 0.3,
    backgroundColor: 'rgba(255,0,0,0.5)', // Semi-transparent red for visibility
  },
});

type Player = 'b' | 'w';
type Type = 'q' | 'r' | 'n' | 'b' | 'k' | 'p';
type Piece = `${Player}${Type}`;
type Pieces = Record<Piece, ReturnType<typeof require>>;
export const PIECES: Pieces = {
  br: require('../../../../assets/br.png'),
  bp: require('../../../../assets/bp.png'),
  bn: require('../../../../assets/bn.png'),
  bb: require('../../../../assets/bb.png'),
  bq: require('../../../../assets/bq.png'),
  bk: require('../../../../assets/bk.png'),
  wr: require('../../../../assets/wr.png'),
  wn: require('../../../../assets/wn.png'),
  wb: require('../../../../assets/wb.png'),
  wq: require('../../../../assets/wq.png'),
  wk: require('../../../../assets/wk.png'),
  wp: require('../../../../assets/wp.png'),
};

interface PieceProps {
  id: Piece;
  startPosition: {x: number; y: number};
  chess: Chess;
  onTurn: () => void;
  enabled: boolean;
  onPress: () => void;
  isHighlighted: boolean;
  possibleMoves: Array<{x: number; y: number}>;
}

const Piece = ({
  id,
  startPosition,
  chess,
  onTurn,
  enabled,
  onPress,
  isHighlighted,
  possibleMoves,
}: PieceProps) => {
  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(startPosition.x * SIZE);
  const translateY = useSharedValue(startPosition.y * SIZE);

  const movePiece = useCallback(
    (to: {x: number; y: number}) => {
      const fromPos = toPosition({
        x: Math.round(translateX.value / SIZE),
        y: Math.round(translateY.value / SIZE),
      });
      const toPos = `${'abcdefgh'[to.x]}${8 - to.y}`;
      const move = chess
        .moves({verbose: true})
        .find(m => m.from === fromPos && m.to === toPos);

      if (move) {
        // Make the move and update the board
        chess.move({from: fromPos, to: move.to});

        // Calculate new position
        const newTranslation = toTranslation(move.to);

        translateX.value = withTiming(newTranslation.x, {duration: 300}, () => {
          offsetX.value = translateX.value;
        });
        translateY.value = withTiming(newTranslation.y, {duration: 300}, () => {
          offsetY.value = translateY.value;
        });
        isGestureActive.value = false;
        runOnJS(onTurn)();
      } else {
        // Revert to the original position if the move is invalid
        translateX.value = withSpring(startPosition.x * SIZE);
        translateY.value = withSpring(startPosition.y * SIZE);
      }
    },
    [
      translateX,
      translateY,
      chess,
      onTurn,
      offsetX,
      offsetY,
      isGestureActive,
      startPosition.x,
      startPosition.y,
    ],
  );

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      runOnJS(onPress)();
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
      isGestureActive.value = true;
    },
    onActive: ({translationX, translationY}) => {
      translateX.value = offsetX.value + translationX;
      translateY.value = offsetY.value + translationY;
    },
    onEnd: ({translationX, translationY}) => {
      // Determine target position
      const targetX = Math.floor((offsetX.value + translationX) / SIZE);
      const targetY = Math.floor((offsetY.value + translationY) / SIZE);

      // Ensure target position is within bounds
      if (targetX >= 0 && targetX < 8 && targetY >= 0 && targetY < 8) {
        runOnJS(movePiece)({x: targetX, y: targetY});
      } else {
        // If out of bounds, revert to the original position
        translateX.value = withSpring(startPosition.x * SIZE);
        translateY.value = withSpring(startPosition.y * SIZE);
      }
      isGestureActive.value = false;
    },
    onFinish: () => {
      isGestureActive.value = false;
    },
  });

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    zIndex: isGestureActive.value ? 100 : 10,
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PanGestureHandler onGestureEvent={onGestureEvent} enabled={enabled}>
        <Animated.View style={style}>
          <Image source={PIECES[id]} style={styles.piece} />
        </Animated.View>
      </PanGestureHandler>
      {isHighlighted &&
        possibleMoves.map(({x, y}) => (
          <View
            key={`${x}-${y}`}
            style={[
              styles.possibleMoveIndicator,
              {
                left: x * SIZE + SIZE * 0.4,
                top: y * SIZE + SIZE * 0.4,
              },
            ]}
          />
        ))}
    </GestureHandlerRootView>
  );
};

export default Piece;
