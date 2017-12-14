'use strict';

const expect = require('chai').expect,
  heapsort = require('../heapsort');

const newArray = function () {
  return [17, 27, 3, 16, 13, 10, 1, 5, 7, 12, 4, 8, 9, 0];
};

describe('HEAPSORT', function () {
  describe('PARENT', function () {
    it('returns 0', function () {
      expect(heapsort.PARENT(0)).to.equal(0);
      expect(heapsort.PARENT(2)).to.equal(0);
    });

    it('returns 2', function () {
      expect(heapsort.PARENT(5)).to.equal(2);
    });
  });

  describe('LEFT', function () {
    it('returns 1', function () {
      expect(heapsort.LEFT(0)).to.equal(1);
    });

    it('returns 3', function () {
      expect(heapsort.LEFT(1)).to.equal(3);
    });
  });

  describe('RIGHT', function () {
    it('returns 2', function () {
      expect(heapsort.RIGHT(0)).to.equal(2);
    });

    it('returns 4', function () {
      expect(heapsort.RIGHT(1)).to.equal(4);
    });
  });

  describe('MAX_HEAPIFY', function () {
    it('changes heap, max parent on index 2', function () {
      const heap = newArray();
      heap.size = heap.length;

      heapsort.MAX_HEAPIFY(heap, 2); //[ 27, 17, 10, 16, 13, 9, 1, 5, 7, 12, 4, 8, 3, 0]

      expect(heap[2]).to.equal(10);
      expect(heap[5]).to.equal(9);
      expect(heap[12]).to.equal(3);
    });
  });

  describe('BUILD_MAX_HEAP', function () {
    it('build max priority heap', function () {
      const heap = newArray();

      heapsort.BUILD_MAX_HEAP(heap); //[ 27, 17, 10, 16, 13, 9, 1, 5, 7, 12, 4, 8, 3, 0]

      expect(heap).to.deep.equal([27, 17, 10, 16, 13, 9, 1, 5, 7, 12, 4, 8, 3, 0]);
    });
  });

  describe('HEAPSORT', function () {
    it('generated a sorted heap', function () {
      const heap = newArray();

      heapsort.HEAPSORT(heap); //[ 0, 1, 3, 4, 5, 7, 8, 9, 10, 12, 13, 16, 17, 27]

      expect(heap).to.deep.equal([0, 1, 3, 4, 5, 7, 8, 9, 10, 12, 13, 16, 17, 27]);

    });
  });

  describe('HEAP_MAXIMUM', function () {
    it('returns maximum value', function () {
      const heap = newArray();

      heapsort.BUILD_MAX_HEAP(heap); //[ 27, 17, 10, 16, 13, 9, 1, 5, 7, 12, 4, 8, 3, 0]

      expect(heapsort.HEAP_MAXIMUM(heap)).to.equal(27);
    });
  });

  describe('HEAP_EXTRACT_MAXIMUM', function () {
    it('extracts maximum value', function () {
      const heap = newArray();

      heapsort.BUILD_MAX_HEAP(heap); //[ 27, 17, 10, 16, 13, 9, 1, 5, 7, 12, 4, 8, 3, 0]

      expect(heapsort.HEAP_EXTRACT_MAXIMUM(heap)).to.equal(27);

      expect(heap.size).to.equal(13);
    });
  });

  describe('HEAP_INCREASE_KEY', function () {
    it('increase index 6 by 30', function () {
      const heap = newArray();

      heapsort.BUILD_MAX_HEAP(heap); //[ 27, 17, 10, 16, 13, 9, 1, 5, 7, 12, 4, 8, 3, 0]

      heapsort.HEAP_INCREASE_KEY(heap, 6, 30);

      expect(heap[0]).to.equal(31);
    });

    it('increase index 6 by 10', function () {
      const heap = newArray();

      heapsort.BUILD_MAX_HEAP(heap); //[ 27, 17, 10, 16, 13, 9, 1, 5, 7, 12, 4, 8, 3, 0]

      heapsort.HEAP_INCREASE_KEY(heap, 6, 10);

      expect(heap[2]).to.equal(11);
    });
  });

  describe('MAX_HEAP_INSERT', function () {
    it('insert 20 into the heap', function () {
      const heap = newArray();

      heapsort.BUILD_MAX_HEAP(heap); //[ 27, 17, 10, 16, 13, 9, 1, 5, 7, 12, 4, 8, 3, 0]

      heapsort.MAX_HEAP_INSERT(heap, 20);

      expect(heap[2]).to.equal(20);
    });
  });

  describe('BUILD_MAX_HEAP_INSERT', function () {
    it('build max priority heap', function () {
      const array = newArray();

      const heap = heapsort.BUILD_MAX_HEAP_INSERT(array); //[ 27, 17, 10, 16, 13, 9, 1, 5, 7, 12, 4, 3, 8, 0]

      expect(heap).to.deep.equal([27, 17, 10, 16, 13, 9, 1, 5, 7, 12, 4, 3, 8, 0]);
    });
  });
});