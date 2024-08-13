import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Animated, {ZoomIn} from 'react-native-reanimated';
import {Socket} from 'socket.io-client';
import styles from './styles';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface Props {
  index: number;
  board: string[];
  winner: string | null;
  socket: Socket;
  disabled: boolean;
  roomId: string; // Add roomId as a prop
}

const RenderCell: FC<Props> = ({
  index,
  board,
  winner,
  socket,
  disabled,
  roomId,
}) => {
  const handlePress = (inx: number) => {
    if (!winner && board[inx] === '') {
      socket.emit('move', {index: inx, roomId}); // Pass roomId with the move event
    }
  };

  return (
    <AnimatedTouchableOpacity
      style={[styles.cell]}
      entering={ZoomIn.duration(500).delay(250 * index)}
      onPress={() => handlePress(index)}
      disabled={disabled}>
      <Text style={styles.cellText}>{board[index]}</Text>
    </AnimatedTouchableOpacity>
  );
};

export default RenderCell;
