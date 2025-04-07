import { imageNamesTp, LD_GLOB } from "./main.js";
import { Meteor } from "./objects/meteor.js";
import { Planet } from "./objects/planet.js";
import { Vector } from "./objects/vector.js";
import { Circle, PhisicMode } from "./objects/circle.js";
import { arrDel } from "./tools.js";
import { ResourceType } from "./objects/resource/resource.js";
import { Launchee } from "./objects/abilities/launchee.js";
import { Building } from "./objects/buildings/building.js";
import { Bomb } from "./objects/abilities/bomb.js";
import { launchDisease } from "./objects/meteor_disease.js";

export namespace GAME_CONFIG {
  export enum PlanetType {
    planet = "planet",
    startPlanet = "startPlanet",
  }
  export type PlanetConfigData = {
    stability: number;
    radius: number;
    image: imageNamesTp;
    mass: number;
    startBuilding: BuildingType;
    phisicMode: PhisicMode;
  };
  export enum MeteorType {
    smallMeteor = 'smallMeteor',
    mediumMeteor = 'mediumMeteor',
    largeMeteor = 'largeMeteor',
  }
  export type MeteorConfigData = {
    stability: number;
    radius: number;
    image: imageNamesTp;
    phisicMode: PhisicMode;
    innerResource: Map<ResourceType, number>;
  };
  export enum HookType {
    standartHook = 'standartHook',
  }
  export type HookConfigData = {
    stability: number;
    radius: number;
    image: imageNamesTp;
    forwardSpeed: number;
    backwardSpeed: number;
    powerLavel: number;
    maxLenth: number;
    phisicMode: PhisicMode;
  };

  export enum BombType {
    standartBomb = 'standartBomb',
  }
  export type BombConfigData = {
    stability: number;
    radius: number;
    image: imageNamesTp;
    phisicMode: PhisicMode;

    speed: number;
    maxDist: number;

    explosionRadius: number;
    blastWaveRadius: number;

    explosionStregth: number;
    blastWaveStregth: number;
    blastWaveVelocityAdd: number;

    explosionImages: imageNamesTp[];
  };
  export enum SpaceShipType {
    standartSpaseShip = 'standartSpaseShip',
  }
  export type SpaceShipConfigData = {
    stability: number;
    radius: number;
    image: imageNamesTp;
    forwardSpeed: number;
    powerLavel: number;
    phisicMode: PhisicMode;
  };
  export enum BuildingType {
    hookTier1,
    hookTier2,
    hookTier3,
    bombTier1,
    starting,
    disease1,
  }
  export enum AbilityType {
    hook = "hook",
    bomb = "bomb",
    spaseShip = "spaseShip",
  }
  export type BuildingConfigData = {
    radius: number;

    image_build: imageNamesTp;
    image_icon: imageNamesTp;

    abilityConfig: HookType | BombType | SpaceShipType;
    abilityType: AbilityType;
    cost: Map<ResourceType, number>;
    nextUpgrades: BuildingType[];
    evil?:boolean;
  };
  

  
  export const PlanetConfig: Record<PlanetType, PlanetConfigData> = {
[PlanetType.planet]: {
      stability: 5,
      radius: 40,
      image: "planet",
      mass: 200,
      startBuilding: null, 
      phisicMode: PhisicMode.braking,
    },
    [PlanetType.startPlanet]: {
      stability: 7,
      radius: 50,
      image: "planet",
      mass: 200,
      startBuilding: BuildingType.starting,
      phisicMode: PhisicMode.braking,
    },
  };




  export const MeteorConfig: Record<MeteorType, MeteorConfigData> = {
    [MeteorType.smallMeteor]: {
      stability: 1,
      radius: 8,
      image: "planet",
      phisicMode: PhisicMode.gravity,
      innerResource: new Map<ResourceType, number>([
        [ResourceType.gold, 0],
        [ResourceType.iron, 10],
      ]),
    },
    [MeteorType.mediumMeteor]: {
      stability: 2,
      radius: 12,
      image: "planet",
      phisicMode: PhisicMode.gravity,
      innerResource: new Map<ResourceType, number>([
        [ResourceType.gold, 0],
        [ResourceType.iron, 10],
      ]),
    },
    [MeteorType.largeMeteor]: {
      stability: 3,
      radius: 20,
      image: "planet",
      phisicMode: PhisicMode.gravity,
      innerResource: new Map<ResourceType, number>([
        [ResourceType.gold, 0],
        [ResourceType.iron, 1],
      ]),
    },
  };



  export const HookConfig: Record<HookType, HookConfigData> = {
    [HookType.standartHook]: {stability: 10,radius: 10, image: "planet", forwardSpeed: 800, backwardSpeed: 1000, powerLavel: 10, maxLenth: 300, phisicMode: PhisicMode.standart},
  };
  export const BombConfig: Record<BombType, BombConfigData> = {
    [BombType.standartBomb]: {
      stability: 10,
      radius: 20,
      image: 'bomb',
      phisicMode: PhisicMode.standart,
      speed: 400,
      maxDist: 1000,

      explosionRadius: 40,
      blastWaveRadius: 70,

      explosionStregth: 1,
      blastWaveStregth: 8,
      blastWaveVelocityAdd: 200,

      explosionImages: ['bombe1', 'bombe2'],
    },
  };

  export const SpaceShipConfig: Record<SpaceShipType, SpaceShipConfigData> = {
    [SpaceShipType.standartSpaseShip] : {
      stability: 10,
      radius: 10,
      image: 'planet', //TODO
      forwardSpeed: 400,
      powerLavel: 4,
      phisicMode: PhisicMode.standart
    }
  }


  export const Other = {
    spaceship_cost: 
      new Map<ResourceType, number>([
        [ResourceType.gold, 0],
        [ResourceType.iron, 1],
      ]),
    space_icon_name: 'icon3',
    space_icon_rad: 15,
    space_img_name: 'build3',
    space_img_rad: 15,
    space_build_image: <HTMLImageElement>null,
  }
  export const MeteorDiseaseConfig = {
    radius:10,
    image:'disease' as imageNamesTp,
    phisicMode:PhisicMode.standart,
    stability:1,
    vel:20
  }
  export const BuildingConfig: Record<BuildingType, BuildingConfigData> = {
    [BuildingType.starting]: {
      radius: 15,
      image_build: "build0",
      image_icon: "icon1",
      abilityType: null,
      abilityConfig: null,
      cost: new Map<ResourceType, number>([
        [ResourceType.gold, 0],
        [ResourceType.iron, 0],
      ]),
      nextUpgrades: [BuildingType.hookTier1, BuildingType.bombTier1],
    },
    [BuildingType.hookTier1]: {
      radius: 15,
      image_build: "build1",
      image_icon: "icon1",
      abilityType: AbilityType.hook,
      abilityConfig: HookType.standartHook,
      cost: new Map<ResourceType, number>([
        [ResourceType.gold, 10],
        [ResourceType.iron, 10],
      ]),
      nextUpgrades: [BuildingType.hookTier2],
    },
    [BuildingType.hookTier2]: {
      radius: 15,
      image_build: "build1",
      image_icon: "icon1",
      abilityType: AbilityType.hook,
      abilityConfig: HookType.standartHook,
      cost: new Map<ResourceType, number>([
        [ResourceType.gold, 10],
        [ResourceType.iron, 10],
      ]),
      nextUpgrades: [BuildingType.hookTier3],
    },
    [BuildingType.hookTier3]: {
      radius: 15,
      image_build: "build1",
      image_icon: "icon1",
      abilityType: AbilityType.hook,
      abilityConfig: HookType.standartHook,
      cost: new Map<ResourceType, number>([
        [ResourceType.gold, 10],
        [ResourceType.iron, 10],
      ]),
      nextUpgrades: [],
    },
    [BuildingType.bombTier1]: {
      radius: 15,
      image_build: "build1",
      image_icon: 'bomb',
      abilityType: AbilityType.bomb,
      abilityConfig: BombType.standartBomb,
      cost: new Map<ResourceType, number>([
        [ResourceType.gold, 10],
        [ResourceType.iron, 10],
      ]),
      nextUpgrades: [],
    },
    [BuildingType.disease1]: {
      evil:true,
      radius: 15,
      image_build: "disease",
      image_icon: 'bomb',
      abilityType: null,
      abilityConfig: null,
      cost: new Map<ResourceType, number>([
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
    Bomb:        1 << 4,
  };

  export let planets: Planet[] = [];
  let meteors: Meteor[] = [];
  export let diseasedPlanets: Planet[] = []; //This is horrible. We assume obj wouldn't loose diseased building ever

  let objects: Circle[] = [];    // here will be all objects, with duplicates in planets, meteors etc

  // export let startBuilding;
  export const buildings:{ [k in GAME_CONFIG.BuildingType]?: Building } = {};

  export function init() {
    lastFrame = new Date().getTime();
    GAME_CONFIG.Other.space_build_image = LD_GLOB.getImage(<any>GAME_CONFIG.Other.space_img_name);
    for(let key in Object.keys(GAME_CONFIG.BuildingType)
                    .filter((v) => isNaN(Number(v)))){ //creates one building of each type
      buildings[key] = new Building(<any> key);
    }

    addCircleObject(new Planet( new Vector(LD_GLOB.canvas.width *.6,LD_GLOB.canvas.height *.7), GAME_CONFIG.PlanetType.planet));
    addCircleObject(new Planet( new Vector(LD_GLOB.canvas.width *.5,LD_GLOB.canvas.height *.3), GAME_CONFIG.PlanetType.planet));
    let obj = new Planet( new Vector(LD_GLOB.canvas.width *.2,LD_GLOB.canvas.height *.2), GAME_CONFIG.PlanetType.planet);
    obj.build(buildings[GAME_CONFIG.BuildingType.disease1]);
    addCircleObject(obj);
    obj = new Planet( new Vector(LD_GLOB.canvas.width *.2,LD_GLOB.canvas.height *.8), GAME_CONFIG.PlanetType.planet);
    obj.build(buildings[GAME_CONFIG.BuildingType.starting]);
    addCircleObject(obj);
    addCircleObject(
      new Meteor(
        new Vector(LD_GLOB.canvas.width / 2, LD_GLOB.canvas.height / 2 - 200),
        GAME_CONFIG.MeteorType.mediumMeteor,
        new Vector(200, 30)
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
        let a = dir.multiply(planet.mass*500 / len**3)
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

  let diseaseTimer=1;
  export function stepGame() {
    let delta = (new Date().getTime() - lastFrame) / 1000;
    
    for(let obj of objects){
      obj.step(delta);
    }
    diseaseTimer-=delta;
    if(diseaseTimer<0){
      diseaseTimer=Math.max(1,4-.5*diseasedPlanets.length)+Math.random()*5;
      if(diseasedPlanets.length>0) launchDisease(diseasedPlanets[~~(diseasedPlanets.length*Math.random())]);
    }
    lastFrame = new Date().getTime();
  }
}
