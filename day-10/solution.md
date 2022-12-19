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
```
