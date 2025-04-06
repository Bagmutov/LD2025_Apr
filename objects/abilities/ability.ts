import { Vector } from "../vector.js";
import { Planet } from "../planet.js";
import { Circle } from "../circle.js";

export class Ability extends Circle{
  planet: Planet;
  velocity: Vector;

  constructor(velocity: Vector, radius: number, image: HTMLImageElement, planet: Planet) {
    super(planet.coordinates, radius, image);
    this.planet = planet;
    this.velocity = velocity;
  }
}
