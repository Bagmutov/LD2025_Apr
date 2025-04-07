import { GAME_CONFIG, GAME_LD } from "../../game.js";
import { LD_GLOB, playSound } from "../../main.js";
import { Planet } from "../planet.js";
import { Inventory } from "../resource/inventory.js";
import { Launchee } from "./launchee.js";

export class SpaceShip extends Launchee{
  inventory: Inventory;
  imgBroken:HTMLImageElement;

  constructor(type: GAME_CONFIG.SpaceShipType, planet: Planet){
    let config = GAME_CONFIG.SpaceShipConfig[type];
    super(config.radius, LD_GLOB.getImage(config.image), planet, config.phisicMode, config.forwardSpeed, config.stability, planet.coordinates);
    this.imgBroken = LD_GLOB.getImage(config.image_broken);
    playSound('voice',.1);
  }
  draw(dst: CanvasRenderingContext2D): void {
    super.draw(dst);
  }
  broken:boolean = false;
  makeMeBroken(){
    this.broken = true;
    this.image = this.imgBroken;
    playSound('death',.1);
  }
  step(delta: number){
    super.step(delta);
    // if (this.checkCollision(this.planet)) return;
    let meteorColision = GAME_LD.getColisions(this, GAME_LD.Layers.Meteor+GAME_LD.Layers.Disease);
    if (meteorColision.length != 0){
      // this.destroy();
      this.makeMeBroken();
      let met = meteorColision[0], dif = this.coordinates.sub(met.coordinates);
      this.addVelocity(dif.multiply(10/this.radius));
      met.addVelocity(dif.multiply(-10/met.radius));
    }
    let planetColision = GAME_LD.getColisions(this, GAME_LD.Layers.Planet);
    if (planetColision.length != 0 && planetColision[0]!=this.planet){
      let collisionPlanet = planetColision[0] as Planet;
      if(!this.broken && !collisionPlanet.building && !(collisionPlanet.building && collisionPlanet.building.config.evil)){
        collisionPlanet.build(GAME_LD.buildings[GAME_CONFIG.BuildingType.starting]);
        collisionPlanet.inventory.moveResourceFromOtherInventory(this.planet.inventory, 1);
        this.destroy();
      } else if (!this.broken && collisionPlanet.building){
        collisionPlanet.inventory.moveResourceFromOtherInventory(this.planet.inventory, 0.5);
        this.destroy();
      } else {
        this.makeMeBroken();
        let dif = this.coordinates.sub(collisionPlanet.coordinates);
        this.addVelocity(dif.multiply(10/this.radius));
        collisionPlanet.addVelocity(dif.multiply(-4/collisionPlanet.mass));
      }
    }
  }
}