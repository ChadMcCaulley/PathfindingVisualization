const coin_flip = () => Math.round(Math.random())

/**
 * If the direction is invalid, assign a default value
 * @param {String} dir
 * @return {String}
 */
const getValidDirection = (dir) => {
  return (dir !== 'ne' && dir !== 'nw' && dir !== 'sw' && dir !== 'se') ? 'nw' : dir
}

/**
 * Create the map used by the binary tree algorithm
 * @param {2DArray} grid
 * @return {2DArray} map
 */
const getMap = (grid) => {
  const width = grid.length
  const height = grid[0].length
  return new Array(height).fill([]).map(row => new Array(width).map(col => {
    return {'n':0,'s':0,'e':0,'w':0}
  }))
}

/**
 * Generate the maze using the binary tree algorithm
 * @param {2DArray} grid 
 * @param {String} bias 
 */
const genBinaryTreeMaze = (grid, bias) => {
  const map = getMap(grid)
  const dir = getValidDirection(bias)

  const dirs = []
  dirs.push(dir === 'ne' || dir === 'nw' ? 'n' : 's');
  dirs.push(dir === 'ne' || dir === 'se' ? 'e' : 'w');

  for(var y = 0; y < this.h; ++y)
  {
    var trueY = (dir === 'nw' || dir === 'ne' ? this.h-(y+1) : y);

    for(var x = 0; x < this.w; ++x)
    {
      var trueX = (dir === 'nw' || dir === 'sw' ? this.w-(x+1) : x);
      var m = 0;

      // If we're at the opposite corners for our movement, break!
      if(trueY === 0 && dirs[0] === 'n' && ((trueX === 0 && dirs[1] === 'w') || (trueX === (this.w-1) && dirs[1] === 'e'))) { break; }
      if(trueY === (this.h-1) && dirs[0] === 's' && ((trueX === 0 && dirs[1] === 'w') || (trueX === (this.w-1) && dirs[1] === 'e'))) { break; }

      // If we're at an opposite border, move the only way we can...
      if(trueY === 0 && dirs[0] === 'n') { this.map[trueY][trueX][dirs[1]] = 1; this.map[trueY][(trueX+(dirs[1] === 'w'?-1:1))][(dirs[1] === 'w'?'e':'w')] = 1; m = 1; }
      else if(trueY === (this.h-1) && dirs[0] === 's') { this.map[trueY][trueX][dirs[1]] = 1; this.map[trueY][(trueX+(dirs[1] === 'w'?-1:1))][(dirs[1] === 'w'?'e':'w')] = 1; m = 1; }
      else if(trueX === 0 && dirs[1] === 'w') { this.map[trueY][trueX][dirs[0]] = 1; this.map[(trueY+(dirs[0] === 'n'?-1:1))][trueX][(dirs[0] === 'n'?'s':'n')] = 1; m = 1; }
      else if(trueX === (this.w-1) && dirs[1] === 'e') { this.map[trueY][trueX][dirs[0]] = 1; this.map[(trueY+(dirs[0] === 'n'?-1:1))][trueX][(dirs[0] === 'n'?'s':'n')] = 1; m = 1; }

      if(m === 0)
      {
        var mov = dirs[Math.floor((Math.random()*1000)%2)];

        if(mov === 'n') { this.map[trueY][trueX][mov] = 1; this.map[(trueY-1)][trueX]['s'] = 1; }
        else if(mov === 's') { this.map[trueY][trueX][mov] = 1; this.map[(trueY+1)][trueX]['n'] = 1; }
        else if(mov === 'w') { this.map[trueY][trueX][mov] = 1; this.map[trueY][(trueX-1)]['e'] = 1; }
        else if(mov === 'e') { this.map[trueY][trueX][mov] = 1; this.map[trueY][(trueX+1)]['w'] = 1; }
      }
    }
  }
}

export {
  genBinaryTreeMaze
}


// Maze.prototype.toGrid = function()
// {
// 	var grid = new Array();
// 	for(var mh = 0; mh < (this.h * 2 + 1); ++mh) { grid[mh] = new Array(); for(var mw = 0; mw < (this.w * 2 + 1); ++mw) { grid[mh][mw] = 0; } }

// 	for(var y = 0; y < this.h; ++ y)
// 	{
// 		var py = (y * 2) + 1;

// 		for(var x = 0; x < this.w; ++x)
// 		{
// 			var px = (x * 2) + 1;

// 			grid[py][px] = 1;

// 			if(this.map[y][x]['n']==1) { grid[(py-1)][px] = 1; }
// 			if(this.map[y][x]['s']==1) { grid[(py+1)][px] = 1; }
// 			if(this.map[y][x]['e']==1) { grid[py][(px+1)] = 1; }
// 			if(this.map[y][x]['w']==1) { grid[py][(px-1)] = 1; }
// 		}
//   }

// 	this.gridMap = grid;
// 	this.gridW	= grid.length;
// 	this.gridH	= grid[0].length;
// };
// Maze.prototype.build = function(dir)


// 	this.toGrid();
// };