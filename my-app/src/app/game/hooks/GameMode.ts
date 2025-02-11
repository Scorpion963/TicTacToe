type GameMode = {
  handleMove: (
    value: number,
    crosses: number[],
    zeros: number[]
  ) => number[];
}

export default GameMode