import { Circle } from "./circle";
import { Vector } from "./vector";

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
}
