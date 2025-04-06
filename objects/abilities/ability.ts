import { Vector } from "../vector.js";
import { Planet } from "../planet.js";
import { Circle } from "../circle.js";
import { LD_GLOB } from "../../main.js";
import { GAME_LD } from "../../game.js";

export class Launchee extends Circle{
  planet: Planet;

  constructor(radius: number, image: HTMLImageElement, planet: Planet, useGravity: boolean) {
    super(planet.coordinates, radius, image, useGravity);
    this.planet = planet;
  }
  step(delta: number): void {
    super.step(delta);
  }
  destroy(){
    GAME_LD.delCircleObject(this);
  }
  launch(direction: Vector, force: number){
    
  }
}
