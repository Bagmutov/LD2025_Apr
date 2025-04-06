import { Launchee } from "./launchee.js";
import { Planet } from "../planet.js";
import { Vector } from "../vector.js";
import { GAME_CONFIG, GAME_LD } from "../../game.js";
import { Circle, PhisicMode } from "../circle.js";
import { LD_GLOB } from "../../main.js";
import { drawLine } from "../../tools.js";


export class Hook extends Launchee{
  forwardSpeed: number;
  backwardSpeed: number;
  powerLavel: number;
  maxLenth: number;
  hokedObjest: Circle;
  isPushed: boolean = true;

  constructor(type: GAME_CONFIG.HookType, planet: Planet) {
    let config = GAME_CONFIG.HookConfig[type];
    super(config.radius, LD_GLOB.getImage(config.image), planet, config.phisicMode, config.stability);
    this.forwardSpeed = config.forwardSpeed;
    this.backwardSpeed = config.backwardSpeed;
    this.maxLenth = config.maxLenth;
    this.powerLavel = config.powerLavel;
  }
  launch(direction: Vector, force: number): void {
    this.addVelocity(direction.multiply(force*this.forwardSpeed))
  }
  draw(dst: CanvasRenderingContext2D): void {
    drawLine(
      dst,
      this.coordinates.x,
      this.coordinates.y,
      this.planet.coordinates.x,
      this.planet.coordinates.y,
      LD_GLOB.COLORS.main_4,
      4
    );
    super.draw(dst);
  }

  step(delta: number){
    if (this.coordinates.sub(this.planet.coordinates).len() > this.maxLenth){
        this.isPushed = false;
    }
    if (!this.isPushed){
        this.velocity = this.planet.coordinates.sub(this.coordinates).normalize().multiply(this.backwardSpeed);
        if (this.coordinates.sub(this.planet.coordinates).len() < this.planet.radius){
          this.destroy()
        }
    }
    super.step(delta);

    if (this.hokedObjest == null){
        let tempHokedObjects = GAME_LD.getColisions(this, GAME_LD.Layers.Meteor);
        if (tempHokedObjects.length != 0){
            this.hokedObjest = tempHokedObjects[0];
            this.isPushed = false;
            this.hokedObjest.phisicMode = PhisicMode.none;
            this.hokedObjest.coordinates = this.coordinates;
        }
    } else{
        this.hokedObjest.coordinates = this.coordinates;
    }
  }
}