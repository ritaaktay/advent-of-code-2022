--- Day 13: Distress Signal ---

Realising too late that to parse strings I could have used JSON.parse()
To get "[ [ 1 ], [ 2, 3, 4 ] ]" into a an array of arrays...
I wrote my own parser instead and it was a good challenge.
A make array method reads sub-arrays by matching "["s to "]"s and reculrsively calls itself to add sub-array to array,
thus allowing for many nested arrrays to be parsed

But puzzle input has two digit numbers and my parsing does not factor that in...
So now using JSON.parse()
