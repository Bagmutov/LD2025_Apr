import { GAME_CONFIG } from "../../../game";
import { Hook } from "../../abilities/hook";
import { Circle } from "../../circle";
import { Planet } from "../../planet";
import { Inventory } from "../../resource/inventory"
import { Vector } from "../../vector";
import { Building } from ".././building";
import { Hook2 } from "./hook2";

export class Hook1 extends Building {
    level : number;
    resourse1 : number;
    resourse2 : number;
    next_upgrades: Building[] ;
    direction: Vector;
    planet: Planet;

    constructor(direction: Vector, planet: Planet) {
        super();
        this.direction = direction;
        this.planet = planet;
        this.next_upgrades = [new Hook2(direction, planet)]
    }

    
    override step(){
        new Hook(this.direction, GAME_CONFIG.HookType.standart, this.planet);
    }


}