import { Tree, prettyPrint } from "./script.js";

const binaryTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// binaryTree.insert(100);
// binaryTree.insert(102);
// binaryTree.insert(103);
// binaryTree.remove(8);
// binaryTree.rebalance();
// console.log(binaryTree.isBalanced());
// binaryTree.inOrderTraversal(node => console.log(node.data));
// console.log(binaryTree.depth(binaryTree.root.left.right));
// console.log(binaryTree.height(binaryTree.root.left.right));
// prettyPrint(binaryTree.root);
console.log(binaryTree.levelOrderTraversal(node => console.log(node.data)));