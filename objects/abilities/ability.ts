import { Vector } from "../vector.js";
import { Planet } from "../planet.js";

export class Ability {
  image: HTMLImageElement;
  planet: Planet;
  coordinate: Vector;

  constructor(image: HTMLImageElement, planet: Planet) {
    this.image = image;
    this.planet = planet;
  }

  draw(dst: CanvasRenderingContext2D) {
    dst.drawImage(this.image, this.coordinate.x, this.coordinate.y);
  }

  step() {}
}
