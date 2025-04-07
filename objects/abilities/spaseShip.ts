import { GAME_CONFIG, GAME_LD } from "../../game.js";
import { LD_GLOB } from "../../main.js";
import { Planet } from "../planet.js";
import { Inventory } from "../resource/inventory.js";
import { Launchee } from "./launchee.js";

export class SpaceShip extends Launchee{
  inventory: Inventory;

  constructor(type: GAME_CONFIG.SpaceShipType, planet: Planet){
    let config = GAME_CONFIG.SpaceShipConfig[type];
    super(config.radius, LD_GLOB.getImage(config.image), planet, config.phisicMode, config.forwardSpeed, config.stability);
  }
  
  step(delta: number){
    super.step(delta);
    if (this.checkCollision(this.planet)) return;
    let meteorColision = GAME_LD.getColisions(this, GAME_LD.Layers.Meteor);
    if (meteorColision.length != 0){
      this.destroy();
    }
    let planetColision = GAME_LD.getColisions(this, GAME_LD.Layers.Planet);
    if (planetColision.length != 0){
      let collisionPlanet = planetColision[0] as Planet;
      collisionPlanet.build(GAME_LD.buildings[GAME_CONFIG.BuildingType.starting])
      collisionPlanet.inventory.moveResourceFromOtherInventory(this.planet.inventory, .5);
      this.destroy();
    }
  }
}