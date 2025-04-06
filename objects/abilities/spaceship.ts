import { Launchee } from "./ability.js";
import { Planet } from "../planet.js";
import { Vector } from "../vector.js";
import { GAME_CONFIG, GAME_LD } from "../../game.js";
import { Circle } from "../circle.js";
import { Meteor } from "../meteor.js";
import { LD_GLOB } from "../../main.js";
import { Hook } from "./hook.js";


export class Spaceship extends Hook{

  constructor(type: GAME_CONFIG.HookType, planet: Planet){
    super(type, planet);
  }

}