import { Circle } from "./circle.js";
import { Vector } from "./vector.js";
import { GAME_LD } from "../game.js";
import { dist2 } from "../tools.js";

export class Meteor extends Circle {
  hp: number;

  constructor(
    x: number,
    y: number,
    radius: number,
    texture: HTMLImageElement,
    hp: number,
    velocity: Vector
  ) {
    super(x, y, radius, texture);

    this.hp = hp;
    this.velocity = velocity;
  }

  step(delta: number) {
    this.addVelocity(GAME_LD.getAcseleration(this.coordinates));
    super.step(delta);
    if(dist2(this.coordinates.x,this.coordinates.y)>2000*2000) GAME_LD.delCircleObject(this);
    // idk
    // if (meteor.checkCollision(planet)) {
    //   planet.hp -= 1;
    //   meteors.splice(i, 1);
    // }
  }
}
