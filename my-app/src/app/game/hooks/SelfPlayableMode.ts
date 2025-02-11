import GameMode from "./GameMode";

const SelfPlayableMode: GameMode = {
  handleMove: (value, crosses, zeros) => {
    return [...zeros, value];
  },
};

export default SelfPlayableMode
