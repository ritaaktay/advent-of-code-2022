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

Works for mock input but too slow for puzzle
Bug: I am marking visited only after node is processed as current, should mark as visited once added to queue. Otherwise, a node that is the neighbour of multiple nodes (all nodes in a matrix) gets added and therefore visited multiple times. If I mark a node as visited when adding to queue, next time it is being considered, it will not be added twice. If order of queue is order of visits, a node being added first means it will be visited first, so I don't need to wait until time of actual visit to mark as visited, it preserves order.

BFS is the right algorithm for finding the shortest path to a target node in a NON-WEIGHTED GRAPH.
IN A NON-WEIGHTED GRAPH, the first time BFS reaches a target node, it will be the shortest path. It expands in all directions at once, and when the target is reached, it will have been the quickest way to get there. So with BFS I can return the steps to current node as soon as current node is target node, and record steps to neighbour nodes as current node + 1, because neighbour gets added only if yet not added, so at the point which it is being added, it will be the shortest route to that neighbour, and will not be visited twice.
IN A WEIGHTED GRAPH OR WITH DFS, I would have to explore all routes, overwrite memory with the shorter path on repeat encounters of the same node and read the path to the target node after traversing entire graph.

