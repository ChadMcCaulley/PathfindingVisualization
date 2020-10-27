const coin_flip = () => Math.round(Math.random())

const  binaryTreeMaze = (grid) => {
  if (!grid[0]) throw Error('Grid must contain at least one row')
  const height = grid.length
  const width = grid[0].length
  
  return grid
} 