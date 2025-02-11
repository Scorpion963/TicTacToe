import findBestMove from '../utils/findBestMove';
import GameMode from './GameMode';

const AIGameMode: GameMode = {
  handleMove: (value, crosses, zeros) => {
    const newCrosses = [...crosses, value];
    const bestMove = findBestMove(newCrosses, zeros);
    return [...zeros, bestMove];
  },
};

export default AIGameMode