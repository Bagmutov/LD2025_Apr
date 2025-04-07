import { GAME_LD, GAME_CONFIG } from "../game.js";
import { LD_GLOB, playSound } from "../main.js";
import { drawLine, isRightMB } from "../tools.js";
import { Launchee } from "./abilities/launchee.js";
import { SpaceShip } from "./abilities/spaseShip.js";
import { Building } from "./buildings/building.js";
import { Button, crtButton, delButton } from "./button.js";
import { Circle } from "./circle.js";
import { MeteorDisease } from "./meteor_disease.js";
import { Inventory } from "./resource/inventory.js";
import { ResourceType } from "./resource/resource.js";
import { Vector } from "./vector.js";


export class Planet extends Circle {
  mass: number;
  inventory: Inventory = new Inventory();
  launch_xy: Vector = null;
  launch_xy_max_len = 200;
  launch_xy_min_pow = 400;
  temp_launch: boolean = false; //indicates that spaceship is bought and ready for one time launch

  building: Building = null;
  launch_but: Button = null;
  upgrade_buttons: Button[] = [];
  diseaseValue: number = 0;

  constructor(coordinate: Vector, type: GAME_CONFIG.PlanetType) {
    let config = GAME_CONFIG.PlanetConfig[type];
    super(
      coordinate,
      config.radius,
      LD_GLOB.getImage(config.image),
      config.phisicMode,
      config.stability
    );
    this.mass = config.mass;
    this.diseaseValue = config.diseaseValue;
    if (config.startBuilding) {
      this.build(GAME_LD.buildings[config.startBuilding]);
    }
  }
  draw(dst: CanvasRenderingContext2D): void {
    super.draw(dst);
    if (this.temp_launch) {
      dst.drawImage(
        GAME_CONFIG.Other.space_build_image,
        this.coordinates.x - GAME_CONFIG.Other.space_img_rad,
        this.coordinates.y - GAME_CONFIG.Other.space_img_rad
      );
    } else if (this.building != null) {
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
    if(this.building && !this.building.config.evil){
      dst.fillStyle = LD_GLOB.COLORS.main_6;
      // dst.font =  20 + "px Shantell Sans";
      dst.fillText(
        `${this.inventory.countOfResources.iron}${
          this.show_cost ? "|" + this.show_cost.iron : ""
        }`,
        this.coordinates.x + this.radius,
        this.coordinates.y
      );
      dst.fillStyle = LD_GLOB.COLORS.main_7;
      dst.fillText(
        `${this.inventory.countOfResources.gold}${
          this.show_cost ? "|" + this.show_cost.gold : ""
        }`,
        this.coordinates.x + this.radius,
        this.coordinates.y + 20
      );
    }
    if (this.diseaseValue > 0) {
      dst.fillStyle = LD_GLOB.COLORS.red;
      dst.fillText(
        `${this.diseaseValue}`,
        this.coordinates.x + this.radius,
        this.coordinates.y + this.radius
      );
    }
  }
  show_cost: { iron: number; gold: number } = null;
  build(bld: Building) {
    if(bld.config.evil){
      playSound('disease2',.1);
    } else {
      playSound('build',.1);
    }
    const icon_rad = 15;
    this.building = bld;
    this.show_cost = null;
    for (let but of this.upgrade_buttons) {
      delButton(but);
    }
    let ang = 3.1415,
      but: Button;
    for (let ind in bld.nextUpgrades) {
      const next = GAME_LD.buildings[bld.nextUpgrades[ind]];
      but = crtButton(
        this,
        Math.cos(ang) * this.radius * 1.5,
        Math.sin(ang) * this.radius * 1.5,
        icon_rad,
        next.image_icon
      );
      but.ms_over = () => {
        this.show_cost = {
          iron: next.config.cost.get(ResourceType.iron),
          gold: next.config.cost.get(ResourceType.gold),
        };
      };
      but.ms_out = () => {
        this.show_cost = null;
      };
      but.ms_click = () => {
        if (this.inventory.canPay(next.config.cost)) {
          this.inventory.pay(next.config.cost);
          this.build(next);
        }
      };
      this.upgrade_buttons.push(but);
      ang -= 3.1415 / 6;
    }
    if (!bld.config.evil) {
      but = crtButton(
        this,
        Math.cos(-1.57) * this.radius * 1.5,
        Math.sin(-1.57) * this.radius * 1.5,
        icon_rad,
        LD_GLOB.getImage(<any>GAME_CONFIG.Other.space_icon_name)
      );
      but.ms_over = () => {
        this.show_cost = {
          iron: GAME_CONFIG.Other.spaceship_cost.get(ResourceType.iron),
          gold: GAME_CONFIG.Other.spaceship_cost.get(ResourceType.gold),
        };
      };
      but.ms_out = () => {
        this.show_cost = null;
      };
      but.ms_click = () => {
        if (this.inventory.canPay(GAME_CONFIG.Other.spaceship_cost)) {
          this.inventory.pay(GAME_CONFIG.Other.spaceship_cost);
          this.temp_launch = true;
          this.updateLaunchButton();
        }
      };
    } else {
      GAME_LD.addPlanetsInDiseased(this);
    }
    this.upgrade_buttons.push(but);
    this.updateLaunchButton();
  }
  updateLaunchButton() {
    if (!this.building.config.evil && (this.building.config.abilityType != null || this.temp_launch)) {
      if (!this.launch_but) {
        let but = crtButton(this, 0, 0, this.radius + 5);
        but.ms_down = (e) => {
          if (isRightMB(e)) this.launch_xy = null;
          else this.launch_xy = new Vector(0, 0);
        };
        but.ms_move = (dx, dy) => {
          this.launch_xy.x = dx;
          this.launch_xy.y = dy;
          if (this.launch_xy.lenSq() > this.launch_xy_max_len ** 2)
            this.launch_xy = this.launch_xy.normalize(this.launch_xy_max_len);
        };
        but.ms_up = () => {
          let launchee: Launchee;
          if (this.temp_launch) {
            launchee = new SpaceShip(
              GAME_CONFIG.SpaceShipType.standartSpaseShip,
              this
            );
            this.temp_launch = false;
          } else if (
            this.building != null &&
            this.building.config.abilityConfig != null
          ) {
            launchee = this.building.buildLaunchee(this);
          }
          if (launchee) {
            launchee.coordinates = this.coordinates.add(
              this.launch_xy.normalize(-10)
            );
            launchee.launch(
              this.launch_xy.normalize(-1),
              (this.launch_xy.len() + this.launch_xy_min_pow) /
                (this.launch_xy_max_len + this.launch_xy_min_pow)
            );
            this.addParent(launchee);
          }
          this.updateLaunchButton();
          this.launch_xy = null;
        };
        this.launch_but = but;
      }
    } else {
      if (this.launch_but) {
        delButton(this.launch_but);
        this.launch_but = null;
      }
    }
  }
  disease_timer = 0;
  //disease_Value <= 0 - планета исцелилась
  //disease_Value > 0 - планета начала заражаться
  //disease_Value >= 10 - планета заразилась
  step(delta: number) {
    if (this.diseaseValue > 0) {
      this.disease_timer += delta;
      if (this.disease_timer > 2) {
        this.disease_timer = 0;
        this.diseaseValue += 1;
      }
    } else if (
      this.diseaseValue <= 0 &&
      this.building &&
      this.building.config.evil
    ) {
      console.log(1);
      this.building = null;
      GAME_LD.delPlanetsFromDiseased(this);
    }
    if (this.diseaseValue >= 50) {
      this.build(GAME_LD.buildings[GAME_CONFIG.BuildingType.disease3]);
      this.updateLaunchButton();
    } else if (this.diseaseValue >= 20) {
      this.build(GAME_LD.buildings[GAME_CONFIG.BuildingType.disease2]);
      this.updateLaunchButton();
    } else if (this.diseaseValue >= 10) {
      this.build(GAME_LD.buildings[GAME_CONFIG.BuildingType.disease1]);
      this.updateLaunchButton();
    }

    super.step(delta);

    let colisions = GAME_LD.getColisions(this, GAME_LD.Layers.Planet);
    if (colisions.length != 0) {
      let colisionPlanet = colisions[0] as Planet,
        dif = this.coordinates.sub(colisionPlanet.coordinates);
      this.addVelocity(dif.multiply(30 / this.mass));
      colisionPlanet.addVelocity(dif.multiply(-30 / this.mass));
    }
  }
}
