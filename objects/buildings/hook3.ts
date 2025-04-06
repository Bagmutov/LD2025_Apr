import { GAME_CONFIG } from "../../game";
import { Hook } from "../abilities/hook";
import { Circle } from "../circle";
import { Planet } from "../planet";
import { Inventory } from "../resource/inventory"
import { Vector } from "../vector";
import { Building } from "./building";

export class Hook3 extends Building {
    level : number;
    resourse1 : number;
    resourse2 : number;
    next_upgrades: Building[];
    direction: Vector;
    planet: Planet;

    constructor(direction: Vector, planet: Planet) {
        super();
        this.direction = direction;
        this.planet = planet;
    }


    
    override step(){
        new Hook(this.direction, GAME_CONFIG.HookType.standart, this.planet).step;
    }


    
    changePlanet(planet: Planet){
        var resourse1_from_planet = 2;
        var resourse2_from_planet = 3;
        if (this.tryUpgrade(resourse1_from_planet, resourse2_from_planet)){
            planet.building = this.next_upgrades[0];
        }
    }

}