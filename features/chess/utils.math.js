export class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vec) {
    return new Vec(this.x + vec.x, this.y + vec.y);
  }
  multiply(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }

  isEqual(vec) {
    return this.x == vec.x && this.y == vec.y;
  }

  isDiagonal(vec) {
    return !(vec.x == 0 || vec.y == 0);
  }

  rotate() {
    return this.multiply(-1);
  }
}

export class Matrix {
  constructor(vec, element = (vec) => null) {
    this.width = vec.x;
    this.height = vec.y;
    this.content = [];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.content[y * this.width + x] = element(new Vec(x, y));
      }
    }
  }

  get(vec) {
    return this.content[vec.y * this.width + vec.x];
  }

  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }

  isInside(vec) {
    return (
      vec.x < this.width && vec.x >= 0 && vec.x < this.height && vec.y >= 0
    );
  }
}
