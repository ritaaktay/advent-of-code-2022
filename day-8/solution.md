Example tree matrix: 

["3", "0", "3", "7", "3"],
["2", "5", "5", "1", "2"],
["6", "5", "3", "3", "2"],
["3", "3", "5", "4", "9"],
["3", "5", "3", "9", "0"],

visible trees = no of trees on edges
no of trees on edges = (matrix.length x 4) - 4

Disregard the edges when looping over each tree:
for (let r = 1; r < matrix.length - 1; r++) {
  let row = matrix[r]
  for (let i = 1; i < row.length - 1; i++) {
    if isVisible(row, r, i) visible trees ++
}

For any given tree need to decide if visible or not
Condition for visibility is that there is at least one side where all the trees untill the edge are shorter than the tree in question
Need to check 4 sides, can STOP as soon as one side is deemed visible 

isVisible(row, idex) {
  if visible from left return true
  if visible from right return true
  if visible from top return true
  if visible from bottom return true
  else return false
}

Horizontal ones can be checked with a function that takes the row and the index of the tree
(Good that here row will retain sides becuase taking from original matrix)

checkVisibleLeft(Int: indexOfRow, Int: indexOfTree) {
  // row = matrix[indexOfRow]
  // slice from 0 to index exclusive
  // return ture if Math.max(...slice) < row[indexOfTree]
  // (less than, not equal to!)
  // return false
}

checkVisibleLeft(Int: indexOfRow, Int: indexOfTree) {
  // row = matrix[indexOfRow]
  // slice from indexOfTree + 1 to end
  // return ture if Math.max(...slice) < row[indexOfTree]
  // (less than, not equal to!)
  // return false
}

Vertical ones can be checked by iterating over each other row in the array, up untill the index of the current row in the matrix is reached

checkVisibleTop(Int: indexOfRow, Int: indexOfTree) {
  const tree = matrix[indexOfRow][indexOfTree]
  const top = [];
  (Here i starts from 0 because want to check height of trees on edge...)
  for (let i=0; i < indexOfRow; i++) {
    top.push(matrix[i][indexOfTree])
  }
  return true if Math.max(...top) < tree
}

checkVisibleBottom(Int: indexOfRow, Int: indexOfTree) {
  const tree = matrix[indexOfRow][indexOfTree]
  const bottom = [];
  for (let i=indexOfRow+1; i < matrix.length; i++) {
    bottom.push(matrix[i][indexOfTree])
  }
  return true if Math.max(...bottom) < tree
}
