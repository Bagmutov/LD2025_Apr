import { GAME_CONFIG } from "../../game.js";
import { LD_GLOB } from "../../main.js";
import { Planet } from "../planet.js";
import { Launchee } from "./launchee.js";

export class SpaceShip extends Launchee{
    constructor(type: GAME_CONFIG.HookType, planet: Planet){
        let config = GAME_CONFIG.SpaceShipConfig[type];
        super(config.radius, LD_GLOB.getImage(config.image), planet, config.phisicMode, config.stability);

    }
}