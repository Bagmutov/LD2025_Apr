import { Launchee } from "./ability.js";
import { Planet } from "../planet.js";
import { Vector } from "../vector.js";
import { GAME_CONFIG, GAME_LD } from "../../game.js";
import { Circle } from "../circle.js";
import { LD_GLOB } from "../../main.js";


export class Hook extends Launchee{
  forwardSpeed: number;
  backwardSpeed: number;
  powerLavel: number;
  maxLenth: number;
  hokedObjest: Circle;
  isPushed: boolean = true;

  constructor(type: GAME_CONFIG.HookType, planet: Planet) {
    let config = GAME_CONFIG.HookConfig[type];
    super(config.radius, LD_GLOB.getImage(config.image), planet, config.useGravity);
    this.forwardSpeed = config.forwardSpeed;
    this.backwardSpeed = config.backwardSpeed;
    this.maxLenth = config.maxLenth;
    this.powerLavel = config.powerLavel;
  }
  launch(direction: Vector, force: number): void {
    this.addVelocity(direction.multiply(force*this.forwardSpeed))
  }

  step(delta: number){
    console.log(1);
    if (this.coordinates.sub(this.planet.coordinates).len() > this.maxLenth){
        console.log(2);
        this.isPushed = false;
    }
    if (!this.isPushed){
        console.log(3);
        this.velocity = this.planet.coordinates.sub(this.coordinates).normalize().multiply(this.backwardSpeed);
        if (this.coordinates.sub(this.planet.coordinates).len() < this.planet.radius){
          this.destroy()
        }
    }
    super.step(delta);

    if (this.hokedObjest == null){
        console.log(4);
        let tempHokedObjects = GAME_LD.getColisions(this, GAME_LD.Layers.Meteor);
        if (tempHokedObjects.length != 0){
            console.log(5);
            this.hokedObjest = tempHokedObjects[0];
            this.isPushed = false;
            this.hokedObjest.useGravity = false;
            this.hokedObjest.coordinates = this.coordinates;
        }
    } else{
        console.log(6);
        this.hokedObjest.coordinates = this.coordinates;
    }
  }
}