```
--- PART 1 ---

x = 1;
cycles = [];

each array index in cycles represents the signal strength during that cycle
cycles[0] is the starting value of X, 1, before any cycles
cycles[1] represents signal strength during cycle 1
therefore value stored in cycles[1] should be X multiplied by 1
at this point cycles will be [ 1 ] so length is 1, X can be mutliplied by cycles.length to store value in cycles[1]
cycles[2] represents signal strength during cycle 2
therefore value stored in cycles[1] should be X multiplied by 2
at this point cycles will be [ 1, 1 ] so length is 1, X can be mutliplied by cycles.length to store value in cycles[2]
each index represents signal strength during that cycle, and the length of cycles before storing a value at cycles[i] will be the cycle number needed to perform the X mutliplication to get value to store at cycles[i]

order is key, signal strength calculated before increment
for (each signal) {
  cycles.push(cycles.length * x)
  if signal == addx {
    cycles.push(cycles.length * x)
    increment x
  }
}

calculate total of signal strengths at cycles 20,60,100, 140, 180, 220
total = 0;
for (let i =20; i <=220; i+=40) {
  total += this.cycles[i]
}
return total

--- PART 2 ---
CRT draws a 40 x 6 grid of pixels, one per cycle in 240 cycles, top to bottom, left to right
[0,0] is drawn at cycle 1
[0,1] is drawn at cycle 2
.
.
[0,39] is drawn at cycle 40
[1,0] is drawn at cycle 41
[1,39] is drawn at cycle 80
.
.
[5,39] is drawn at cycle 240

I have an array of signal strengths that map to cycles
Make this an array of X values, and strengths can be calculated by multiplying this X value by cycle number which is the index

X represents the horizontal position of the middle of the sprite currently being drawn
I.e. pixel currently being drawn is at [X-1, X, X+1] for the X value of that cycle
"#" is drawn if the row index for that pixel is part of pixel currently being drawn
"." is drawn if not
Store boolean, true for "#" and false for "."


How to draw to screen?

To represent the screen, make nested array of Boolean values

const screen = []
for (r = 0, r < 6; r++) {
  const row = []
  for (i = 0; i < 40; i ++) {
    const cycle = (r x 40) + i + 1
    row.push(pixelIsOfSprite(cycle, i))
  }
  screen.push(row)
}
return screen

pixelIsOfSprite(cycle, i) {
  return [i-1, i, i+1] includes cycles[cycle]
}

drawScreen(screen) {
  screen.map(row => {
    console.log(row.map(x => x ? "#" : ":")).join("") + ("\n"))
  })
}

```
