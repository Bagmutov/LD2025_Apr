import { GAME_CONFIG } from "../../game";
import { Hook } from "../abilities/hook";
import { Circle } from "../circle";
import { Planet } from "../planet";
import { Inventory } from "../resource/inventory"
import { Vector } from "../vector";
import { Building } from "./building";
import { Spaceship } from "./spaceship";


export class Bomb1 extends Building {
    level : number;
    resourse1 : number;
    resourse2 : number;
    direction: Vector;
    planet: Planet;

    constructor(direction: Vector, planet: Planet) {
        super();
        this.direction = direction;
        this.planet = planet;
    }

    
    override step(){
        new Spaceship(this.direction, GAME_CONFIG.HookType.standart, this.planet);
    }


}