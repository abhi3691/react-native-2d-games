import React, {useCallback, useEffect, useState} from 'react';
import {View, SafeAreaView, Alert, TouchableOpacity, Text} from 'react-native';
import {
  generateSudokuPuzzle,
  puzzleMode,
} from './functions/generateSudokuPuzzle';
import SudokuCell from './molecules/SudokuCell';
import styles from './styles';
import {Button, Menu} from 'react-native-paper';

const SudokuGame = () => {
  const [playerGrid, setPlayerGrid] = useState<string[][]>();
  const [originalGrid, setOriginalGrid] = useState<number[][]>([]);
  const [solved, setSolved] = useState<number[][]>([]);
  const [hintCount, setHintCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [incorrectCells, setIncorrectCells] = useState<boolean[][]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [mode, setMode] = useState<puzzleMode>('Easy');

  const listofModes: puzzleMode[] = [
    'Easy',
    'Medium',
    'Hard',
    'Expert',
    'Master',
    'Extreme',
  ];

  const newGame = useCallback(() => {
    const [grid, solution] = generateSudokuPuzzle(mode);
    setOriginalGrid(grid);
    setPlayerGrid(
      grid.map(row => row.map(cell => (cell === 0 ? '' : cell.toString()))),
    );
    setSolved(solution);
    setHintCount(0);
    setIncorrectCount(0);
    setIncorrectCells(grid.map(row => row.map(() => false)));
  }, [mode]);

  useEffect(() => {
    newGame();
  }, [newGame]);

  const restartGame = () => {
    setPlayerGrid(
      originalGrid.map(row =>
        row.map(cell => (cell === 0 ? '' : cell.toString())),
      ),
    );
    setHintCount(0);
    setIncorrectCount(0);
    setIncorrectCells(originalGrid.map(row => row.map(() => false)));
  };

  useEffect(() => {
    newGame();
  }, [newGame]);

  const handleInputChange = (value: string, row: number, col: number) => {
    // Allow input only in non-pre-filled cells
    if (value === '' || /^[1-9]$/.test(value)) {
      const newGrid = playerGrid?.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? value : c)),
      );

      setPlayerGrid(newGrid);

      if (newGrid) {
        const newIncorrectCells = incorrectCells.map(row => row.slice());
        let newIncorrectCount = incorrectCount;

        if (value && value !== solved[row][col].toString()) {
          newIncorrectCount += 1;
          newIncorrectCells[row][col] = true;
          if (newIncorrectCount >= 3) {
            Alert.alert(
              'Game Over',
              'You have made 3 incorrect entries. The game is over.',
            );
            newGame(); // Restart game or handle game over
            return;
          }
        } else {
          newIncorrectCells[row][col] = false;
        }

        setIncorrectCells(newIncorrectCells);
        setIncorrectCount(newIncorrectCount);

        if (JSON.stringify(newGrid) === JSON.stringify(solved)) {
          Alert.alert('Congratulations!', 'You have won the game!');
          newGame(); // Restart game or handle win condition
        }
      }
    } else {
      Alert.alert('Invalid Input', 'Please enter a number between 1 and 9.');
    }
  };

  const chageMode = (modeType: puzzleMode) => {
    setMode(modeType);
    closeMenu();
  };

  const openMenu = () => {
    setVisible(true);
  };
  const closeMenu = () => {
    setVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.incorrectCount}>
        Incorrect Entries: {incorrectCount} / 3
      </Text>
      <View style={styles.menu}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button
              icon={'chevron-down'}
              mode="contained-tonal"
              onPress={openMenu}>
              {mode}
            </Button>
          }
          anchorPosition="top">
          {listofModes.map((val, index) => (
            <Menu.Item onPress={() => chageMode(val)} title={val} key={index} />
          ))}
        </Menu>
      </View>
      <View style={styles.gridContainer}>
        {playerGrid?.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <SudokuCell
                key={colIndex}
                value={cell}
                row={rowIndex}
                col={colIndex}
                isOriginalCell={originalGrid[rowIndex][colIndex] === 0}
                isIncorrect={incorrectCells[rowIndex][colIndex]} // Pass incorrect status to SudokuCell
                onChange={value => handleInputChange(value, rowIndex, colIndex)}
              />
            ))}
          </View>
        ))}
      </View>
      <View style={styles.flexRow}>
        <TouchableOpacity onPress={() => newGame()} style={styles.button}>
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => restartGame()} style={styles.button}>
          <Text style={styles.buttonText}>Reset Game</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SudokuGame;
