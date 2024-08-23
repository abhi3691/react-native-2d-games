interface CheckProps {
  gameState: (string | null)[][]; // Adjusted type to better reflect the possible values
  setFinishedArrayState: (value: number[]) => void;
}

export const checkWinner = ({gameState, setFinishedArrayState}: CheckProps) => {
  // Check rows
  for (let row = 0; row < gameState.length; row++) {
    const [a, b, c] = gameState[row];
    if (a !== null && a === b && b === c) {
      setFinishedArrayState([row * 3, row * 3 + 1, row * 3 + 2]);
      return a;
    }
  }

  // Check columns
  for (let col = 0; col < gameState[0].length; col++) {
    const [a, b, c] = [gameState[0][col], gameState[1][col], gameState[2][col]];
    if (a !== null && a === b && b === c) {
      setFinishedArrayState([col, col + 3, col + 6]);
      return a;
    }
  }

  // Check diagonals
  const [a1, b1, c1] = [gameState[0][0], gameState[1][1], gameState[2][2]];
  if (a1 !== null && a1 === b1 && b1 === c1) {
    setFinishedArrayState([0, 4, 8]);
    return a1;
  }

  const [a2, b2, c2] = [gameState[0][2], gameState[1][1], gameState[2][0]];
  if (a2 !== null && a2 === b2 && b2 === c2) {
    setFinishedArrayState([2, 4, 6]);
    return a2;
  }

  // Check for draw
  const isDrawMatch = gameState
    .flat()
    .every(cell => cell === 'circle' || cell === 'cross');
  if (isDrawMatch) {
    return 'draw';
  }

  // No winner yet
  return null;
};
