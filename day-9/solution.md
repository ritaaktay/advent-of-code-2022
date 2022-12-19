```
--- PART 1 ---

Head position: { x:0, y:0 }
Tail position: { x:0, y:0 }
Tail trail: []

Each time the head is moved
Check if head and tail are touching
If not, move tail to touch head
Add tail position to tail trail if not included already

Ex "R 4" would mean 4 times repeat:
Head position X += 1
Check if touching
If not, move tail to touch head
Add tail position to tail trail if not included already

Move head
Move head left
Head position X -= 1
Move head right
Head position X += 1
Move head down
Head position Y -= 1
Move head up
Head position Y += 1

Check if touching
Take a loop around tail position
Return true if any of these positions is == head position
for (let x= tail position X -1; x <= tail position X +1 ; x++) {
  for (let y= tail position Y =1; y <= tail position Y +1; y ++> ) {
    if (x, y == head position) return true
  }
}
Else return false

Move tail to touch head:
These 4 lines cover both horizontal and diagonal movements
Because if head position X == tail position X OR
head position Y == tail position Y there will be no
movement on that axis
If head position Y > tail position Y: tail position Y += 1
If head position Y < tail position Y: tail position Y -= 1
If head position X > tail position X: tail position X += 1
If head position X < tail position X: tail position X -= 1

--- PART 2 ----

Now the rope has 10 knots, H - 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9
And 9 is the tail
The goal is to track unique positions visited by the 9 tail

Each two knots retain the same H - T relationship as before
H - 1 behaves like H - T
1 - 2 behaves like H - T
.
.
8 - 9 behaves like H - T

When head moves once, movements should trickle down to tail 9 one by one
Prev RopeModeller modelled the relationship between one H-T
I need to model the relationship between 9 H-T pairs where H for one is T for the other
I.e. H - 1 , 1 - 2, 2 - 3, 3- 4 etc.
Where H - 1 has 1 as tail whilst 1 - 2 has 1 as head (referencing the same 1 object)
H moves only once following move instruction, and each subsequent knot should move itself based on the position of the preceding knot:
so 1 should move if touching H, 2 should move if touching 1, 3 should move if touching 2
In the end, the position of 9 should be added to the trail

So, firstly, my methods need to use i.o rather than read/write instance variables
moveHead(H: {x,y}, dir) => H: {x,y}
moveTail(H: {x, y}, T: {x, y}) => T: {x, y}
isTouching(H: {x, y}, T: {x, y}) => true / false
addToTrail(T: {x, y}) => adds to trail if not already

How do I store the knots?
An array of hashes, where 0 is head and 9 is tail
At each head move, move array 0, then
Loop over array and make pairs with i, i+1
Each pair will behave as a H-T
Once mapping is over, take last element in array and store in trail


```
