import { drawCircle, dist2 } from "../tools.js";
import { Vector } from "./vector.js";

export class Circle {
  coordinates: Vector;
  radius: number;
  image: HTMLImageElement;

  constructor(x: number, y: number, radius: number, image: HTMLImageElement) {
    this.coordinates = new Vector(x, y);
    this.radius = radius;
    this.image = image;
  }

  draw(dst: CanvasRenderingContext2D) {
    dst.drawImage(
      this.image,
      this.coordinates.x - this.radius,
      this.coordinates.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }

  checkCollision(other: Circle): boolean {
    return (
      Math.sqrt(
        dist2(
          other.coordinates.x - this.coordinates.x,
          other.coordinates.y - this.coordinates.y
        )
      ) <
      this.radius + other.radius
    );
  }
}
