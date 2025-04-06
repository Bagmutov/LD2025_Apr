import { GAME_LD, GAME_CONFIG } from "../game.js";
import { LD_GLOB } from "../main.js";
import { drawLine } from "../tools.js";
import { Hook } from "./abilities/hook.js";
import { Building } from "./buildings/building.js";
import { crtButton } from "./button.js";
import { Circle } from "./circle.js";
import { Meteor } from "./meteor.js";
import { Vector } from "./vector.js";


export class Planet extends Circle {
  hp: number;
  mass: number;
  launch_xy:Vector = null;


  building: Building = null;



  constructor(
    coordinate: Vector,
    type: GAME_CONFIG.PlanetType
  ) {
    let config = GAME_CONFIG.PlanetConfig[type];
    super(coordinate, config.radius, LD_GLOB.getImage(config.image), config.useGravity);
    this.mass = config.mass;


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
      let obj_child = new Hook(GAME_CONFIG.HookType.standart, this);
      this.launchObject(obj_child, this.launch_xy.multiply(obj_child.forwardSpeed));
      console.log(
        `object launched hook vith vel (${this.launch_xy.x}, ${this.launch_xy.y}), speed: ${obj_child.forwardSpeed}`
      );
      this.launch_xy = null;
    };
  }
  draw(dst: CanvasRenderingContext2D): void {
    if (this.building != null){
      this.building.draw(dst);
    }
    super.draw(dst);
    if(this.launch_xy){
      drawLine(dst,this.coordinates.x,this.coordinates.y,this.coordinates.x+this.launch_xy.x,this.coordinates.y+this.launch_xy.y,LD_GLOB.COLORS.main_6, 4);
    }
  }
  step(delta:number){
    super.step(delta);
  }
}
