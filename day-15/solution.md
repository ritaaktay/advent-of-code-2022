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
For all rows N + max distance, N - max distances, locate the signal readers
For these signal readers, calculate their scan zone based on their closest beacon
See how many of these points have Y coordinate N
Remove duplicates! Remove coordinates where there is already a signal reader or beacon!

Can I do it without constructing a matrix, and thus deal with the negative coordiantes?

Passes test input but looping through the scan range of even one scanner for the puzzle input is incredibly slow, it has a heigh of around 600,000...

Would there be a way to not loop through all and have some math that can tell me which indices in the specified row only will be in the scan range of a given scanner?

...#... - amount, location
..###.. - amount, location
.##S##. - amount, location
..###.. - amount, location
...#... - amount, location

If I can express each row in terms of Amount and Location, I can know what part of a given row Y a given scanner S will be covering

Amount is in relation to the distance from scanner to it's nearest beacon, lets call this Range
At y-index of Scanner Amount = (Range x 2) + 1
From then on, it decreases by 2 with each row further away from the Scanner in either direction
Let's say Distance is the absolute distance from y-index of Scanner S to y-index of Row R
Distance = |y-index of Row - y-index of Scanner|
So the Amount at row X can be expressed as (Range x 2) + 1 - (Distance x 2)

The Location can be expressed as Start index-x plus Amount
At y-index of Scanner, Start is x-index of Scanner - Range
From then on, it increases by 1 with each row further away from the Scanner in either direction
Let's say Distance is the absolute distance from y-index of Scanner S to y-index of Row R
So the Start Index can be expressed as x-index of Scanner - Range + Distance

Narrowing down scanners under consideration would be to find the max range of any Scanner, and select Scanners within that range in either direction from the given Row R's Y-index

Per Scanner, we can calculate what indices of Row R will be within it's scan zone, and concatenate them in an array by not adding any duplicates to reduce size

We can filter out the Row R of the original data set and remove any indices that overlap with Scanners or Beacons, then get the length of the array as our answer

Ok, but still too slow because I loop over each index in the Amount and there are over 100,000 ...

A way to avoid loops would be to calculate the start and end indices of the scan zone, based on the Amount, and store per scanner. Then, I can see where there are overlaps and concatenate them. Once all overlaps have been removed I can get the total amount of indices.

So I will map over each scanner that is within the max range of the row, and per scanner return an array that stores the Start and End X-indices of its scan range for that row.

The overlap concatenating algorithm will:
Start by placing the first of the ranges in a concatenated array
Loop over the remaining ranges, and per range, see if ANY of the ranges in the concatenated array has overlap.
For those which have overlap, it will REPLACE that range with a joined version
For those that don't have overlap, it will PUSH the range into the concatenated array
At the end, the concatenated array will have only unique, non ovelrapping start-end indices for the scan ranges, from which the total unique indices can be calculated

Overlap drawings:

a.....----------  
b..-------

a....-----------
b....------

a....-----------
b....-----------

startB <= startA && endB <= endA && endB > startA

a....--------
b.......----------

a....--------
b....-------------

a....----------
b....----------

startA <= startB && endA <= endB && endA > startB

[firstStart, firstEnd] = a[0] > b[0] ? b : a
[secondStart, secondEnd] = a[0] <= b[0] ? b : a
Expressed this way it factors for when they might be equal, placing one as first and THE OTHER as second

firstStart <= secondStart && firstEnd <= secondEnd && firstEnd >= secondStart

a...------------
b.....------

a.......----
b....-------------

firstStart <= secondStart && firstEnd >= secondEnd

firstStart <= secondStart --- this part is covered by the logic that labels them as first and second

and I need to keep the two conditions separate so that I can concat differently

if (firstEnd <= secondEnd && firstEnd >= secondStart) return [firstStart, secondEnd]
if (firstEnd >= secondEnd) return [firstStart, firstEnd]
else return false
