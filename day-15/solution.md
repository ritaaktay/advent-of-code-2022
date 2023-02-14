--- Part Two ---

Parsed input to store each signal reader & beacon as an array, where index 0 & 1 are signal reader x & y, and index 2 & 3 are beacon x & y

[2, 18, -2, 15],\
[9, 16, 10, 16],\
[13, 2, 15, 3],\
[12, 14, 10, 16],\
[10, 20, 10, 16],\
[14, 17, 10, 16],\
...

Will add Manhattan distance at index 4, ex:

[2, 18, -2, 15, 7],\
[9, 16, 10, 16, 1],\
[13, 2, 15, 3, 3],\
[12, 14, 10, 16, 4],\
[10, 20, 10, 16, 4],\
[14, 17, 10, 16, 5],\
...

To get the coordinates where there can be no beacon at a given row R:
Find the max scan distance amongst all scanners
For all rows R + max distance to R - max distances, locate any Scanners
For these Scanners, it is possible that they will effect row R, so these will be the ones in consideration
Calculate the scan zone of each scanner based on its own scan distance
Concat the scan zones, remove duplicates, remove coordinates where there is already a beacon...
Count how many of the remaining coordinates have row R's y index.

Can I do it without constructing a matrix, and thus deal with the negative coordiantes? Yes.

Passes test input but looping through the scan range of even one scanner for the puzzle input is incredibly slow, scan distances are in the 600,000s...

Would it be possible to have some math tell me which indices in ONLY THE SPECIFIED ROW will be in the scan range of a given scanner?

...#...\
..###..\
.##S##.\
..###..\
...#...

If I can express each row in terms of length and location, I can know what part of a given Row a given Scanner will be covering

Length is in relation to the distance from Scanner to it's nearest Beacon. Let's call this Range.
At the y index of Scanner Length = (Range x 2) + 1
From then on it decreases by 2 with each row away from Scanner in either direction
This Distancecan be expressed as |y index of Row - y index of Scanner|
So Length at Row is (Range x 2) + 1 - (Distance x 2)

The Location can be expressed as a Start Index and an End Index
At y index of Scanner, Start Index is x index of Scanner - Range
From then on it increases by 1 with each row further away from the scanner in either direction
So Start Index is x index of Scanner - Range + Distance
End Index is Start Index + Length - 1

Ok, but still too slow because I loop over the indices in the Length and there are over 100,000 ...

A way to avoid loops would be to take the Start and End indices of each scan zone and concatenate them based on overlaps. Once all overlaps are removesd, we can get the total amount of indices.

So I will map over the scanners and concat an array that stores the Start and End x indices of each Scanner's scan zone for the specified Row.

Then, an overlap concatenating algorith will join these Ranges to remove any overlaps by:

Place the first of the Ranges in a concat array
Loop over the remaining Ranges and per Range
If the Range overlaps with any in the concat array
Replace the index in the concat array with a joined range
If the Range does not overlap with any in the concat array
Push it into the concat array

This needs an overlap function that takes a & b, and either returns a joined range, or false if no overlap.

Overlap drawings:

When partial overlap:

a.....----------\
b..-------

a....-----------\
b....------

a....-----------\
b....-----------

startB <= startA && endB <= endA && endB > startA

a....--------\
b.......----------

a....--------\
b....-------------

a....----------\
b....----------

startA <= startB && endA <= endB && endA > startB

Expressed in terms of First & Second rather than A & B these two can be combined into one expression:

firstStart <= secondStart && firstEnd <= secondEnd && firstEnd >= secondStart

[firstStart, firstEnd] = a[0] > b[0] ? b : a
[secondStart, secondEnd] = a[0] <= b[0] ? b : a

This allocation will place one as first and THE OTHER as second when they are equal.

When complete subsumbtion:

a...------------\
b.....------

a.......----\
b....-------------

firstStart <= secondStart && firstEnd >= secondEnd

To combine the two:

firstStart <= secondStart is covered by the logic that labels them as first and second

For the rest, I need to keep the two conditions separate so that I can concat differently:

if (firstEnd <= secondEnd && firstEnd >= secondStart) return [firstStart, secondEnd]
if (firstEnd >= secondEnd) return [firstStart, firstEnd]
else return false

The concatenation has to be recursive!

Because the concating function can end up with reducing the initial ranges to less but still overlapping ranges... It concats the first range in the concatenated array that it finds to be overlapping with a given Range, so it's potential overlap with any subsequent ones is ignored. This leads to reduced but potentially still overlapping ranges. I need to reapply the concatenation untill there are no overlapping ranges.

So after performing a concatenation loop, the concatenating function checks if there are overlaps between the remaining elements, and if so, calls itself with the concatenated array. If no overlaps, it returns the concatenated array.

There is another function that checks if there are any overlaps between the concatenated elements:

A nested for loop checks that each element is checked in relation to every other. The cases where the indices are the same between the inner and outer loop are ignored so that an element is not checked in relation to itself.

The same overlap function used in the concatenating function is used to check if there is an overlap between two elements. If at any point, an overlap is located, the checking function returns false and prompts a recursion of the concatenating function. If the nested loop completes without the overlap function returning true, that means no item overlaps with another and the checking function returns true, stopping the recursion of the concatenating function.

The removal of the Beacons within the final range happens by calculating which Beacons in the specified Row have an x index that falls within the concatenated range. This beacon count is stored to be removed from the final length calculation.

The final calculation converts the Ranges - that were expressed as Start and End indices - into lengths with inclusive indices, totals them, and removes the beacon count.

--- Part Two ---

Are under consideration is between 0 < x < 4000000 and 0 < y < 4000000 coordinates.

There will be only one slot in this entire range that can have a beacon. This means,
If I go row by row and apply the previous calculation, the stage where the scanning ranges are concatenated will have all rows with a single range, except one, which will have two ranges, the exluded indices being the one with the distress beacon.

.... So, can I loop through 4000000 rows? ....

It takes 16.49 s but it got the right answer!

Bug:

Bug in the concatenation recursion, there is a concatenated range array
[\
[ -3, 13 ],\
[ 15, 25 ],\
[ 15, 25 ],\
[ 15, 25 ],\
[ 15, 17 ],\
[ 15, 17 ],\
[ 15, 17 ]\
]\
Which the noneOverlap function returns false for, as some points are overlapping, but the concatenating function cannot concatenate any further... Which creates an infinite recursion.

Bug fix:
Add into the concatenated array only if the range in question does not overlap with ANY of the ranges already in the concatenated array.

The buggy version was pushing for as many times as it did not detect an overlap between the range in question and ONE of the ranges in the
concatenated array, creating double and tripple pushes.
