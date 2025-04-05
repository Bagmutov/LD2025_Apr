import { LD_GLOB } from "./main.js";
import { Meteor } from "./objects/meteor.js";
import { Planet } from "./objects/planet.js";
import { Vector } from "./objects/vector.js";
import { Circle } from "./objects/circle.js";

export namespace GAME_LD {
  export let keyMap = {};
  export let mouseMap = {};
  export let lastFrame: number;

  let planet: Planet;
  let meteors: Meteor[] = [];

  let objects: Circle[];

  export function init() {
    lastFrame = new Date().getTime();
    planet = new Planet(
      LD_GLOB.canvas.width / 2,
      LD_GLOB.canvas.height / 2,
      50,
      LD_GLOB.getImage("planet"),
      25,
      5
    );

    meteors.push(
      new Meteor(
        LD_GLOB.canvas.width / 2,
        LD_GLOB.canvas.height / 2 - 200,
        10,
        LD_GLOB.getImage("planet"),
        10,
        new Vector(1, 0)
      )
    );
  }
  export function getAcseleration(point: Vector){
    let a = planet.coordinates
        .sub(point)
        .normalize()
        .multiply(planet.G)
    return a;
  }
  export function getColision(circle: Circle){
    let colisions: Circle[];
    for (let circle of objects) {
      
    }
  }

  export function drawGame(dst: CanvasRenderingContext2D) {
    planet.draw(dst);
    for (let meteor of meteors) {
      meteor.draw(dst);
    }
  }

  export function loop() {
    let t = (new Date().getTime() - lastFrame) / 1000;


    lastFrame = new Date().getTime();
  }
}
