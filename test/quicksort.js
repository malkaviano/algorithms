'use strict';

const expect = require('chai').expect,
  quicksort = require('../quicksort'),
  utils = require('../utils');

const newArray = function () {
  return [37, 10, 4, 9, 3, 15, 33, 11, 8, 28, 27, 23, 30, 13, 34]
};

describe('QUICKSORT', function () {
  describe('PARTITION', function () {
    it('reorder array based on last element 34', function () {
      const array = newArray();

      quicksort.PARTITION(array, 0, array.length - 1);

      expect(array).to.be.deep.equal([10, 4, 9, 3, 15, 33, 11, 8, 28, 27, 23, 30, 13, 34, 37]);
    });
  });

  describe('QUICKSORT', function () {
    it('sorts array', function () {
      const array = newArray();

      quicksort.QUICKSORT(array, 0, array.length - 1);

      expect(array).to.be.deep.equal([3, 4, 8, 9, 10, 11, 13, 15, 23, 27, 28, 30, 33, 34, 37]);
    });
  });
});