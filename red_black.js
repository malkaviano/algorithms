'use strict';

const Color = {
  BLACK: 1,
  RED: 2
}

const nil = new Node(null, null, null, null);

function Node(key, parent = nil, left = nil, right = nil) {
  this.key = key;
  this.parent = parent;
  this.left = left;
  this.right = right;
  this.color = Color.BLACK;
}

let root = nil;

module.exports = {
  nil,
  Color,
  Node,
  printTree(node, a = [], i = 0) {
    if (a[i] === undefined) {
      a[i] = [];
    }

    if (node === this.nil) {
      a[i].push('nil');

      return;
    }

    a[i].push(`${node.key} - ${node.color}`);

    this.printTree(node.left, a, i + 1);

    this.printTree(node.right, a, i + 1);

    return a;
  },
  MINIMUM(node) {
    while (node.left !== this.nil) {
      node = node.left;
    }

    return node;
  },
  SUCCESSOR(node) {
    if (node.right !== this.nil) return this.MINIMUM(node.right);

    let antecessor = node.parent;

    while (antecessor !== this.nil && node === antecessor.right) {
      node = antecessor;
      antecessor = antecessor.parent;
    }

    return antecessor;
  },
  GRANDPARENT(node) {
    if (node.parent === this.nil) {
      return this.nil;
    }

    return node.parent.parent;
  },
  UNCLE(node) {
    const g = this.GRANDPARENT(node);

    if (g === nil) {
      return this.nil;
    }

    if (g.left === node.parent) {
      return g.right;
    }

    return g.left;
  },
  SIBLING(node) {
    if (node.parent === this.nil) return this.nil;

    if (node === node.parent.left) {
      return node.parent.right;
    }

    return node.parent.left;
  },
  ROTATE_LEFT(tree, node) {
    let righty = node.right;
    node.right = righty.left;

    if (node.right !== this.nil) {
      node.right.parent = node;
    }

    righty.parent = node.parent;

    if (node.parent === this.nil) {
      tree.root = righty;
    } else if (node === node.parent.left) {
      node.parent.left = righty;
    } else {
      node.parent.right = righty;
    }

    righty.left = node;

    node.parent = righty;
  },
  ROTATE_RIGHT(tree, node) {
    let lefty = node.left;
    node.left = lefty.right;

    if (node.left !== this.nil) {
      node.left.parent = node;
    }

    lefty.parent = node.parent;

    if (node.parent === this.nil) {
      tree.root = lefty;
    } else if (node === node.parent.left) {
      node.parent.left = lefty;
    } else {
      node.parent.right = lefty;
    }

    lefty.right = node;

    node.parent = lefty;
  },
  INSERT(tree, node) {
    let righty = this.nil;
    let lefty = tree.root;

    while (lefty !== this.nil) {
      righty = lefty;

      if (node.key < lefty.key) {
        lefty = lefty.left;
      } else {
        lefty = lefty.right;
      }
    }

    node.parent = righty;
    node.color = this.Color.RED;

    if (tree.root === this.nil) {
      tree.root = node;
    } else if (node.key < righty.key) {
      righty.left = node;
    } else {
      righty.right = node;
    }

    this.INSERT_FIXUP(tree, node)
  },
  INSERT_FIXUP(tree, node) {
    let u, g, p;

    while (node.parent !== this.nil && node.color === Color.RED && node.parent.color === Color.RED) {
      u = this.UNCLE(node);
      g = this.GRANDPARENT(node);
      p = node.parent;

      /* 
        Case : 1
          The uncle of node is also red
          Only Recoloring required
      */
      if (u.color === Color.RED) {
        p.color = u.color = this.Color.BLACK;
        g.color = Color.RED;

        node = g;
      } else if (p === g.left) {
        /* 
          Case : 2
            node is right child of its parent
            Left-rotation required 
        */
        if (node == p.right) {
          this.ROTATE_LEFT(tree, p);
          node = p;
          p = node.parent;
        }

        /* 
          Case : 3
            node is left child of its parent
            Right-rotation required 
        */
        this.ROTATE_RIGHT(tree, g);
        [p.color, g.color] = [g.color, p.color];
        node = p;
      } else {
        /* 
          Case : 2
            node is left child of its parent
            Right-rotation required 
        */
        if (node == p.left) {
          this.ROTATE_RIGHT(tree, p);
          node = p;
          p = node.parent;
        }

        /* 
          Case : 3
            node is right child of its parent
            Left-rotation required 
        */
        this.ROTATE_LEFT(tree, g);
        [p.color, g.color] = [g.color, p.color];
        node = p;
      }
    }

    tree.root.color = Color.BLACK;
  },
  TRANSPLANT(tree, deleted, replace) {
    if (deleted.parent === tree.nil) {
      tree.root = replace;
    } else if (deleted === deleted.parent.left) {
      deleted.parent.left = replace;
    } else {
      deleted.parent.right = replace;
    }

    replace.parent = deleted.parent;

    deleted.parent = deleted.left = deleted.right = null;
  },
  DELETE(tree, node) {
    let double,
      promoted;
      
    if (node.left === this.nil || node.right === this.nil) {
      double = node;
    } else {
      double = this.SUCCESSOR(node);
    }

    if (node.left !== this.nil) {
      promoted = double.left;
    } else {
      promoted = double.right;
    }

    promoted.parent = double.parent;

    if (double.parent === this.nil) {
      tree.root = promoted;
    } else if (double === double.parent.right) {
      double.parent.right = promoted;
    } else {
      double.parent.left = promoted;
    }

    if (double !== node) {
      node.key = double.key;
    }

    if (double.color === this.Color.BLACK) {
      this.DELETE_FIXUP(tree, promoted);
    }
  },
  DELETE_FIXUP(tree, node) {
    while (node !== tree.root && node.color === this.Color.BLACK) {
      if (node === node.parent.left) {
        let s = node.parent.right;

        if (s.color === this.Color.RED) {
          s.color = this.Color.BLACK;
          node.parent.color = this.Color.RED;

          this.ROTATE_LEFT(tree, node.parent);

          s = node.parent.right;
        }

        if (s.right.color === this.Color.BLACK) {
          if (s.left.color === this.Color.BLACK) {
            s.color = this.color.RED;

            node = node.parent;
          } else {
            s.left.color = this.Color.BLACK;
            s.color = this.Color.RED;

            this.ROTATE_RIGHT(tree, s);
          }
        }

        s = node.parent.right;
        s.color = node.parent.color;
        node.parent.color = this.Color.BLACK;
        s.right.color = this.Color.BLACK;

        this.ROTATE_LEFT(tree, node.parent);

        node = tree.root;

      } else {
        let s = node.parent.left;
        
        if (s.color === this.Color.RED) {
          s.color = this.Color.BLACK;
          node.parent.color = this.Color.RED;

          this.ROTATE_RIGHT(tree, node.parent);

          s = node.parent.left;
        }

        if (s.left.color === this.Color.BLACK) {
          if (s.right.color === this.Color.BLACK) {
            s.color = this.Color.RED;

            node = node.parent;
          } else {
            s.left.color = this.Color.BLACK;
            s.color = this.Color.RED;

            this.ROTATE_LEFT(tree, s);
          }
        }
        
        s = node.parent.left;
        s.color = node.parent.color;
        node.parent.color = this.Color.BLACK;
        s.left.color = this.Color.BLACK;

        this.ROTATE_RIGHT(tree, node.parent);

        node = tree.root;
      }
    }

    node.color = this.Color.BLACK;
  }
}