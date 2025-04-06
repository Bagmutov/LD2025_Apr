import { GAME_CONFIG } from "../game.js";
import { Circle } from "./circle.js";
import { Vector } from "./vector.js";

export class Planet extends Circle {
  mass: number;
  constructor(
    coordinate: Vector,
    type: GAME_CONFIG.PlanetType
  ) {
    let config = GAME_CONFIG.PlanetConfig[type];
    super(coordinate, config.radius, config.image);
    this.mass = config.mass;
  }
}
