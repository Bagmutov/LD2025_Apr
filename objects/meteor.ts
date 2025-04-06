import { Circle } from "./circle.js";
import { Vector } from "./vector.js";
import { GAME_CONFIG, GAME_LD } from "../game.js";
import { dist2 } from "../tools.js";

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
    super.step(delta);
    if(dist2(this.coordinates.x,this.coordinates.y)>2000*2000) GAME_LD.delCircleObject(this);
    
    let colisions = GAME_LD.getColisions(this, GAME_LD.Layers.Planet)
    if (colisions.length != 0){
      this.explode(); 
    }
  }
  explode(){
    let i;
    GAME_LD.delCircleObject(this);
  }
}
