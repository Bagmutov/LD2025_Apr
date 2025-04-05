import { LD_GLOB } from "./main.js";
import { Circle } from "./objects/circle.js";
import { Planet } from "./objects/planet.js";

export namespace GAME_LD {
  let circles: Circle[] = [];

  export function init() {
    circles.push(
      new Planet(
        LD_GLOB.canvas.width / 2,
        LD_GLOB.canvas.height / 2,
        50,
        LD_GLOB.getImage("planet"),
        25
      )
    );
  }

  export function drawGame(dst: CanvasRenderingContext2D) {
    for (let circle of circles) {
      circle.draw(dst);
    }
  }

  export function loop() {}
}
