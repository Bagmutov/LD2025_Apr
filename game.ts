import { LD_GLOB } from "./main.js";
import { Meteor } from "./objects/meteor.js";
import { Planet } from "./objects/planet.js";
import { Vector } from "./objects/vector.js";
import { Circle } from "./objects/circle.js";

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
  
  
  let planets: Planet[] = [];
  let meteors: Meteor[] = [];

  export const Layers = {
    None:        0,
    Planet:      1 << 0,
    Meteor:      1 << 1,
    Hook:        1 << 2,
    SpaseShip:   1 << 3,
  };
  export const objectsByLayer = {
    [Layers.Planet]: [],
    [Layers.Meteor]: [],
    [Layers.Hook]: [],
  };


  export function init() {
    lastFrame = new Date().getTime();
    
    objectsByLayer[Layers.Planet].push(
      new Planet(
        new Vector(
          LD_GLOB.canvas.width / 2,
          LD_GLOB.canvas.height / 2 - 200),
        GAME_CONFIG.PlanetType.planet)
      )

    objectsByLayer[Layers.Meteor].push(
      new Meteor(
        new Vector(100, 100),
        GAME_CONFIG.MeteorType.smallMeteor,
        new Vector(-10, -10)
      )
    );
  }
  export function getAcseleration(point: Vector){
    return new Vector(1, 1);
  }
  // layer: cумма нескольких collisionLayer
  export function getColisions(circle: Circle, layer: number ){
    let colisions: Circle[];
    if ((layer & Layers.Planet) != 0){
      for (let obj of objectsByLayer[Layers.Planet]) {
        if (circle.checkCollision(obj)) colisions.push(obj);
      }
    }
    if ((layer & Layers.Meteor) != 0){
      for (let obj of objectsByLayer[Layers.Meteor]) {
        if (circle.checkCollision(obj)) colisions.push(obj)
      }
    }
    return colisions
  }

  export function drawGame(dst: CanvasRenderingContext2D) {
  }

  export function loop() {
    let t = (new Date().getTime() - lastFrame) / 1000;


    lastFrame = new Date().getTime();
  }
}
