import { GAME_LD } from "../game.js";
import { LD_GLOB } from "../main.js";
import { drawLine } from "../tools.js";
import { crtButton } from "./button.js";
import { Circle } from "./circle.js";
import { Meteor } from "./meteor.js";
import { Vector } from "./vector.js";

export class Planet extends Circle {
  hp: number;
  G: number;
  launch_xy:Vector = null;
  constructor(
    x: number,
    y: number,
    radius: number,
    texture: HTMLImageElement,
    hp: number,
    G: number
  ) {
    super(x, y, radius, texture);
    this.G = G;
    this.hp = hp;
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
      let meteor = new Meteor(0,0,10,LD_GLOB.getImage('planet'),1,new Vector(0,0));
      this.launchObject(meteor, new Vector(-this.launch_xy.x*2,-this.launch_xy.y*2));
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
    this.addVelocity(GAME_LD.getAcseleration(this.coordinates));
    super.step(delta);
  }
}
