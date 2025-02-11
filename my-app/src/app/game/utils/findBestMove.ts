import { MAX_MOVES, winningCombinations } from "../hooks/useGameLogic";

const checkWinner = (playerMoves: number[]) => {
  return winningCombinations.some((combination) =>
    combination.every((value) => playerMoves.includes(value))
  );
};

const findBestMove = (crosses: number[], zeros: number[]) => {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 1; i <= MAX_MOVES; i++) {
    if (crosses.includes(i) || zeros.includes(i)) continue;

    const newCrosses = [...crosses, i];
    const score = minimax(newCrosses, zeros, 0, false);

    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }

  return bestMove;
};

const minimax = (
  crosses: number[],
  zeros: number[],
  depth: number,
  isMaximizing: boolean
) => {
  if (checkWinner(crosses)) return 10 - depth;
  if (checkWinner(zeros)) return depth - 10;
  if (crosses.length + zeros.length === MAX_MOVES) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;

    for (let i = 1; i <= MAX_MOVES; i++) {
      if (crosses.includes(i) || zeros.includes(i)) continue;

      const newCrosses = [...crosses, i];
      const score = minimax(newCrosses, zeros, depth + 1, false);
      bestScore = Math.max(bestScore, score);
    }

    return bestScore;
  } else {
    let bestScore = +Infinity;

    for (let i = 1; i <= MAX_MOVES; i++) {
      if (crosses.includes(i) || zeros.includes(i)) continue;

      const newZeros = [...zeros, i];
      const score = minimax(crosses, newZeros, depth + 1, true);
      bestScore = Math.min(bestScore, score);
    }

    return bestScore;
  }
};

export default findBestMove;
