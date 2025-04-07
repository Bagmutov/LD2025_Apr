export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Vector): Vector {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  sub(other: Vector): Vector {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  lenSq(): number {
    return this.x * this.x + this.y * this.y;
  }

  len(): number {
    return Math.sqrt(this.lenSq());
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

  normalize(new_len:number=1): Vector {
    let len = this.len()||0.1;
    return new Vector(this.x / len * new_len, this.y / len * new_len);
  }
  dot_prod(vec:Vector): number {
    return this.x*vec.x+this.y*vec.y;
  }
}

export function genVector() {
  let dx = Math.random();
  let dy = Math.random();
  return new Vector(dx, dy);
}
