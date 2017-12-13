module.exports = {
  swap(array, x, y) {
    if(x === y) return;
    
    [array[x], array[y]] = [array[y], array[x]];
  },
  randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min)) + min;
  }
};