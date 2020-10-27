import { getGridWidth, getGridHeight } from '../../utils/grid'

/**
 * Generate the maze using the binary tree algorithm
 * @param {2DArray} grid 
 * @param {String} bias 
 */
const genBinaryTreeMaze = (grid, bias) => {
  let height = getGridHeight(grid)
  let width = getGridWidth(grid)
  if (height % 2 === 0) --height
  if (width % 2 === 0) --width
  const mapHeight = Math.round(height / 2)
  const mapWidth = Math.round(width / 2)
  const map = getMap(bias, mapHeight, mapWidth)

  const newGrid = grid.map(row => row.map(col => col))
  
  for(let y = 0; y < mapHeight; ++ y) {
    const gridY = (y * 2)

    for(let x = 0; x < mapWidth; ++x) {
      const gridX = (x * 2)

      newGrid[gridY][gridX].isWall = true

      if(map[y][x]['n'] === 1) newGrid[(gridY-1)][gridX].isWall = true
      if(map[y][x]['s'] === 1) newGrid[(gridY+1)][gridX].isWall = true
      if(map[y][x]['e'] === 1) newGrid[gridY][(gridX+1)].isWall = true
      if(map[y][x]['w'] === 1) newGrid[gridY][(gridX-1)].isWall = true
    }
  }
  
  return newGrid
}

/**
 * If the direction is invalid, assign a default value
 * @param {String} dir
 * @return {String}
 */
const getValidDirection = (dir) => {
  const dirs = ['ne', 'nw', 'sw', 'se']
  const randomDir = dirs[Math.random() * (dirs.length-1)]
  return (dir !== 'ne' && dir !== 'nw' && dir !== 'sw' && dir !== 'se') ?  randomDir : dir
}

/**
 * Create the map used by the binary tree algorithm
 * @param {Integer} height
 * @param {Integer} width
 * @return {2DArray} map
 */
const initializeMap = (height, width) => {
  return new Array(height).fill([]).map(row => new Array(width).fill(0).map(col => {
    return {'n':0,'s':0,'e':0,'w':0}
  }))
}

/**
 * Get the opposite direction given a direction
 * @param {String} dir
 * @return {String}
 */
const getOppDirection = (dir) => {
  switch (dir) {
    case 'n': return 's'
    case 's': return 'n'
    case 'e': return 'w'
    default: return 'e'
  }
}

/**
 * Generate the maze using the binary tree algorithm
 * @param {Integer} height 
 * @param {Integer} width 
 * @param {String} bias
 * @return {2DArray}
 */
const getMap = (bias, height, width) => {
  const map = initializeMap(height, width)
  const dir = getValidDirection(bias)

  const dirs = []
  dirs.push(dir === 'ne' || dir === 'nw' ? 'n' : 's')
  dirs.push(dir === 'ne' || dir === 'se' ? 'e' : 'w')

  for(let y = 0; y < height; ++y) {
    const trueY = (dirs[0] === 'n' ? height-(y+1) : y)

    for(let x = 0; x < width; ++x) {
      const trueX = (dirs[1] === 'w' ? width-(x+1) : x)
      let haveMoved = false

      const borderY = ((trueY === 0 && dirs[0] === 'n') || (trueY === height-1 && dirs[0] === 's'))
      const borderX = ((trueX === 0 && dirs[1] === 'w') || (trueX === height-1 && dirs[1] === 'e'))
      if (borderY && borderX) break

      if (borderX || borderY) {
        map[trueY][trueX][dirs[(borderY ? 1 : 0)]] = 1
        const row = trueY + (borderY ? 0 : (dirs[0] === 'n' ? -1 : 1))
        const col = trueX + (borderX ? 0 : (dirs[1] === 'w' ? -1 : 1))
        if (map[row][col] !== 1) continue
        map[row][col] = 1
        haveMoved = true
      }

      if(!haveMoved) {
        let moveDir = dirs[Math.floor((Math.random()*1000)%2)]
        map[trueY][trueX][moveDir] = 1
        const row = (trueY + (moveDir === 'n' ? -1 : ( moveDir === 's' ? 1 : 0)))
        const col = trueX + (moveDir === 'w' ? -1 : (moveDir === 'e' ? 1 : 0))
        if (map[row][col] === 1) continue
        map[row][col][getOppDirection(moveDir)] = 1
      }
    }
  }
  return map
}

export {
  genBinaryTreeMaze
}
