import { GAME_CONFIG } from "../../game";
import { LD_GLOB } from "../../main";
import { Bomb } from "../abilities/bomb";
import { Hook } from "../abilities/hook";
import { Spaceship as SpaceShip } from "../abilities/spaceship";
import { Planet } from "../planet";
import { ResourceType } from "../resource/resource";

// function isEnumValue<T extends Record<string, string | number>>(
//   enumObj: T,
//   value: unknown
// ): value is T[keyof T] {
//   return Object.keys(enumObj)
//     .map(key => enumObj[key as keyof T])
//     .indexOf(value as T[keyof T]) !== -1;
// }


export class Building {
  image: HTMLImageElement;
  radius: number;
  abilityConfig;
  abilityType: GAME_CONFIG.AbilityType;
  cost: Map<ResourceType, number>;
  nextUpgrades: Building[] = [];

  constructor(type: GAME_CONFIG.BuildingType) {
    console.log("building create");
    let config = GAME_CONFIG.BuildingConfig[type];
    this.image = LD_GLOB.getImage(config.image);
    this.abilityType = config.abilityType;
    switch (this.abilityType) {
      case GAME_CONFIG.AbilityType.hook:
        this.abilityConfig = config.abilytyConfig as GAME_CONFIG.HookType;
        break;
      case GAME_CONFIG.AbilityType.bomb:
        this.abilityConfig = config.abilytyConfig as GAME_CONFIG.BombType;
        break;
      case GAME_CONFIG.AbilityType.spaseShip:
        this.abilityConfig = config.abilytyConfig;
        break;
    }
    for (let next of config.nextUpgrades){
        this.nextUpgrades.push(new Building(next));
    }
  }

  tryUpgrade(planet: Planet, upgrageId: number): Building {
    if (upgrageId > this.nextUpgrades.length - 1)
    if (planet.inventory.canPay(this.nextUpgrades[upgrageId].cost)) {
      return this.nextUpgrades[upgrageId];
    }
    return this;
  }

  draw(dst: CanvasRenderingContext2D, planet: Planet) {
    dst.drawImage(
      this.image,
      planet.coordinates.x - this.radius,
      planet.coordinates.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }

  buildAbility(planet: Planet) {
    switch (this.abilityConfig) {
      case GAME_CONFIG.AbilityType.hook:
        return new Hook(this.abilityConfig, planet);
      case GAME_CONFIG.AbilityType.bomb:
        return new Bomb(this.abilityConfig, planet);
      case GAME_CONFIG.AbilityType.spaseShip:
        return new SpaceShip(this.abilityConfig, planet);
    }
  }
}