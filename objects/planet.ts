import { GAME_LD, GAME_CONFIG } from "../game.js";
import { LD_GLOB } from "../main.js";
import { drawLine } from "../tools.js";
import { Hook } from "./abilities/hook.js";
import { crtButton } from "./button.js";
import { Circle } from "./circle.js";
import { Meteor } from "./meteor.js";
import { Vector } from "./vector.js";


export class Planet extends Circle {
  hp: number;
  mass: number;
  launch_xy:Vector = null;
  constructor(
    coordinate: Vector,
    type: GAME_CONFIG.PlanetType
  ) {
    let config = GAME_CONFIG.PlanetConfig[type];
    super(coordinate, config.radius, LD_GLOB.getImage(config.image));
    this.mass = config.mass;
    this.useGravity = true;
    let but = crtButton(this, 0, 0, this.radius+5);
    but.ms_down=()=>{
      this.launch_xy = new Vector(0,0);
    };
    but.ms_move=(dx,dy)=>{
      this.launch_xy.x = dx;
      this.launch_xy.y = dy;
      if(this.launch_xy.lenSq()>200*200) this.launch_xy = this.launch_xy.normalize(200);
    };
    but.ms_up=()=>{
      let obj_child = new Meteor(new Vector(0, 10), GAME_CONFIG.MeteorType.largeMeteor, new Vector(-this.launch_xy.x*2,-this.launch_xy.y*2));
      // let obj_child = new Hook(new Vector(-this.launch_xy.x*2,-this.launch_xy.y*2), GAME_CONFIG.HookType.standart, this);
      this.launchObject(obj_child, null);
      this.launch_xy = null;
    };
  }
  draw(dst: CanvasRenderingContext2D): void {
    super.draw(dst);
    if(this.launch_xy){
      drawLine(dst,this.coordinates.x,this.coordinates.y,this.coordinates.x+this.launch_xy.x,this.coordinates.y+this.launch_xy.y,LD_GLOB.COLORS.main_6, 4);
    }
  }
  step(delta:number){
    // this.addVelocity(GAME_LD.getAcseleration(this.coordinates));
    super.step(delta);
  }
}
