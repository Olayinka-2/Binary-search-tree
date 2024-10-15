class Node {
   constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
   }
}

class Tree {
   constructor(arr) {
      const sortedArray = [...new Set(arr)].sort((a,b) =>  a - b);
      this.root = this.buildArray(sortedArray);
   }

   buildArray(arr) {
      if(arr.length == 0) {
         return null;
      }

      const mid = Math.floor(arr.length / 2);

      const root = new Node(arr[mid]);

      root.left = this.buildArray(arr.slice(0, mid));
      root.right = this.buildArray(arr.slice(mid + 1));

      return root;
   }

   insert(value) {
     this.root = this._insert(this.root, value);
   }

   _insert(root, value) {

      if(root === null) {
         return new Node(value);
      }

      if(root.data === value) {
         return root;
      }

      if(value < root.data) {
         root.left = this._insert(root.left, value);
      } else if(value > root.data){
         root.right = this._insert(root.right, value);
      }
      return root;
   }

   remove(data) {
      this.root = this._removeNode(this.root, data);
   }

   _removeNode(root, data) {
      if(root === null) {
         return null;
      }

      if(data > root.data) {
         root.right = this._removeNode(root.right, data);
      } else if(data < root.data) {
         root.left = this._removeNode(root.left, data) 
      } else {
         if(root.right === null && root.left === null) {
            root = null;
            return root;
         }

         if(root.right === null) {
            return root.left;
         } else if(root.left === null){
            return root.right;
         }

         let minNode = this.findMinNode(root.right);
         root.data = minNode.data;
         root.right = this._removeNode(root.right, minNode.data)
      }
      return root;
   }

   findMinNode(node) {
      while(node.left !== null) {
         node = node.left;
      }
      return node;
   }

   find(data) {
      return this._find(this.root, data);
   }

   _find(root, data) {

      if(root === null) {
         return false;
      }

      if(root.data === data) {
         return true;
      }

      if(data > root.data) {
         return this._find(root.right, data);
      } else if(data < root.data) {
         return this._find(root.left, data);
      }
      return false;
   }

   levelOrderTraversal(callback) {

      if(typeof callback !== 'function') {
         throw new Error('Callback function is required');
      }

      if(!this.root) return;
      const queue = [this.root];

      while(queue.length > 0) {
         const node = queue.shift();
         callback(node);

         if(node.left) queue.push(node.left);
         if(node.right) queue.push(node.right);
      }
   }

   inOrderTraversal(callback) {
      if(typeof callback !== 'function') {
         throw new Error('Callback function is required');
      }

      let traverse = (node) => {
         if(node === null) return;

         traverse(node.left);
         callback(node);
         traverse(node.right);
      }
      traverse(this.root);
      
   }

   preOrderTraversal(callback) {
      if(typeof callback !== 'function') {
         throw new Error('Callback function is required');
      }

      let traverse = (node) => {
         if(node === null) return;

         callback(node);
         traverse(node.left);
         traverse(node.right);
      }
      traverse(this.root);
      
   }

   postOrderTraversal(callback) {
      if(typeof callback !== 'function') {
         throw new Error('Callback function is required');
      }

      let traverse = (node) => {
         if(node === null) return;

         traverse(node.left);
         traverse(node.right);
         callback(node);
      }
      traverse(this.root);
      
   }
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
   if (node === null) {
      return;
   }
   if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
   }
   console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
   if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
   }
};

const binaryTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
binaryTree.insert(100);
binaryTree.remove(8);
// console.log(binaryTree.find(24));
// console.log(binaryTree);
// binaryTree.levelOrderTraversal(node => console.log(node.data));
binaryTree.preOrderTraversal(node => console.log(node.data));
prettyPrint(binaryTree.root);
// console.log(binaryTree.levelOrderTraversal());