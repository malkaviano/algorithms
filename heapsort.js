'use strict';

const utils = require('./utils');

module.exports = {
  PARENT(i) {
    if(--i < 0) {
      i = 0;
    }
    
    return Math.floor(i / 2);
  },

  LEFT(i) {
    return 2 * (i + 1) - 1;
  },

  RIGHT(i) {
    return 2 * (i + 1);
  },

  MAX_HEAPIFY(heap, i) {
    let l = this.LEFT(i),
        r = this.RIGHT(i),
        largest = i;

    if(l < heap.size && heap[l] > heap[i]) {
      largest = l;
    }
    
    if(r < heap.size && heap[r] > heap[largest]) {
      largest = r;
    }

    if(largest !== i) {
      utils.swap(heap, i, largest);
      this.MAX_HEAPIFY(heap, largest);
    }
  },

  BUILD_MAX_HEAP(heap) {
    heap.size = heap.length;

    for(let i = Math.floor(heap.length / 2); i >= 0; --i) {
      this.MAX_HEAPIFY(heap, i);
    }
  },

  HEAPSORT(heap) {
    this.BUILD_MAX_HEAP(heap);

    for(let i = (heap.length - 1); i > 0; --i) {
      utils.swap(heap, i, 0);
      heap.size--;

      this.MAX_HEAPIFY(heap, 0);
    }
  },

  HEAP_MAXIMUM(heap) {
    return heap[0];
  },

  HEAP_EXTRACT_MAXIMUM(heap) {
    if(heap.size < 1) {
      throw new Error("Heap underflow");
    }

    const max = this.HEAP_MAXIMUM(heap);

    heap[0] = heap[heap.size - 1];

    heap.size--;

    this.MAX_HEAPIFY(heap, 0);

    return max;
  },

  HEAP_INCREASE_KEY(heap, i, inc) {
    if(inc < 0) {
      throw new Error('Increment is negative');
    }

    if(heap[i] === undefined) {
      heap[i] = 0;
    }

    heap[i] += inc;

    while (i >=0 && heap[this.PARENT(i)] < heap[i]) {
      const parent = this.PARENT(i);

      utils.swap(heap, i, parent);

      i = parent;
    }
  },

  MAX_HEAP_INSERT(heap, key) {
    heap.size++;

    this.HEAP_INCREASE_KEY(heap, heap.size - 1, key);
  },

  BUILD_MAX_HEAP_INSERT(array) {
    const heap = [];
    
    heap.size = 0;

    for(let key of array) {
      this.MAX_HEAP_INSERT(heap, key);
    }

    return heap;
  },
};