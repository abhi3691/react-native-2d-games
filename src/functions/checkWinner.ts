interface checkProps {
  gameState: any;
  setFinishedArrayState: (value: any[]) => void;
}

export const checkWinner = ({gameState, setFinishedArrayState}: checkProps) => {
  // row dynamic
  for (let row = 0; row < gameState.length; row++) {
    if (
      gameState[row][0] === gameState[row][1] &&
      gameState[row][1] === gameState[row][2]
    ) {
      setFinishedArrayState([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
      return gameState[row][0];
    }
  }

  // column dynamic
  for (let col = 0; col < gameState.length; col++) {
    if (
      gameState[0][col] === gameState[1][col] &&
      gameState[1][col] === gameState[2][col]
    ) {
      setFinishedArrayState([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]);
      return gameState[0][col];
    }
  }

  if (
    gameState[0][0] === gameState[1][1] &&
    gameState[1][1] === gameState[2][2]
  ) {
    return gameState[0][0];
  }

  if (
    gameState[0][2] === gameState[1][1] &&
    gameState[1][1] === gameState[2][0]
  ) {
    return gameState[0][2];
  }

  const isDrawMatch = gameState.flat().every((e: any) => {
    if (e === 'circle' || e === 'cross') {
      return true;
    }
  });

  if (isDrawMatch) {
    return 'draw';
  }

  return null;
};
