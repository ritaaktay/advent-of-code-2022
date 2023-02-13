Parsed input to store each signal reader & beacon as an array, where index 0 & 1 are signal reader x & y, and index 2 & 3 are beacon x & y

[2, 18, -2, 15],
[9, 16, 10, 16],
[13, 2, 15, 3],
[12, 14, 10, 16],
[10, 20, 10, 16],
[14, 17, 10, 16],
...

Will add Manhattan distance at index 4, ex:

[2, 18, -2, 15, 7],
[9, 16, 10, 16, 1],
[13, 2, 15, 3, 3],
[12, 14, 10, 16, 4],
[10, 20, 10, 16, 4],
[14, 17, 10, 16, 5],
...

Quickest way to get the coordinates where there can be no beacon at a given row N:
Find the max Manhattan distance
Find the lowest X coordinate for a signal reader
Find the highest X coordinate for a signal reader
For all rows N - max distance, N - max distances, locate the signal readers
For these signal readers, calculate their scan zone based on their closest beacon
See how many of these points have Y coordinate N
Remove duplicates!

Can I do it without constructing a matrix, and thus deal with the negative coordiantes?
