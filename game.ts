import { LD_GLOB } from "./main.js";
import { Meteor } from "./objects/meteor.js";
import { Planet } from "./objects/planet.js";
import { Vector } from "./objects/vector.js";
import { Circle } from "./objects/circle.js";
import { arrDel } from "./tools.js";

export namespace GAME_CONFIG {
  export enum PlanetType {
    planet = 'planet',
  }
  export type PlanetConfigData = {
    radius: number;
    image: HTMLImageElement;
    mass: number;
  }
  export enum MeteorType {
    smallMeteor = 'smallMeteor',
    mediumMeteor = 'mediumMeteor',
    largeMeteor = 'largeMeteor',
  }
  export type MeteorConfigData = {
    radius: number;
    image: HTMLImageElement;
    hoockingPowerLavel: number
  }
  export enum HookType {
    standart,
  }
  export type HookConfigData = {
    radius: number;
    image: HTMLImageElement;
    speed: number;
    powerLavel: number;
    maxLenth: number;
  }

  
  export const PlanetConfig: Record<PlanetType, PlanetConfigData> = {
    [PlanetType.planet]: {radius: 20, image: LD_GLOB.getImage("planet"), mass: 200},
  };
  export const MeteorConfig: Record<MeteorType, MeteorConfigData> = {
    [MeteorType.smallMeteor]: {radius: 3, image: LD_GLOB.getImage("planet"), hoockingPowerLavel: 1},
    [MeteorType.mediumMeteor]: {radius: 5, image: LD_GLOB.getImage("planet"), hoockingPowerLavel: 2},
    [MeteorType.largeMeteor]: {radius: 10, image: LD_GLOB.getImage("planet"), hoockingPowerLavel: 3},
  };
  export const HookConfig: Record<HookType, HookConfigData> = {
    [HookType.standart]: {radius: 3, image: LD_GLOB.getImage("planet"), speed: 10, powerLavel: 10, maxLenth: 100},
  };

}






export namespace GAME_LD {
  export let keyMap = {};
  export let mouseMap = {};
  export let lastFrame: number;

  export const Layers = {
    None:        0,
    Planet:      1 << 0,
    Meteor:      1 << 1,
    Hook:        1 << 2,
    SpaseShip:   1 << 3,
  };

  let planets: Planet[] = [];
  let meteors: Meteor[] = [];

  let objects: Circle[] = [];    // here will be all objects, with duplicates in planets, meteors etc
  let objects: Circle[] = [];    // here will be all objects, with duplicates in planets, meteors etc

  export function init() {
    lastFrame = new Date().getTime();
    addCircleObject(new Planet( new Vector(LD_GLOB.canvas.width *.6,LD_GLOB.canvas.height *.6), GAME_CONFIG.PlanetType.planet));
    addCircleObject(new Planet( new Vector(LD_GLOB.canvas.width *.3,LD_GLOB.canvas.height *.3), GAME_CONFIG.PlanetType.planet));
    planets[0].addVelocity(new Vector(100,0));
    planets[1].addVelocity(new Vector(-100,0));
    addCircleObject(
      new Meteor(
        new Vector(LD_GLOB.canvas.width / 2, LD_GLOB.canvas.height / 2 - 200),
        GAME_CONFIG.MeteorType.mediumMeteor,
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
        let dir = planet.coordinates
            .sub(point);
        let len = dir.len()
        if(len==0)continue;   // to avoid division by 0
        let a = dir.multiply(planet.mass / len**3)
        res = res.add(a);
    }
    return res;
  }
  // layer: cумма нескольких collisionLayer
  export function getColisions(circle: Circle, layer: number ){
    let colisions: Circle[];
    if ((layer & Layers.Planet) != 0){
      for (let obj of planets) {
        if (circle.checkCollision(obj)) colisions.push(obj);
      }
    }
    if ((layer & Layers.Meteor) != 0){
      for (let obj of meteors) {
        if (circle.checkCollision(obj)) colisions.push(obj)
      }
    }
    return colisions
  }

  export function drawGame(dst: CanvasRenderingContext2D) {
    for (let planet of planets) {
      planet.draw(dst);
    }
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
  export function stepGame() {
    let delta = (new Date().getTime() - lastFrame) / 1000;
    for(let obj of objects){
        obj.step(delta);
    }
    lastFrame = new Date().getTime();
  }
}
