import { GAME_CONFIG } from "../../game";
import { Circle } from "../circle";
import { Planet } from "../planet";
import { Inventory } from "../resource/inventory"
import { Vector } from "../vector";

export class Building {
    level : number;
    resourse1 : number;
    resourse2 : number;
    next_upgrades: Building[];




    constructor() {
        this.level = 1;
    }

    tryUpgrade(inventory_resourse1_count: number, inventory_resourse2_count: number) {
        // проверка на ресурсы
        if ((inventory_resourse1_count >= this.resourse1) && (inventory_resourse2_count >= this.resourse2)) {
            this.level += 1;
            return true;
        }
        else {
            return false;
        }
    }

    drawMe(dst: CanvasRenderingContext2D, coordinates: Vector, radius: number){
        const img = new Image();
        //img.decoding = "sync";
        //img.src = "house1";
        // отрисовка строения
        dst.drawImage(img,
            coordinates.x - radius,
            coordinates.y - radius,
            radius * 2,
            radius * 2)
    }

    step(){
        
    }


    
    changePlanet(planet: Planet){
        var resourse1_from_planet = 2;
        var resourse2_from_planet = 3;
        if (this.tryUpgrade(resourse1_from_planet, resourse2_from_planet)){
            planet.building = this.next_upgrades[0];
        }
    }

}