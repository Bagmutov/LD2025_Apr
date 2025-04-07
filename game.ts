import { imageNamesTp, LD_GLOB, playSound } from "./main.js";
import { Meteor } from "./objects/meteor.js";
import { Planet } from "./objects/planet.js";
import { Vector } from "./objects/vector.js";
import { Circle, PhisicMode } from "./objects/circle.js";
import { arrDel, drawLine } from "./tools.js";
import { ResourceType } from "./objects/resource/resource.js";
import { Launchee } from "./objects/abilities/launchee.js";
import { Building } from "./objects/buildings/building.js";
import { Bomb } from "./objects/abilities/bomb.js";
import { launchDisease, MeteorDisease } from "./objects/meteor_disease.js";
import { Spawner } from "./objects/spawner.js";
import { clearButtons } from "./objects/button.js";
import { SpaceShip } from "./objects/abilities/spaseShip.js";
import { Hook } from "./objects/abilities/hook.js";

export namespace GAME_CONFIG {
  export enum PlanetType {
    planet = "planet",
    startPlanet = "startPlanet",
    diseasePlanet = "diseasePlanet",
  }
  export type PlanetConfigData = {
    stability: number;
    radius: number;
    image: imageNamesTp;
    mass: number;
    diseaseValue: number;
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
    hookTier1 = 'hookTier1',
    hookTier2 = 'hookTier2',
    hookTier3 = 'hookTier3',
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
    itemCost: Map<ResourceType, number>;
  };

  export enum TrapType {
    standartTrap = "standartBomb",
  }
  export type TrapConfigData = {
    stability: number;
    radius: number;
    image: imageNamesTp;
    phisicMode: PhisicMode;
    speed: number;
    maxDist: number;

    trapRadius: number;
    trapStregth: number;
    trapVelocityAdd: number;
    activeImage: imageNamesTp;
    activeDuration: number;
    itemCost: Map<ResourceType, number>;
  };

  export enum SpaceShipType {
    standartSpaseShip = 'standartSpaseShip',
  }
  export type SpaceShipConfigData = {
    stability: number;
    radius: number;
    image: imageNamesTp;
    image_broken: imageNamesTp;
    forwardSpeed: number;
    powerLavel: number;
    phisicMode: PhisicMode;
  };



  export enum BuildingType {
    hookTier1,
    hookTier2,
    hookTier3,
    bombTier1,
    trapTier1,
    starting,
    disease1,
    disease2,
    disease3,
  }
  export enum AbilityType {
    hook = "hook",
    bomb = "bomb",
    trap = "trap",
    spaseShip = "spaseShip",
    diesese = "diesese",
  }
  export type BuildingConfigData = {
    radius: number;

    image_build: imageNamesTp;
    image_icon: imageNamesTp;

    abilityConfig: HookType | BombType | SpaceShipType | TrapType | MeteorDiseaseType;
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
      diseaseValue: 0,
      startBuilding: null,
      phisicMode: PhisicMode.braking,
    },
    [PlanetType.startPlanet]: {
      stability: 7,
      radius: 50,
      image: "planet",
      mass: 200,
      diseaseValue: 0,
      startBuilding: BuildingType.starting,
      phisicMode: PhisicMode.braking,
    },
    [PlanetType.diseasePlanet]: {
      stability: 10,
      radius: 40,
      image: "planet",
      mass: 200,
      diseaseValue: 10,
      startBuilding: BuildingType.disease1,
      phisicMode: PhisicMode.braking,
    },
  };




  export const MeteorConfig: Record<MeteorType, MeteorConfigData> = {
    [MeteorType.smallMeteor]: {
      stability: 1,
      radius: 8,
      image: "planet_blue",
      phisicMode: PhisicMode.gravity,
      innerResource: new Map<ResourceType, number>([
        [ResourceType.iron, 1],
        [ResourceType.gold, 0],
      ]),
    },
    [MeteorType.mediumMeteor]: {
      stability: 2,
      radius: 12,
      image: "planet_blue",
      phisicMode: PhisicMode.gravity,
      innerResource: new Map<ResourceType, number>([
        [ResourceType.iron, 2],
        [ResourceType.gold, 0],
      ]),
    },
    [MeteorType.largeMeteor]: {
      stability: 3,
      radius: 20,
      image: "planet_yellow",
      phisicMode: PhisicMode.gravity,
      innerResource: new Map<ResourceType, number>([
        [ResourceType.iron, 2],
        [ResourceType.gold, 1],
      ]),
    },
  };



  export const HookConfig: Record<HookType, HookConfigData> = {
    [HookType.hookTier1]: {
      stability: 10,
      radius: 10, 
      image: "hook_end", 
      forwardSpeed: 400,
      backwardSpeed: 400, 
      powerLavel: 1,
      maxLenth: 250, 
      phisicMode: PhisicMode.standart
    },
    [HookType.hookTier2]: {
      stability: 10,
      radius: 20, 
      image: "hook_end", 
      forwardSpeed: 800, 
      backwardSpeed: 1000, 
      powerLavel: 3, 
      maxLenth: 400, 
      phisicMode: PhisicMode.standart
    },
    [HookType.hookTier3]: {
      stability: 10,
      radius: 30,
      image: "hook_end", 
      forwardSpeed: 1500, 
      backwardSpeed: 2000, 
      powerLavel: 10,
      maxLenth: 1000, 
      phisicMode: PhisicMode.standart
    },
  };
  export const BombConfig: Record<BombType, BombConfigData> = {
    [BombType.standartBomb]: {
      stability: 10,
      radius: 20,
      image: 'build2',
      phisicMode: PhisicMode.braking,
      speed: 400,
      maxDist: 9999,

      explosionRadius: 40,
      blastWaveRadius: 200,

      explosionStregth: 1,
      blastWaveStregth: 8,
      blastWaveVelocityAdd: 200,
      
      explosionImages: ['build0', 'build2'],
      itemCost:new Map<ResourceType, number>([
        [ResourceType.iron, 0],
        [ResourceType.gold, 1],
      ])
    },
  };
  export const TrapConfig: Record<TrapType, TrapConfigData> = {
    [TrapType.standartTrap]: {
    stability: 10,
    radius: 20,
    image: "build0", //TODO
    phisicMode: PhisicMode.braking,
    speed: 200,
    maxDist: 9999,

    trapRadius: 300,
    trapStregth: 7,
    trapVelocityAdd: 10,
    activeImage: 'build1',
    activeDuration: 4,
    itemCost: new Map<ResourceType, number>([
      [ResourceType.gold, 5],
      [ResourceType.iron, 10],
    ])
    },
  };

  export const SpaceShipConfig: Record<SpaceShipType, SpaceShipConfigData> = {
    [SpaceShipType.standartSpaseShip] : {
      stability: 1,
      radius: 10,
      image: 'icon3', //TODO
      image_broken: 'ship_broken',
      forwardSpeed: 400,
      powerLavel: 4,
      phisicMode: PhisicMode.gravity
    }
  }


  export const Other = {
    spaceship_cost: 
      new Map<ResourceType, number>([
        [ResourceType.iron, 2],
        [ResourceType.gold, 0],
      ]),
    space_icon_name: 'icon3',
    space_icon_rad: 15,
    space_img_name: 'build3',
    space_img_rad: 15,
    space_build_image: <HTMLImageElement>null,
  }
  export enum MeteorDiseaseType {
    tier1 = 'tier1',
    tier2 = 'tier2',
    tier3 = 'tier3',
  }
  export type MeteorDiseaseConfigData = {
    radius: number;
    image: imageNamesTp;
    phisicMode: PhisicMode;
    stability: number;
    diseaseAdd: number;
    vel: number;
  };
  export const MeteorDiseaseConfig: Record<
    MeteorDiseaseType,
    MeteorDiseaseConfigData
  > = {
    [MeteorDiseaseType.tier1]: {
      radius: 10,
      image: "disease",
      phisicMode: PhisicMode.standart,
      stability: 3,
      vel: 20,
      diseaseAdd: 3,
    },
    [MeteorDiseaseType.tier2]: {
      radius: 5,
      image: "disease",
      phisicMode: PhisicMode.standart,
      stability: 2,
      vel: 200,
      diseaseAdd: 2,
    },
    [MeteorDiseaseType.tier3]: {
      radius: 20,
      image: "disease",
      phisicMode: PhisicMode.standart,
      stability: 7,
      vel: 40,
      diseaseAdd: 10,
    },
  };
  export const SpawnerConfig = {
    met_vel:100,
    disease_vel:100,
    offscreen_dist:100
  }
  export const BuildingConfig: Record<BuildingType, BuildingConfigData> = {
    [BuildingType.starting]: {
      radius: 15,
      image_build: "build0",
      image_icon: "icon1",
      abilityType: null,
      abilityConfig: null,
      cost: new Map<ResourceType, number>([
        [ResourceType.iron, 0],
        [ResourceType.gold, 0],
      ]),
      nextUpgrades: [BuildingType.hookTier1, BuildingType.bombTier1],
    },
    [BuildingType.hookTier1]: {
      radius: 15,
      image_build: "build1",
      image_icon: "icon1",
      abilityType: AbilityType.hook,
      abilityConfig: HookType.hookTier1,
      cost: new Map<ResourceType, number>([
        [ResourceType.iron, 2],
        [ResourceType.gold, 0],
      ]),
      nextUpgrades: [BuildingType.hookTier2],
    },
    [BuildingType.hookTier2]: {
      radius: 15,
      image_build: "build1",
      image_icon: "icon1",
      abilityType: AbilityType.hook,
      abilityConfig: HookType.hookTier2,
      cost: new Map<ResourceType, number>([
        [ResourceType.iron, 2],
        [ResourceType.gold, 0],
      ]),
      nextUpgrades: [BuildingType.hookTier3],
    },
    [BuildingType.hookTier3]: {
      radius: 15,
      image_build: "build1",
      image_icon: "icon1",
      abilityType: AbilityType.hook,
      abilityConfig: HookType.hookTier3,
      cost: new Map<ResourceType, number>([
        [ResourceType.iron, 2],
        [ResourceType.gold, 2],
      ]),
      nextUpgrades: [],
    },
    [BuildingType.bombTier1]: {
      radius: 15,
      image_build: "build2",
      image_icon: "icon2",
      abilityType: AbilityType.bomb,
      abilityConfig: BombType.standartBomb,
      cost: new Map<ResourceType, number>([
        [ResourceType.iron, 0],
        [ResourceType.gold, 2],
      ]),
      nextUpgrades: [BuildingType.trapTier1],
    },
    [BuildingType.trapTier1]: {
      radius: 15,
      image_build: "build2",
      image_icon: "icon2",
      abilityType: AbilityType.trap,
      abilityConfig: TrapType.standartTrap,
      cost: new Map<ResourceType, number>([
        [ResourceType.iron, 10],
        [ResourceType.gold, 10],
      ]),
      nextUpgrades: [],
    },
    [BuildingType.disease1]: {
      evil: true,
      radius: 15,
      image_build: "disease",
      image_icon: "ship_broken",
      abilityType: AbilityType.diesese,
      abilityConfig: MeteorDiseaseType.tier1,
      cost: null,
      nextUpgrades: [],
    },
    [BuildingType.disease2]: {
      evil: true,
      radius: 15,
      image_build: "disease",
      image_icon: "ship_broken",
      abilityType: AbilityType.diesese,
      abilityConfig: MeteorDiseaseType.tier2,
      cost: null,
      nextUpgrades: [],
    },
    [BuildingType.disease3]: {
      evil: true,
      radius: 15,
      image_build: "disease",
      image_icon: "ship_broken",
      abilityType: AbilityType.diesese,
      abilityConfig: MeteorDiseaseType.tier3,
      cost: null,
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
    Items:       1 << 2,
    SpaseShip:   1 << 3,
    Disease:     1 << 4,
    All:         1 << 5,
  };

  export let planets: Planet[] = [];
  export let meteors: Meteor[] = [];
  export let spaceships: SpaceShip[] = [];
  export let items: (Hook|Bomb)[] = [];
  export let meteorsDis: MeteorDisease[] = [];
  let meteorSpawners:Spawner[] = [];
  export let diseasedPlanets: Planet[] = []; //This is horrible. We assume obj wouldn't loose diseased building ever
  let diseaseSpawners:Spawner[] = [];
  export let max_meteors:number = 20; //Just change it when creating lvls

  let objects: Circle[] = [];    // here will be all objects, with duplicates in planets, meteors etc

  // export let startBuilding;
  export const buildings:{ [k in GAME_CONFIG.BuildingType]?: Building } = {};

  function getRandomVector(border:number):Vector{
    return new Vector(border+Math.random()*(LD_GLOB.canvas.width-border*2),border+Math.random()*(LD_GLOB.canvas.height-border*2));
  }

  export function init() {
    lastFrame = new Date().getTime();
    GAME_CONFIG.Other.space_build_image = LD_GLOB.getImage(<any>GAME_CONFIG.Other.space_img_name);
    for(let key in Object.keys(GAME_CONFIG.BuildingType)
                    .filter((v) => isNaN(Number(v)))){ //creates one building of each type
      buildings[key] = new Building(<any> key);
    }

    addSpawner(new Spawner('disease',getRandomVector(0)));
    addSpawner(new Spawner('meteor',getRandomVector(0),GAME_CONFIG.MeteorType.smallMeteor));
    addSpawner(new Spawner('meteor',getRandomVector(0),GAME_CONFIG.MeteorType.mediumMeteor));
    addSpawner(new Spawner('meteor',getRandomVector(0),GAME_CONFIG.MeteorType.largeMeteor));

    let obj = new Planet( new Vector(LD_GLOB.canvas.width-100,LD_GLOB.canvas.height-100), GAME_CONFIG.PlanetType.startPlanet);
    obj.inventory.addResource(ResourceType.iron, 6);
    obj.inventory.addResource(ResourceType.gold, 0);
    addCircleObject(obj);
    obj = new Planet( new Vector(120,120), GAME_CONFIG.PlanetType.diseasePlanet);
    addCircleObject(obj);
    for(let i=0; i<12;i++){
      let col =true, count=0;
      let planet = new Planet( getRandomVector(100), GAME_CONFIG.PlanetType.planet);
      while(col && count<20){
        planet.coordinates =  getRandomVector(100);
        col = (GAME_LD.getColisions(planet,Layers.Planet).length>0);
        count++;
      }
      addCircleObject(planet);
    }
    for(let i=0; i<3;i++){
      addCircleObject(new Meteor( getRandomVector(50), GAME_CONFIG.MeteorType.smallMeteor, new Vector(Math.random()*100-50,Math.random()*100-50)));
    }


  }
  export function addCircleObject(obj:Circle){
    if(objects.indexOf(obj)>=0) throw new Error('Object is added to the scene a second time.');
    if(obj instanceof Planet){
        planets.push(obj);
        obj.my_array = planets;
    } else if(obj instanceof Meteor){
      meteors.push(obj);
      obj.my_array = meteors;
    } else if(obj instanceof MeteorDisease){
      meteorsDis.push(obj);
      obj.my_array = meteorsDis;
    } else if(obj instanceof SpaceShip){
      spaceships.push(obj);
      obj.my_array = spaceships;
    } else if(obj instanceof Hook || obj instanceof Bomb){
      items.push(obj);
      obj.my_array = <any>items;
    }
    objects.push(obj);
  }
  export function addPlanetsInDiseased(obj: Planet) {
    if (diseasedPlanets.indexOf(obj) >= 0){
      return;
    }
    diseasedPlanets.push(obj);
    GAME_LD.checkWinLoseConditions();
  }
  export function delPlanetsFromDiseased(obj: Planet) {
    arrDel(diseasedPlanets, obj);
    GAME_LD.checkWinLoseConditions();
  }

  export function delCircleObject(obj:Circle){
    arrDel(objects, obj);
    if(obj.my_array)arrDel(obj.my_array, obj);
  }
  export function addSpawner(spw:Spawner){
    if(spw.obj_type=='meteor')meteorSpawners.push(spw);
    else diseaseSpawners.push(spw);
  }
  export function getAcseleration(point: Vector){
    let res = new Vector(0,0);
    for(let planet of planets){
        let dir = planet.coordinates
            .sub(point);
        let len = dir.len()
        if(len==0)continue;   // to avoid division by 0
        let a = dir.multiply(planet.mass*150 / Math.max(1000000,len**3))//*500 **3
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
    if ((layer & Layers.Disease) != 0){
      for (let obj of meteorsDis) {
        if (circle.checkCollision(obj)) colisions.push(obj)
      }
    }
    if ((layer & Layers.SpaseShip) != 0){
      for (let obj of spaceships) {
        if (circle.checkCollision(obj)) colisions.push(obj)
      }
    }
    if ((layer & Layers.Items) != 0){
      for (let obj of items) {
        if (circle.checkCollision(obj)) colisions.push(obj)
      }
    }
    if ((layer & Layers.All) != 0) {
      for (let obj of objects) {
        if (circle.checkCollision(obj)) colisions.push(obj);
      }
    }
    return colisions;
  }

  export function checkWinLoseConditions(){
    let player_planets=0;
    planets.forEach(el=>{if(el.building && !el.building.config.evil)player_planets+=1;});
    let is_all_spaseShipDie = false;
    for (let s of spaceships){
      is_all_spaseShipDie = is_all_spaseShipDie || !s.broken;
    }
    if(player_planets==0 && is_all_spaseShipDie){
      restart();
      LD_GLOB.menu_text = 'Humanity is dead. Press Enter.';
      playSound('death',.1);
    }
    if(diseasedPlanets.length == 0){
      restart();
      LD_GLOB.menu_text = "The space is ours! Victory!";
    }
  }
  export function restart(){
    clearAll();
    LD_GLOB.game_state='menu';
    init();
  }

  export function clearAll(){
    while(objects.length)delCircleObject(objects[0]);
    clearButtons();
    diseaseSpawners = [];
    meteorSpawners = [];
    diseasedPlanets = [];
    stepN = 0;
    diseaseTimer = DISEASE_WAIT;
    meteorTimer = 0;
    backmusicTimer = 0;
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
    // for (let planet1 of diseasedPlanets) {
    //   for (let planet2 of diseasedPlanets){
    //     if (planet1 != planet2){
    //       dst.fillStyle = LD_GLOB.COLORS.red;
    //       drawLine(
    //         dst,
    //         planet1.coordinates.x,
    //         planet1.coordinates.y,
    //         planet2.coordinates.x,
    //         planet2.coordinates.y,
    //         null,
    //         10
    //       )
    //     }
    //   }
    // }
    //FOR DEBUG:
    // dst.fillStyle='#ffffff';
    // for(let sp of meteorSpawners){
    //   dst.fillRect(sp.target.x,sp.target.y,3,3);
    // }
    // dst.fillStyle='#ffaaff';
    // for(let sp of diseaseSpawners){
    //   dst.fillRect(sp.target.x,sp.target.y,3,3);
    // }
    dst.fillStyle = LD_GLOB.COLORS.main_5;
    dst.fillText(`R : Restart`,30,40);
    dst.fillText(`M : Mute`,30,60);



    // dst.fillText(`plnt:${planets.length}`,10,40);
    // dst.fillText(`met:${meteors.length}`,10,60);
    // dst.fillText(`dis:${meteorsDis.length}`,10,80);
    // dst.fillText(`ships:${spaceships.length}`,10,100);
    // dst.fillText(`items:${items.length}`,10,120);
  }

  const DISEASE_WAIT = 5;
  let stepN=0;
  let diseaseTimer=DISEASE_WAIT;
  let meteorTimer=0;
  const SONG_LEN = 120;
  let backmusicTimer = 2;
  export let backsnd:AudioBufferSourceNode;
  const OFF_BORD = GAME_CONFIG.SpawnerConfig.offscreen_dist + 100;
  export function stepGame() {
    let delta = (new Date().getTime() - lastFrame) / 1000;
    stepN++;
    
    for(let obj of objects){
      obj.step(delta);
    }
    if(stepN%50==0){
      for(let cir of objects)
        if(cir.coordinates.x<-OFF_BORD||cir.coordinates.y<-OFF_BORD||
          cir.coordinates.x>LD_GLOB.canvas.width+OFF_BORD||cir.coordinates.y>LD_GLOB.canvas.height+OFF_BORD){
            GAME_LD.delCircleObject(cir);
          }
    }
    if(stepN%10==0){
      for(let pl of planets){
        // if(pl.coordinates.x<pl.radius && pl.velocity.x<0) pl.addVelocity(new Vector(-pl.velocity.x*1.3,0));
        // if(pl.coordinates.y<pl.radius && pl.velocity.y<0) pl.addVelocity(new Vector(0,-pl.velocity.y*1.3));
        // if(LD_GLOB.canvas.width-pl.coordinates.x<pl.radius && pl.velocity.x>0) pl.addVelocity(new Vector(-pl.velocity.x*1.3,0));
        // if(LD_GLOB.canvas.height-pl.coordinates.y<pl.radius && pl.velocity.y>0) pl.addVelocity(new Vector(0,-pl.velocity.y*1.3));
        if(pl.coordinates.x<pl.radius) pl.addVelocity(new Vector(33,0));
        if(pl.coordinates.y<pl.radius) pl.addVelocity(new Vector(0,33));
        if(LD_GLOB.canvas.width-pl.coordinates.x<pl.radius) pl.addVelocity(new Vector(-33,0));
        if(LD_GLOB.canvas.height-pl.coordinates.y<pl.radius) pl.addVelocity(new Vector(0,-33));
      }
    }
    meteorTimer-=delta;
    if(meteorTimer<0){
      meteorTimer=Math.max(1,4-.5*meteorSpawners.length)+Math.random()*5;
      if(meteorSpawners.length>0 && meteors.length<max_meteors)meteorSpawners[~~(Math.random()*meteorSpawners.length)].spawn();
    }
    diseaseTimer-=delta;
    if(diseaseTimer<0){
      diseaseTimer=Math.max(1,10-.7*diseasedPlanets.length)+Math.random()*5;
      if(diseasedPlanets.length>0) launchDisease(diseasedPlanets[~~(diseasedPlanets.length*Math.random())]);
      else if(diseaseSpawners.length)diseaseSpawners[~~(Math.random()*diseaseSpawners.length)].spawn();
    }
    backmusicTimer-=delta;
    if(backmusicTimer<0){
      if(!backsnd){
        backsnd=playSound('background',1);
        if(backsnd)backsnd.onended=()=>{backsnd = null;};
        backmusicTimer = SONG_LEN+0;
      } else backmusicTimer += 10;
      console.log(`back`);
    }
    lastFrame = new Date().getTime();
  }
}
