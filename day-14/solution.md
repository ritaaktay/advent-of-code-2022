--- Day 14: Regolith Reservoir ---

Ok so my idea is to skip creating a 2D array and just work with storing blocked coordinates in single array. For moving sand, I'll check if that coordinate is in the array, and if not, keep the sand moving untill it comes to rest, at which point I'll add it to the blocked array and increment sand count. When a sand move exceeds the greatest Y coordinate of a rock (which means sand has started falling into the abyss) I'll return the sand count.

Store rock coordinates in an array, with each stone represented by an array of length two, index O as X coordinate and index 1 as Y cooridnate

498,4 -> 498,6 -> 496,6

Ex. rocks = [[4, 498], [5, 498], [6,498], [6, 497], [6, 496]]

How to parse?
Split from "->"
["498,4 ", " 498,6 ", " 496,6 "]
Trim all
["498,4", "498,6", "496,6"]
Split all from ","
[["498","4"], ["498","6"], ["496","6"]]
parseInt() all
[[498,4], [498,6], [496,6]]

How to generate between the lines?
Take 2 pairs at a time with the last of first pair acting as the first of second pair
For (let i = 0, i++, i<rocks.length) take start = rocks[i] and end = rocks[i+1]

If start[0] == end[0] generate line from start[1] to end end[1]
If start[1] > end[1] loop from end[1] to start[1] adding [start[0], i] to rocks array
If start[1] < end[1] loop from start[1] to end[1] adding [start[0], i] to rocks array

If [1] == [1] generate line from start[0] to end[0]
If start[0] > end[0] loop from end[0] to start[0] adding [i, start[1]] to rocks array
If start[0] < end[0] loop from start[0] to end[0] adding [i, start[1]] to rocks array

Now you will have array of all rocks

How to simulate sand fall?

Sand falls from [500,0]
Sand comes to rest means it gets added to the blocked array
Once it gets added, count is incremented for sand that has come to rest

Coordinates of movement options:
One below [Y+1, X]
One below and to the left [Y+1, X-1]
One below and to the right [Y+1, X+1]

move(current) {
let count = 0
if current[0]+1 > greatest X coordinate return sand count //this is the end condition
if (current[0]+1, current[1]) is not blocked move(current[0]+1, current[1])
if (current[0]+1, current[1]-1) is not blocked move(current[0]+1, current[1]-1)
if (current[0]+1, current[1]+1) is not blocked move(current[0]+1, current[1]+1)
else //sand has come to rest
add current to blocked array
increment count
move(500,0) //start new sand fall
}

How to determine if sand has started falling into the abbys?
If current[0]+1 is greater than the rock with the greatest X coordinate

How to find the rock with the greatest X coordinate?
forEach if rock[0] > greatest, greatest = rock[0]

Recursion was exceeding call stack size, so separated checking available moves untill rest (used a while loop that overwrites a location variable) from dropping another grain of sand (recursive call). Now stack is not blown but really slow and slows down massivley around 600-700... How can I speed this up?

Maybe try to work with a 2D array and keep boolean values for blocked not blocked so that you don't have to loop over a 10,000 array each time you are checking availability...
