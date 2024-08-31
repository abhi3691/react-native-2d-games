import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated';
import styles from './styles';
import {TextInput} from 'react-native';

interface SudokuCellProps {
  value: string;
  row: number;
  col: number;
  isOriginalCell: boolean;
  isIncorrect: boolean;
  onChange: (text: string) => void;
}

const SudokuCell: React.FC<SudokuCellProps> = ({
  value,
  row,
  col,
  isOriginalCell,
  onChange,
  isIncorrect,
}) => {
  const handleChange = (text: string) => {
    onChange(text);
  };

  // Determine the background color based on the 3x3 subgrid position
  const isGray = Math.floor(row / 3) % 2 === Math.floor(col / 3) % 2;
  return (
    <Animated.View
      style={[styles.cell, isGray ? styles.grayCell : styles.whiteCell]}
      entering={ZoomIn.duration(500).delay(300 * row)}>
      <TextInput
        style={[
          styles.cellInput,
          isOriginalCell ? styles.normalStyle : styles.boldStyle,
          isIncorrect ? styles.incorrectText : {}, // Apply style based on incorrect status
        ]}
        keyboardType="numeric"
        maxLength={1}
        value={value}
        onChangeText={handleChange}
        editable={isOriginalCell}
      />
    </Animated.View>
  );
};

export default SudokuCell;
