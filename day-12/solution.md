```
--- PART 1 ---

ELEVATION

a < b < c < d < e < f < g < h < i < j < k < l < m < n < o < p < q < r < s < t < u < v < w < x < y < z

"a" is shortes and "z" is highest

ASCII codes
"a" 97
"b" 98
"c" 99
.
.
"z" 122

Can move if same heigh
Can move from "a" to "a"
Can move if current index ("a": 97) - target index ("a" : 97) = 0
Can move if lower
Can move from "b" to "a"
Can move if current index ("b": 98) - target index ("a" : 97) = 1
Can move from "c" to "a"
Can move if current index ("c": 99) - target index ("a" : 97) = 2
Can move if one point heigher
Can move from "a" to "b"
Can move if current index ("a": 97) - target index ("b" : 98) = -1
Can not move more than one point heigher
Can not move from "a" to "c"
Can move if current index ("a": 97) - target index ("c" : 99) = -2
Can not move if current index - target index < -1
Can move if current index - target index >= -1

HEIGHTMAP

2D array
Each coordinate is
{x, y}
X is index of array
Y is index of string in array

["S", "a", "b", "q", "p", "o", "n", "m"],
["a", "b", "c", "r", "y", "x", "x", "l"],
["a", "c", "c", "s", "z", "E", "x", "k"],
["a", "c", "c", "t", "u", "v", "w", "j"],
["a", "b", "d", "e", "f", "g", "h", "i"]

Coordinate of "S" is {x: 0, y: 0}
Coordinate of "E" is {x: 2 , y: 5}

Neighbours of coordinate {x, y}
{x-1, y} where x-1 >= 0
{x+1, y} where x+1 <= heightmap length
{x, y-1} where y-1 >= 0
{x, y+1} where y+1 <= row length

PATHFINDING

BFS

Each vertex {x, y, steps}
Start = {x: 0, y:0, steps:0}


Queue = [Start]
Visited = []
Current = Start

While Queue.length > 0
Current = Queue.shift()
If Current == End
If Neighbour is Visitable and Not Visited add Neighbour to Queue
Add Current to Visited


No need to store the path just the number of moves!

```
