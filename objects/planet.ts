import { GAME_LD, GAME_CONFIG } from "../game.js";
import { LD_GLOB } from "../main.js";
import { drawLine } from "../tools.js";
import { Hook } from "./abilities/hook.js";
import { Building } from "./buildings/building.js";
import { crtButton } from "./button.js";
import { Circle } from "./circle.js";
import { Meteor } from "./meteor.js";
import { Inventory } from "./resource/inventory.js";
import { Vector } from "./vector.js";


export class Planet extends Circle {
  mass: number;
  inventory: Inventory;
  launch_xy: Vector = null;
  launch_xy_max_len = 200;

  building: Building;

  constructor(coordinate: Vector, type: GAME_CONFIG.PlanetType) {
    let config = GAME_CONFIG.PlanetConfig[type];
    super(
      coordinate,
      config.radius,
      LD_GLOB.getImage(config.image),
      config.useGravity
    );
    this.mass = config.mass;
    this.building = GAME_LD.startBuilding;

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
      if (this.building != null) {
        let launchee = this.building.buildAbility(this);
        this.addParent(launchee);
        launchee.launch(this.launch_xy.normalize(), this.launch_xy.len()/this.launch_xy_max_len);
      }
      this.launch_xy = null;
    };
  }
  draw(dst: CanvasRenderingContext2D): void {
    super.draw(dst);
    if (this.building != null) {
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
  }
  step(delta: number) {
    super.step(delta);
  }
}
