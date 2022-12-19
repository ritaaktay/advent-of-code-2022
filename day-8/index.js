const TreeVisibilityCalculator = require("./treeVisibilityCalculator");
const calculator = new TreeVisibilityCalculator("./day-8/input.txt");
console.log(calculator.countVisibleTrees());

const TreeScenicScorer = require("./treeScenicScorer");
const scorer = new TreeScenicScorer("./day-8/input.txt");
console.log(scorer.getTreeWithHighestScenicScore());
