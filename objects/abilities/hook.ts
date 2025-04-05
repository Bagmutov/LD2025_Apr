import { Ability } from "./ability.js";
import { Planet } from "../planet.js";
import { Vector } from "../vector.js";


export class Hook extends Ability{
    velocity: Vector;
    constructor(
        image: HTMLImageElement,
        planet: Planet,
    ){
        super(image, planet);
    }
    
    use(){
        
    }
}