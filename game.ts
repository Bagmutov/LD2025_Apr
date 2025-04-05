import { LD_GLOB } from "./main.js";
import { Meteor } from "./objects/meteor.js";
import { Planet } from "./objects/planet.js";
import { Vector } from "./objects/vector.js";
import { Circle } from "./objects/circle.js";
import { arrDel } from "./tools.js";

export namespace GAME_LD {
  export let keyMap = {};
  export let mouseMap = {};
  export let lastFrame: number;

  let planets: Planet[] = [];
  let meteors: Meteor[] = [];

  let objects: Circle[] = [];    // here will be all objects, with duplicates in planets, meteors etc

  export function init() {
    lastFrame = new Date().getTime();
    addCircleObject(new Planet( LD_GLOB.canvas.width *.6,LD_GLOB.canvas.height *.6, 50, LD_GLOB.getImage("planet"),25,5));
    addCircleObject(new Planet( LD_GLOB.canvas.width *.3,LD_GLOB.canvas.height *.3, 50, LD_GLOB.getImage("planet"),25,5));
    planets[0].addVelocity(new Vector(100,0));
    planets[1].addVelocity(new Vector(-100,0));
    addCircleObject(
      new Meteor(
        LD_GLOB.canvas.width / 2,
        LD_GLOB.canvas.height / 2 - 200,
        10,
        LD_GLOB.getImage("planet"),
        10,
        new Vector(100, 0)
      )
    );
  }
  export function addCircleObject(obj:Circle){
    if(objects.indexOf(obj)>=0) throw new Error('Object is added to the scene a second time.');
    if(obj instanceof Planet){
        planets.push(obj);
        obj.my_array = planets;
    } else if(obj instanceof Meteor){
        meteors.push(obj);
        obj.my_array = meteors;
    }
    objects.push(obj);
  }
  export function delCircleObject(obj:Circle){
    arrDel(objects, obj);
    if(obj.my_array)arrDel(obj.my_array, obj);
  }
  export function getAcseleration(point: Vector){
    let res = new Vector(0,0);
    for(let planet of planets){
        let a = planet.coordinates
            .sub(point);
        if(a.x==0)continue;   // to avoid division by 0
        res = res.add(a.normalize().multiply(planets[0].G));
    }
    return res;
  }
  export function getColision(circle: Circle){
    let colisions: Circle[];
    for (let circle of objects) {
      
    }
  }

  export function drawGame(dst: CanvasRenderingContext2D) {
    for (let planet of planets) {
      planet.draw(dst);
    }
    for (let meteor of meteors) {
      meteor.draw(dst);
    }
  }

  export function stepGame() {
    let delta = (new Date().getTime() - lastFrame) / 1000;
    for(let obj of objects){
        obj.step(delta);
    }
    lastFrame = new Date().getTime();
  }
}
