Number.prototype[Symbol.iterator] = function () {
  return {
    num: this,
    counter: 0,
    next() {
      this.counter++;
      return {
        value: this.counter,
        done: this.counter == this.num ? true : false,
      };
    },
  };
};
