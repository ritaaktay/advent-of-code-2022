--- Part One ---

Ok, initial thoughts:

Graph traversal, non weigted in terms of distance to travel, weighted in terms of flow rate (could be calculated as flow rate \* minutes left)

A brute approach: Traverse graph in all possible ways, and caclulate total pressure released when doing so. Then, pick path with most pressure released.

Dijkstra's Algorithm - pathfinding, so not applicable, this is more like a traversal of all nodes, but I remember something about Dijkstra being traversal of whole graph to then compare points, hmmm...

Quickest way to get from A-B
vs
Visit all nodes whilst collecting most points

Time will be kept as:

```
Time = 30
At each step, Time--
If valve flow rate is 0, move on
If valve flow rate is > 0, Time--
```

Tip: It won't be possible to traverse entire graph in 30 minutes, since there are 55 nodes. So idea is to be point-hungry when moving from node to node (based on reachable nodes) and stop when time is up.

Points will be kept as:

```
Points = 0
At each node where valve has been turned on
Points += Time * flow rate
```

Tip: There are quite a lot of valves with flow rate 0, so there are pockets of value that we need to get to efficiently

Gotta start somewhere:
Look at Dijkstra, BFS, DFS, graph traversal...
See if there are any algortihms you can tweak for your needs
