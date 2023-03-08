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

function* powers(n) {
  for (let current = n; ; current *= n) {
    yield current;
  }
}

function* square(n) {}

// for (let power of powers(3)) {
//   if (power > 50) break;
//   console.log(power);
// }
