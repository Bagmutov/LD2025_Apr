import { GAME_LD, GAME_CONFIG } from "../game.js";
import { LD_GLOB } from "../main.js";
import { drawLine } from "../tools.js";
import { Hook } from "./abilities/hook.js";
import { Spaceship } from "./abilities/spaceship.js";
import { Building } from "./buildings/building.js";
import { Button, crtButton, delButton } from "./button.js";
import { Circle } from "./circle.js";
import { Meteor } from "./meteor.js";
import { Inventory } from "./resource/inventory.js";
import { Vector } from "./vector.js";


export class Planet extends Circle {
  mass: number;
  inventory: Inventory = new Inventory();
  launch_xy: Vector = null;
  launch_xy_max_len = 200;
  temp_launch:boolean = false; //indicates that spaceship is bought and ready for one time launch

  building: Building = null;
  launch_but:Button = null;
  upgrade_buttons:Button[] = [];

  constructor(coordinate: Vector, type: GAME_CONFIG.PlanetType) {
    let config = GAME_CONFIG.PlanetConfig[type];
    super(
      coordinate,
      config.radius,
      LD_GLOB.getImage(config.image),
      config.phisicMode,
      config.stability,
    );
    this.mass = config.mass;
    this.build(GAME_LD.buildings[GAME_CONFIG.BuildingType.starting]);
  }
  draw(dst: CanvasRenderingContext2D): void {
    super.draw(dst);
    if(this.temp_launch){
      dst.drawImage(GAME_CONFIG.Other.space_build_image,this.coordinates.x-GAME_CONFIG.Other.space_img_rad,this.coordinates.y-GAME_CONFIG.Other.space_img_rad,);
    }else if (this.building != null) {
      this.building.draw(dst, this);
    }
    if (this.launch_xy) {
      drawLine(
        dst,
        this.coordinates.x,
        this.coordinates.y,
        this.coordinates.x + this.launch_xy.x,
        this.coordinates.y + this.launch_xy.y,
        LD_GLOB.COLORS.main_6,
        4
      );
    }
    dst.fillStyle = LD_GLOB.COLORS.main_6;
    // dst.font =  20 + "px Shantell Sans";
    dst.fillText(`${this.inventory.countOfResources.iron}`,
        this.coordinates.x+this.radius, this.coordinates.y);
    dst.fillText(`${this.inventory.countOfResources.gold}`,
        this.coordinates.x+this.radius, this.coordinates.y+20);
  }
  build(bld:Building){
    const icon_rad=15;
    this.building = bld;
    for(let but of this.upgrade_buttons){
      delButton(but);
    }
    let ang = 3.1415, but:Button;
    for(let ind in bld.nextUpgrades){
      const next = GAME_LD.buildings[bld.nextUpgrades[ind]];
      but = crtButton(this, Math.cos(ang)*this.radius*1.5,Math.sin(ang)*this.radius*1.5, icon_rad, next.image_icon);
      but.ms_click = ()=>{
        if(this.inventory.canPay(next.cost)){
          this.inventory.pay(next.cost);
          this.build(next);
        }
      }
      this.upgrade_buttons.push(but);
      ang -= 3.1415/6;
    }
    but = crtButton(this, Math.cos(-1.57)*this.radius*1.5,Math.sin(-1.57)*this.radius*1.5, icon_rad, 
                    LD_GLOB.getImage(<any>GAME_CONFIG.Other.space_icon_name));
    but.ms_click = ()=>{
      if(this.inventory.canPay(GAME_CONFIG.Other.spaceship_cost)){
        this.inventory.pay(GAME_CONFIG.Other.spaceship_cost);
        this.temp_launch = true;
        this.updateLaunchButton();
      }
    }
    this.upgrade_buttons.push(but)
    this.updateLaunchButton();
  }
  updateLaunchButton(){
    if((this.building.abilityType != null || this.temp_launch)){
      if(!this.launch_but){
        let but = crtButton(this, 0, 0, this.radius + 5);
        but.ms_down = () => {
          this.launch_xy = new Vector(0, 0);
        };
        but.ms_move = (dx, dy) => {
          this.launch_xy.x = dx;
          this.launch_xy.y = dy;
          if (this.launch_xy.lenSq() > this.launch_xy_max_len**2)
            this.launch_xy = this.launch_xy.normalize(this.launch_xy_max_len);
        };
        but.ms_up = () => {
          if(this.temp_launch){
            // let launchee = new Spaceship();
            // GAME_LD.addCircleObject(launchee);
            // launchee.launch(this.launch_xy.normalize(), this.launch_xy.len());
            this.temp_launch = false;
          }else if (this.building != null && this.building.abilityConfig!=null) {
            let launchee = this.building.buildAbility(this);
            GAME_LD.addCircleObject(launchee);
            launchee.launch(this.launch_xy.normalize(-1), this.launch_xy.len());
          }
          this.updateLaunchButton();
          this.launch_xy = null;
        };
        this.launch_but = but;
      }
    } else {
      if(this.launch_but){
        delButton(this.launch_but);
        this.launch_but = null;
      }
    }
  }
  step(delta: number) {
    super.step(delta);
  }
}
