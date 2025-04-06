import { imageNamesTp, LD_GLOB } from "./main.js";
import { Meteor } from "./objects/meteor.js";
import { Planet } from "./objects/planet.js";
import { Vector } from "./objects/vector.js";
import { Circle } from "./objects/circle.js";
import { arrDel } from "./tools.js";
import { ResourceType } from "./objects/resource/resource.js";
import { Launchee } from "./objects/abilities/ability.js";
import { Building } from "./objects/buildings/building.js";

export namespace GAME_CONFIG {
  export enum PlanetType {
    planet = 'planet',
  }
  export type PlanetConfigData = {
    radius: number;
    image: imageNamesTp;
    mass: number;
    useGravity: boolean;
  }
  export enum MeteorType {
    smallMeteor = 'smallMeteor',
    mediumMeteor = 'mediumMeteor',
    largeMeteor = 'largeMeteor',
  }
  export type MeteorConfigData = {
    radius: number;
    image: imageNamesTp;
    hoockingPowerLavel: number;
    useGravity: boolean;
  };
  export enum HookType {
    standart,
  }
  export type HookConfigData = {
    radius: number;
    image: imageNamesTp;
    forwardSpeed: number;
    backwardSpeed: number;
    powerLavel: number;
    maxLenth: number;
    useGravity: boolean;
  };

  export enum BombType {
    standart,
  }
  export type BombConfigData = {
    radius: number;
    image: imageNamesTp;
    forwardSpeed: number;
    backwardSpeed: number;
    powerLavel: number;
    maxLenth: number;
    useGravity: boolean;
  };
  export enum BuildingType {
    hookTier1,
    hookTier2,
    hookTier3, 
  }
  export enum AbilityType {
    hook,
    bomb,
    spaseShip,
  }
  export type BuildingConfigData = {
    radius: number;
    image: imageNamesTp;
    abilytyConfig: HookType | BombType;
    abilityType: AbilityType;
    coast: Map<ResourceType, number>;
    nextUpgrades: BuildingType[];
  };
  

  
  export const PlanetConfig: Record<PlanetType, PlanetConfigData> = {
    [PlanetType.planet]: {radius: 40, image: "planet", mass: 200, useGravity: false},
  };
  export const MeteorConfig: Record<MeteorType, MeteorConfigData> = {
    [MeteorType.smallMeteor]: {radius: 3, image: "planet", hoockingPowerLavel: 1, useGravity: true},
    [MeteorType.mediumMeteor]: {radius: 5, image: "planet", hoockingPowerLavel: 2, useGravity: true},
    [MeteorType.largeMeteor]: {radius: 10, image: "planet", hoockingPowerLavel: 3, useGravity: true},
  };
  export const HookConfig: Record<HookType, HookConfigData> = {
    [HookType.standart]: {radius: 10, image: "planet", forwardSpeed: 1, backwardSpeed: 1000, powerLavel: 10, maxLenth: 300, useGravity: false},
  };
  export const BombConfig: Record<BombType, BombConfigData> = {
    [BombType.standart]: {radius: 10, image: "planet", forwardSpeed: 1, backwardSpeed: 1000, powerLavel: 10, maxLenth: 300, useGravity: false},
  };
  export const BuildingConfig: Record<BuildingType, BuildingConfigData> = {
    [BuildingType.hookTier1]: {
      radius: 10,
      image: "planet",
      abilityType: AbilityType.hook,
      abilytyConfig: HookType.standart,
      coast: new Map<ResourceType, number>([
        [ResourceType.gold, 10],
        [ResourceType.iron, 10],
      ]),
      nextUpgrades: [BuildingType.hookTier2],
    },
    [BuildingType.hookTier2]: {
      radius: 10,
      image: "planet",
      abilityType: AbilityType.hook,
      abilytyConfig: HookType.standart,
      coast: new Map<ResourceType, number>([
        [ResourceType.gold, 10],
        [ResourceType.iron, 10],
      ]),
      nextUpgrades: [BuildingType.hookTier3],
    },
    [BuildingType.hookTier3]: {
      radius: 10,
      image: "planet",
      abilityType: AbilityType.hook,
      abilytyConfig: HookType.standart,
      coast: new Map<ResourceType, number>([
        [ResourceType.gold, 10],
        [ResourceType.iron, 10],
      ]),
      nextUpgrades: [],
    },
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
  export let startBuilding = new Building(GAME_CONFIG.BuildingType.hookTier1);

  export function init() {
    lastFrame = new Date().getTime();
    addCircleObject(new Planet( new Vector(LD_GLOB.canvas.width *.6,LD_GLOB.canvas.height *.6), GAME_CONFIG.PlanetType.planet));
    addCircleObject(new Planet( new Vector(LD_GLOB.canvas.width *.3,LD_GLOB.canvas.height *.3), GAME_CONFIG.PlanetType.planet));
    addCircleObject(
      new Meteor(
        new Vector(LD_GLOB.canvas.width / 2, LD_GLOB.canvas.height / 2 - 200),
        GAME_CONFIG.MeteorType.mediumMeteor,
        new Vector(0, 0)
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
        let a = dir.multiply(planet.mass / len*.03)
        res = res.add(a);
    }
    return res;
  }
  // layer: cумма нескольких collisionLayer
  export function getColisions(circle: Circle, layer: number ):Circle[]{
    let colisions: Circle[] = [];
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
    for (let object of objects) {
      object.draw(dst);
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
