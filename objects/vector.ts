export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Vector): Vector {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  multiply(other: number): Vector {
    return new Vector(this.x * other, this.y * other);
  }

  scalar(other: Vector): number {
    return this.x * other.x + this.y * other.y;
  }

  oblique(other: Vector): number {
    return this.x * other.y - this.y * other.x;
  }
}

export function genVector() {
  let dx = Math.random();
  let dy = Math.random();
  return new Vector(dx, dy);
}
