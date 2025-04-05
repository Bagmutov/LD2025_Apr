import { Circle } from "./circle.js";
import { Vector } from "./vector.js";
import { GAME_LD } from "../game.js";

export class Meteor extends Circle {
  hp: number;
  velocity: Vector;

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
    let a = GAME_LD.getAcseleration(this.coordinates);
    this.velocity = this.velocity.add(a);

    this.coordinates = this.coordinates.add(this.velocity.multiply(delta));

    // idk
    // if (meteor.checkCollision(planet)) {
    //   planet.hp -= 1;
    //   meteors.splice(i, 1);
    // }
  }
}
