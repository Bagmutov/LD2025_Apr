import { GAME_CONFIG } from "../../game.js";
import { LD_GLOB } from "../../main.js";
import { Bomb } from "../abilities/bomb.js";
import { GravityTrap } from "../abilities/gravitytrap.js";
import { Hook } from "../abilities/hook.js";
import { Launchee } from "../abilities/launchee.js";
import { SpaceShip } from "../abilities/spaseShip.js";
import { MeteorDisease } from "../meteor_disease.js";
import { Planet } from "../planet.js";
import { ResourceType } from "../resource/resource.js";

// function isEnumValue<T extends Record<string, string | number>>(
//   enumObj: T,
//   value: unknown
// ): value is T[keyof T] {
//   return Object.keys(enumObj)
//     .map(key => enumObj[key as keyof T])
//     .indexOf(value as T[keyof T]) !== -1;
// }


export class Building {
  image_build: HTMLImageElement;
  image_icon: HTMLImageElement;
  radius: number;
  // abilityConfig;
  // abilityType: GAME_CONFIG.AbilityType;
  // cost: Map<ResourceType, number>;
  nextUpgrades: GAME_CONFIG.BuildingType[] = [];
  config:GAME_CONFIG.BuildingConfigData;

  constructor(type: GAME_CONFIG.BuildingType) {
    this.config = GAME_CONFIG.BuildingConfig[type];
    this.image_build = LD_GLOB.getImage(this.config.image_build);
    this.radius = this.config.radius;
    this.image_icon = LD_GLOB.getImage(this.config.image_icon);
    // this.abilityType = this.config.abilityType;
    // switch (this.config.abilityType) {
    //   case GAME_CONFIG.AbilityType.hook:
    //     this.abilityConfig = this.config.abilytyConfig as GAME_CONFIG.HookType;
    //     break;
    //   case GAME_CONFIG.AbilityType.bomb:
    //     this.abilityConfig = this.config.abilytyConfig as GAME_CONFIG.BombType;
    //     break;
    //   case GAME_CONFIG.AbilityType.spaseShip:
    //     this.abilityConfig = this.config.abilytyConfig;
    //     break;
    // }
    // this.cost = this.config.cost;
    for (let next of this.config.nextUpgrades){
        this.nextUpgrades.push(next);
    }
  }

  //I don't think we need this
  // tryUpgrade(planet: Planet, upgrageId: number): Building {
  //   if (upgrageId > this.nextUpgrades.length - 1)
  //   if (planet.inventory.canPay(this.nextUpgrades[upgrageId].cost)) {
  //     return this.nextUpgrades[upgrageId];
  //   }
  //   return this;
  // }

  draw(dst: CanvasRenderingContext2D, planet: Planet) {
    dst.drawImage(
      this.image_build,
      planet.coordinates.x - this.radius,
      planet.coordinates.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }

  buildLaunchee(planet: Planet): Launchee {
    switch (this.config.abilityType) {
      case GAME_CONFIG.AbilityType.hook:
        return new Hook(<any>this.config.abilityConfig, planet);
      case GAME_CONFIG.AbilityType.bomb:
        if (
          planet.inventory.canPay(
            GAME_CONFIG.BombConfig[this.config.abilityConfig].itemCost
          )
        ) {
          planet.inventory.pay(
            GAME_CONFIG.BombConfig[this.config.abilityConfig].itemCost
          );
          return new Bomb(<any>this.config.abilityConfig, planet);
        } else return null;
      case GAME_CONFIG.AbilityType.spaseShip:
        return new SpaceShip(<any>this.config.abilityConfig, planet);
      case GAME_CONFIG.AbilityType.bomb:
        if (
          planet.inventory.canPay(
            GAME_CONFIG.BombConfig[this.config.abilityConfig].itemCost
          )
        ) {
          planet.inventory.pay(
            GAME_CONFIG.BombConfig[this.config.abilityConfig].itemCost
          );
          return new Bomb(<any>this.config.abilityConfig, planet);
        } else return null;
      case GAME_CONFIG.AbilityType.trap:
        if (
          planet.inventory.canPay(
            GAME_CONFIG.TrapConfig[this.config.abilityConfig].itemCost
          )
        ) {
          planet.inventory.pay(
            GAME_CONFIG.TrapConfig[this.config.abilityConfig].itemCost
          );
          return new GravityTrap(<any>this.config.abilityConfig, planet);
        } else return null;
      case GAME_CONFIG.AbilityType.diesese:
        return new MeteorDisease(planet.coordinates, <any>this.config.abilityConfig, planet);
    }
  }
}