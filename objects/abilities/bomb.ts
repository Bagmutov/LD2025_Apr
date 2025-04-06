import { Launchee } from "./launchee.js";
import { Planet } from "../planet.js";
import { Vector } from "../vector.js";
import { GAME_CONFIG, GAME_LD } from "../../game.js";
import { Circle } from "../circle.js";
import { Meteor } from "../meteor.js";
import { LD_GLOB } from "../../main.js";
import { Hook } from "./hook.js";
import { Building } from "../buildings/building.js";


export class Bomb extends Launchee{

  constructor(type: GAME_CONFIG.BombType, planet: Planet){
    let config = GAME_CONFIG.BombConfig[type];
    super(config.radius, LD_GLOB.getImage(config.image), planet, config.useGravity);
  }
}