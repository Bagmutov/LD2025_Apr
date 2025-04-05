import { Circle } from "./circle.js";

export class Planet extends Circle {
  hp: number;

  constructor(
    x: number,
    y: number,
    radius: number,
    texture: HTMLImageElement,
    hp: number
  ) {
    super(x, y, radius, texture);

    this.hp = hp;
  }
}
