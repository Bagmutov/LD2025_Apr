import { Planet } from "../planet";
import { Building } from "./building";

export class Spaceport extends Building {
    resource1:number = 1;
    resource2:number = 2;
    
    constructor(){
        super()
    }


    draw(){
        // что-то рисует, если будем это делать
    }


    buildRocket(res1:number, res2:number){
        
    }

    sendRocketToPlanet(newPlanet : Planet) {
        
    }

    makeTradeRoute() {

    }

    
}    
