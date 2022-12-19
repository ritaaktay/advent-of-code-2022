```
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
```
