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
Each coordinate stores
{x: row index, y: item index, value: height value, visited: false}


Neighbours of coordinate {x, y}
{x-1, y} where x-1 >= 0
{x+1, y} where x+1 <= heightmap length
{x, y-1} where y-1 >= 0
{x, y+1} where y+1 <= row length

PATHFINDING

BFS

queue = [{...start, steps:0}]
current = start
while queue.length > 0
  current = queue.shift()
  if current.value == end return current.steps
  for all neighbours
    if neighbour is visitable and not visited add to queue
  mark current as visited

BFS works for mock input but too slow for puzzle
Bug: I am marking visited only after node is processed as current, should mark as visited once added to queue. Otherwise, a node that is the neighbour of multiple nodes (all nodes in a matrix) gets added and therefore visited multiple times. If I mark a node as visited when adding to queue, next time it is being considered, it will not be added twice. If order of queue is order of visits, a node being added first means it will be visited first, so I don't need to wait until time of actual visit to mark as visited, it preserves order.

"BFS has no way of knowing if a particular discovery of a node would give us the shortest path to that node. And so, the only possible way for BFS (or DFS) to find the shortest path in a weighted graph is to search the entire graph and keep recording the minimum distance from source to the destination vertex."
So, I set steps to Infinity and say neighbour steps is equal to current steps + 1 if current steps + 1 is less than enighbour steps. If a shorter path has been discovered, no need to overwrite it with the longer path. After all options have been explored (the graph has been traversed) I read the steps of the end node.


```
