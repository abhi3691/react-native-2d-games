import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface PieceProps {
  id: string;
  x: number;
  y: number;
  movePiece: (id: string, x: number, y: number) => void;
}

const Piece: React.FC<PieceProps> = ({id, x, y, movePiece}) => {
  const translateX = useSharedValue(x);
  const translateY = useSharedValue(y);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    translateX.value = withSpring(event.translationX);
    translateY.value = withSpring(event.translationY);
  };

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (event.state === 5) {
      movePiece(id, event.translationX, event.translationY);
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}>
      <Animated.View style={[styles.piece, animatedStyle]} />
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  piece: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    position: 'absolute',
  },
});

export default Piece;
