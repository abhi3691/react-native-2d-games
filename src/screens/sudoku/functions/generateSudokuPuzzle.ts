const N = 9;
const UNASSIGNED = 0;

export type puzzleMode =
  | 'Easy'
  | 'Medium'
  | 'Hard'
  | 'Expert'
  | 'Master'
  | 'Extreme';

const isValid = (
  grid: number[][],
  row: number,
  col: number,
  num: number,
): boolean => {
  // Check if num is not in the current row
  for (let x = 0; x < N; x++) {
    if (grid[row][x] === num) {
      return false;
    }
  }

  // Check if num is not in the current column
  for (let x = 0; x < N; x++) {
    if (grid[x][col] === num) {
      return false;
    }
  }

  // Check if num is not in the current 3x3 subgrid
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let r = 0; r < 3; r++) {
    for (let d = 0; d < 3; d++) {
      if (grid[startRow + r][startCol + d] === num) {
        return false;
      }
    }
  }

  return true;
};

const fillGrid = (grid: number[][]): boolean => {
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (grid[row][col] === UNASSIGNED) {
        const numbers = Array.from({length: N}, (_, i) => i + 1).sort(
          () => Math.random() - 0.5,
        );
        for (const num of numbers) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGrid(grid)) {
              return true;
            }
            grid[row][col] = UNASSIGNED;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const removeClues = (grid: number[][], cluesCount: number): number[][] => {
  const puzzle = grid.map(row => row.slice());
  let cluesPlaced = 0;

  while (cluesPlaced < cluesCount) {
    const row = Math.floor(Math.random() * N);
    const col = Math.floor(Math.random() * N);

    if (puzzle[row][col] !== UNASSIGNED) {
      puzzle[row][col] = UNASSIGNED;
      cluesPlaced++;
    }
  }

  return puzzle;
};

const generateSudokuPuzzle = (mode: puzzleMode): [number[][], number[][]] => {
  const solution: number[][] = Array.from({length: N}, () =>
    Array(N).fill(UNASSIGNED),
  );
  fillGrid(solution);

  let numberOfClues: number;
  switch (mode) {
    case 'Easy':
      numberOfClues = 40; // More clues for easier difficulty
      break;
    case 'Medium':
      numberOfClues = 35;
      break;
    case 'Hard':
      numberOfClues = 30;
      break;
    case 'Expert':
      numberOfClues = 25;
      break;
    case 'Master':
      numberOfClues = 20;
      break;
    case 'Extreme':
      numberOfClues = 17; // Minimum clues for hardest difficulty
      break;
    default:
      numberOfClues = 30; // Default to 'hard' difficulty
      break;
  }

  const puzzle = removeClues(solution, N * N - numberOfClues);

  return [puzzle, solution];
};

export {generateSudokuPuzzle};
