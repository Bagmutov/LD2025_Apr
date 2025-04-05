import { Circle } from "./circle.js";

export class Planet extends Circle {
  hp: number;
  G: number;
  constructor(
    x: number,
    y: number,
    radius: number,
    texture: HTMLImageElement,
    hp: number,
    G: number
  ) {
    super(x, y, radius, texture);
    this.G = G;
    this.hp = hp;
  }
}
