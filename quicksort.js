'use strict';

const utils = require('./utils');

module.exports = {
  QUICKSORT(array, p, r) {
    while(p < r) {
      let q = this.PARTITION_RANDOM(array, p, r);

      this.QUICKSORT(array, p, q - 1);
      p = q + 1;
    }
  },

  PARTITION(array, p, r) {
    let x = array[r];
    let i = p - 1;

    for(let j = p; j < r; ++j) {
      if(array[j] <= x) {
        utils.swap(array, ++i, j);
      }
    }

    utils.swap(array, ++i, r);

    return i;
  },

  PARTITION_RANDOM(array, p, r) {
    let index = utils.randomInt(p, r + 1);
    
    utils.swap(array, r, index);

    return this.PARTITION(array, p, r);
  }
};