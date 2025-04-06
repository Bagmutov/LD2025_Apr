import { Ability } from "./ability.js";
import { Planet } from "../planet.js";
import { Vector } from "../vector.js";
import { GAME_CONFIG, GAME_LD } from "../../game.js";
import { Circle } from "../circle.js";
import { Meteor } from "../meteor.js";


export class Hook extends Ability{
  speed: number;
  powerLavel: number;
  maxLenth: number;
  hokedObjest: Circle;
  isPushed: boolean

  constructor(direction: Vector, type: GAME_CONFIG.HookType, planet: Planet) {
    let config = GAME_CONFIG.HookConfig[type];
    super(direction.multiply(config.speed), config.radius, config.image, planet);
    this.speed = config.speed;
    this.maxLenth = config.maxLenth;
    this.powerLavel = config.powerLavel;
  }

  step(delta: number){
    if (this.coordinates.sub(this.planet.coordinates).len() > this.maxLenth){
        this.isPushed = false;
    }
    if (!this.isPushed){
        this.velocity = this.coordinates.sub(this.planet.coordinates).normalize().multiply(this.speed);
    }
    this.coordinates.add(this.velocity);

    if (this.hokedObjest == null){
        let tempHokedObjects = GAME_LD.getColisions(this, GAME_LD.Layers.Meteor);
        if (tempHokedObjects.length != 0){
            this.hokedObjest = tempHokedObjects[0];
            this.isPushed = false;
            this.hokedObjest.useGravity = false;
            this.hokedObjest.coordinates = this.coordinates;
        }
    } else{
        this.hokedObjest.coordinates = this.coordinates;
    }
  }
}