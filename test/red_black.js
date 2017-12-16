'use strict';

const expect = require('chai').expect,
  red_black = require('../red_black'),
  utils = require('../utils');

function newTree() {
  return { root: red_black.nil };
}

let tree, rootNode;

describe('RED-BLACK', function () {
  describe('ROTATE_LEFT', function () {
    let rNode;

    beforeEach(function () {
      tree = newTree();
      tree.root = new red_black.Node(10);
      rNode = tree.root.right = new red_black.Node(14);

      rNode.parent = tree.root;
    });

    context('when Parent is the Root', function () {
      it('rotates left and change the root', function () {
        let lNodeFromRight = rNode.left = new red_black.Node(12);
        let rNodeFromRight = rNode.right = new red_black.Node(18);
        lNodeFromRight.parent = rNodeFromRight.parent = rNode;

        red_black.ROTATE_LEFT(tree, tree.root);

        expect(tree.root).to.be.equal(rNode);

        expect(tree.root.right).to.be.equal(rNodeFromRight);

        expect(tree.root.left.right).to.be.equal(lNodeFromRight);
      });
    });

    context('when Parent is not the Root', function () {
      it('rotates right node to the left of new right node', function () {
        let rNodeFromRight = rNode.right = new red_black.Node(18);
        rNodeFromRight.parent = rNode;

        let rNodeFromRight2 = rNodeFromRight.right = new red_black.Node(22);
        rNodeFromRight2.parent = rNodeFromRight;

        red_black.ROTATE_LEFT(tree, rNode);

        expect(tree.root.right).to.be.equal(rNodeFromRight);

        expect(tree.root.right.right).to.be.equal(rNodeFromRight2);

        expect(tree.root.right.left).to.be.equal(rNode);
      });
    });
  });

  describe('ROTATE_RIGHT', function () {
    let lNode;

    beforeEach(function () {
      tree = newTree();
      tree.root = new red_black.Node(10);
      lNode = tree.root.left = new red_black.Node(6);

      lNode.parent = tree.root;
    });

    context('when Parent is the Root', function () {
      it('rotates right and change the root', function () {
        let lNodeFromLeft = lNode.left = new red_black.Node(4);
        let rNodeFromLeft = lNode.right = new red_black.Node(8);
        rNodeFromLeft.parent = lNodeFromLeft.parent = tree.root.right;

        red_black.ROTATE_RIGHT(tree, tree.root);

        expect(tree.root).to.be.equal(lNode);

        expect(tree.root.left).to.be.equal(lNodeFromLeft);

        expect(tree.root.right.left).to.be.equal(rNodeFromLeft);
      });
    });

    context('when Parent is not the Root', function () {
      it('rotates right node to the right of new left node', function () {
        let lNodeFromLeft = lNode.left = new red_black.Node(4);
        lNodeFromLeft.parent = lNode;

        let lNodeFromLeft2 = lNodeFromLeft.left = new red_black.Node(2);
        lNodeFromLeft2.parent = lNodeFromLeft;

        red_black.ROTATE_RIGHT(tree, lNode);

        expect(tree.root.left).to.be.equal(lNodeFromLeft);

        expect(tree.root.left.right).to.be.equal(lNode);

        expect(tree.root.left.left).to.be.equal(lNodeFromLeft2);
      });
    });
  });

  describe('INSERT', function () {
    context('when the root is nil', function () {
      beforeEach(function () {
        tree = newTree();
        rootNode = new red_black.Node(2);

        red_black.INSERT(tree, rootNode);
      });

      it('adds new node to root', function () {
        expect(tree.root).to.be.equal(rootNode);
      });

      it('adds root as black', function () {
        expect(tree.root.color).to.be.equal(red_black.Color.BLACK);
      });
    });

    context('when there is only the root', function () {
      let leftNode,
        rightNode;

      beforeEach(function () {
        rootNode = new red_black.Node(2),
          leftNode = new red_black.Node(1),
          rightNode = new red_black.Node(3);
        tree = newTree();

        red_black.INSERT(tree, rootNode);
      });

      it('adds new node to the left', function () {
        red_black.INSERT(tree, leftNode);

        expect(tree.root.left).to.be.equal(leftNode);
      });

      it('adds left node as red', function () {
        red_black.INSERT(tree, leftNode);

        expect(tree.root.left.color).to.be.equal(red_black.Color.RED);
      });

      it('adds new node to the right', function () {
        red_black.INSERT(tree, rightNode);

        expect(tree.root.right).to.be.equal(rightNode);
      });

      it('adds right node as red', function () {
        red_black.INSERT(tree, rightNode);

        expect(tree.root.right.color).to.be.equal(red_black.Color.RED);
      });
    });

    context('when new node grandparent is Root and uncle is RED', function () {
      let parentNode,
        uncleNode,
        childNodeLeft,
        childNodeRight;

      beforeEach(function () {
        tree = newTree();
        rootNode = new red_black.Node(6);
        parentNode = new red_black.Node(4);
        uncleNode = new red_black.Node(8);
        childNodeLeft = new red_black.Node(7);
        childNodeRight = new red_black.Node(5);

        red_black.INSERT(tree, rootNode);

        red_black.INSERT(tree, parentNode);

        red_black.INSERT(tree, uncleNode);
      });

      it('adds new node as left child of UncleNode', function () {
        red_black.INSERT(tree, childNodeLeft);

        expect(childNodeLeft).to.be.equal(uncleNode.left);
      });

      it('adds new node as right child of ParentNode', function () {
        red_black.INSERT(tree, childNodeRight);

        expect(childNodeRight).to.be.equal(parentNode.right);
      });

      it('changes Parent and Uncle color to Black', function () {
        red_black.INSERT(tree, childNodeRight);

        expect(parentNode.color).to.be.equal(red_black.Color.BLACK);

        expect(uncleNode.color).to.be.equal(red_black.Color.BLACK);
      });

      it('adds new node as red', function () {
        red_black.INSERT(tree, childNodeLeft);

        expect(childNodeLeft.color).to.be.equal(red_black.Color.RED);
      });
    });

    context('when new node grandparent is Root and there is no uncle', function () {
      let parentNode,
        childNode;

      beforeEach(function () {
        tree = newTree();
        rootNode = new red_black.Node(6);

        red_black.INSERT(tree, rootNode);
      });

      it('adds new node to the left and rotate right then left', function () {
        parentNode = new red_black.Node(8);
        childNode = new red_black.Node(7);

        red_black.INSERT(tree, parentNode);
        red_black.INSERT(tree, childNode);

        expect(childNode).to.be.equal(tree.root);

        expect(parentNode).to.be.equal(tree.root.right);
      });

      it('adds new node to the right and rotate left then right', function () {
        parentNode = new red_black.Node(4);
        childNode = new red_black.Node(5);

        red_black.INSERT(tree, parentNode);
        red_black.INSERT(tree, childNode);

        expect(childNode).to.be.equal(tree.root);

        expect(parentNode).to.be.equal(tree.root.left);
      });
    });
  });

  describe('DELETE', function () {
    context('when deleting the Root', function () {
      context('when Root has children', function () {
        let leftNode,
          rightNode;

        beforeEach(function () {
          rootNode = new red_black.Node(2),
            leftNode = new red_black.Node(1),
            rightNode = new red_black.Node(3);
          tree = newTree();

          red_black.INSERT(tree, rootNode);
          red_black.INSERT(tree, leftNode);
          red_black.INSERT(tree, rightNode);
        });

        it('removes the Root', function () {
          red_black.DELETE(tree, rootNode);

          expect(tree.root.key).to.be.equal(rightNode.key);
        });
      });

      context('when Root has no children', function () {
        beforeEach(function () {
          rootNode = new red_black.Node(2),
            tree = newTree();

          red_black.INSERT(tree, rootNode);
        });

        it('changes the Root to NIL', function () {
          red_black.DELETE(tree, rootNode);

          expect(tree.root).to.be.equal(red_black.nil);
        });
      });
    });

    context('when the tree 30-20-40-35', function () {
      let deletedNode, deletedNode2, deletedNode3, deletedNode4;

      beforeEach(function () {
        rootNode = new red_black.Node(30);
        deletedNode = new red_black.Node(20);
        deletedNode3 = new red_black.Node(35);
        deletedNode4 = new red_black.Node(40);
        tree = newTree();

        red_black.INSERT(tree, rootNode);
        red_black.INSERT(tree, deletedNode);
        red_black.INSERT(tree, deletedNode4);
        red_black.INSERT(tree, deletedNode3);
      });

      it('removes the node 35', function () {
        red_black.DELETE(tree, deletedNode3);

        expect(tree.root.right.right).to.be.equal(red_black.nil);
      });

      it('removes the node 20', function () {
        red_black.DELETE(tree, deletedNode);

        expect(tree.root.key).to.be.equal(35);

        expect(tree.root.right.key).to.be.equal(40);

        expect(tree.root.left.key).to.be.equal(30);
      });

      it('removes the node 40', function () {
        red_black.DELETE(tree, deletedNode4);

        expect(tree.root.right.key).to.be.equal(35);

        expect(tree.root.left.key).to.be.equal(20);
      });

      it('removes the root', function () {
        red_black.DELETE(tree, rootNode);

        expect(tree.root.right.key).to.be.equal(40);
        expect(tree.root.left.key).to.be.equal(20);
      });

      context('when 35 is removed', function () {
        beforeEach(function () {
          red_black.DELETE(tree, deletedNode3);
        });

        it('removes the node 20', function () {
          //console.log(red_black.printTree(tree.root));          
          red_black.DELETE(tree, deletedNode);

          expect(tree.root.left).to.be.equal(red_black.nil);

          expect(tree.root.right.color).to.be.equal(red_black.Color.RED);
        });

        context('when node 20 is removed', function () {
          beforeEach(function () {
            red_black.DELETE(tree, deletedNode);
          });

          it('removes the Root', function () {
            red_black.DELETE(tree, rootNode);

            expect(tree.root.key).to.be.equal(40);

            expect(tree.root.color).to.be.equal(red_black.Color.BLACK);
          });
        });
      });
    });

    context('when the tree 30-20-40-35-45', function () {
      let deletedNode, deletedNode2, deletedNode3, deletedNode4, deletedNode5;

      beforeEach(function () {
        rootNode = new red_black.Node(30);
        deletedNode = new red_black.Node(20);
        deletedNode3 = new red_black.Node(35);
        deletedNode4 = new red_black.Node(40);
        deletedNode5 = new red_black.Node(45);
        tree = newTree();

        red_black.INSERT(tree, rootNode);
        red_black.INSERT(tree, deletedNode);
        red_black.INSERT(tree, deletedNode4);
        red_black.INSERT(tree, deletedNode3);
        red_black.INSERT(tree, deletedNode5);
      });

      context('when 40 is Red and 35 and 45 are Black', function () {
        beforeEach(function () {
          deletedNode4.color = red_black.Color.RED;
          deletedNode3.color = deletedNode5.color = red_black.Color.BLACK;
        });

        it('removes node 20', function () {
          red_black.DELETE(tree, deletedNode);

          expect(tree.root.key).to.be.equal(40);

          expect(tree.root.right.key).to.be.equal(45);

          expect(tree.root.left.key).to.be.equal(30);

          expect(tree.root.left.right.key).to.be.equal(35);
        });
      });
    });
  });
});