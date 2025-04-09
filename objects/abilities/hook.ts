import { Launchee } from "./launchee.js";
import { Planet } from "../planet.js";
import { Vector } from "../vector.js";
import { GAME_CONFIG, GAME_LD } from "../../game.js";
import { Circle, PhisicMode } from "../circle.js";
import { LD_GLOB, playSound } from "../../main.js";
import { drawLine } from "../../tools.js";
import { ResourceType } from "../resource/resource.js";


export class Hook extends Launchee{
  backwardSpeed: number;
  powerLavel: number;
  maxLenth: number;
  hokedObject: Circle;
  isPushed: boolean = true;

  constructor(type: GAME_CONFIG.HookType, planet: Planet) {
    let config = GAME_CONFIG.HookConfig[type];
    super(config.radius, LD_GLOB.getImage(config.image), planet, config.phisicMode, config.forwardSpeed, config.stability, planet.coordinates);
    this.forwardSpeed = config.forwardSpeed;
    this.backwardSpeed = config.backwardSpeed;
    this.maxLenth = config.maxLenth;
    this.powerLavel = config.powerLavel;
    playSound('hook1',.1);
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
    if (this.coordinates.sub(this.planet.coordinates).len() > this.radius){
        this.isPushed = false;
    }
    // if (!this.isPushed){
    {
        // this.velocity = this.planet.coordinates.sub(this.coordinates).normalize().multiply(this.backwardSpeed);
        const dif = this.planet.coordinates.sub(this.coordinates);
        this.addVelocity(dif.normalize().multiply(this.backwardSpeed*.03));
        if (dif.dot_prod(this.velocity)>0 && this.coordinates.sub(this.planet.coordinates).len() < this.planet.radius){
          if(this.hokedObject&&this.hokedObject['innerResource']){
            this.planet.inventory.addResoursesMap(this.hokedObject['innerResource']);
            this.hokedObject['innerResource'] = new Map<ResourceType, number>([
              [ResourceType.iron, 0],
              [ResourceType.gold, 0]
            ]);
            GAME_LD.delCircleObject(this.hokedObject);
            playSound('hook3',.1);
          }
          this.destroy();
          
        }
    }
    super.step(delta);

    if (this.hokedObject == null){
        let tempHokedObjects = GAME_LD.getColisions(
          this,
          GAME_LD.Layers.Meteor
        );
        for (let obj of tempHokedObjects){
          if (obj != this && obj != this.planet){
              this.hokedObject = obj;
              this.isPushed = false;
              playSound('hook2',.1);
              this.hokedObject.phisicMode = PhisicMode.none;
              this.hokedObject.coordinates = this.coordinates;
              break;
          }
        }
    } else{
        this.hokedObject.coordinates = this.coordinates;
    }
  }
}