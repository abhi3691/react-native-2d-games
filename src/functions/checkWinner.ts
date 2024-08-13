export const checkWinner = (board: string[]): string | null => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check for a winner
  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the winning symbol
    }
  }

  // Check for a draw
  const isDraw = board.every(cell => cell !== '');
  if (isDraw) {
    return 'X O'; // Return "Draw" if no empty cells are left
  }

  // No winner and not a draw
  return null;
};
