import { Vector } from "../vector.js";
import { Planet } from "../planet.js";
import { Circle, PhisicMode } from "../circle.js";
import { GAME_LD } from "../../game.js";

export class Launchee extends Circle {
  planet: Planet;
  forwardSpeed: number;

  constructor(
    radius: number,
    image: HTMLImageElement,
    planet: Planet,
    phisicMode: PhisicMode,
    forwardSpeed: number,
    stability: number,
    coordinates: Vector,
  ) {
    super(coordinates, radius, image, phisicMode, stability);
    this.planet = planet;
    this.forwardSpeed = forwardSpeed;
  }
  step(delta: number): void {
    super.step(delta);
  }
  destroy() {
    GAME_LD.delCircleObject(this);
  }
  launch(direction: Vector, force: number) {
    this.addVelocity(direction.multiply(force*this.forwardSpeed))
  }
}
