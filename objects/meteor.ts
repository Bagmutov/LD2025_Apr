import { Circle } from "./circle.js";
import { Vector } from "./vector.js";
import { GAME_CONFIG, GAME_LD } from "../game.js";

export class Meteor extends Circle {
  velocity: Vector;

  constructor(
    coordinate: Vector,
    type: GAME_CONFIG.MeteorType,
    velocity: Vector
  ) {
    let config = GAME_CONFIG.MeteorConfig[type]
    super(coordinate, config.radius, config.image);
    this.velocity = velocity;
    this.useGravity = true;
  }

  step(delta: number) {
    if (this.useGravity){
      let a = GAME_LD.getAcseleration(this.coordinates);
      this.velocity = this.velocity.add(a);
    }

    this.coordinates = this.coordinates.add(this.velocity.multiply(delta));

    let colisions = GAME_LD.getColisions(this, GAME_LD.Layers.Planet)
    if (colisions.length != 0){
      this.explode(); 
    }
  }
  explode(){
    let i;
    GAME_LD.objectsByLayer[GAME_LD.Layers.Meteor].find(obj => this === obj, i);
    GAME_LD.objectsByLayer[GAME_LD.Layers.Meteor].splice(i, 1);
  }
}
