import { drawCircle } from "../tools.js";
import { Circle } from "./circle.js";
import { LD_GLOB } from "../main.js";

export function addButton(dx:number, dy:number, obj:Circle, rad:number){
    let but = new Button(dx,dy,obj,rad);
    all_buttons.push(but);
}

let ms_dwn_but:Button = null;
export function mouseDownButtons(e:MouseEvent){
  
}
export function mouseMoveButtons(e:MouseEvent){
  
}
export function mouseUpButtons(e:MouseEvent){
      
}
export function drawButtons(ctx:CanvasRenderingContext2D) {
    for(let but of all_buttons){
        drawCircle(ctx,but.obj.coordinates.x+but.dx,but.obj.coordinates.y+but.dy,but.rad, LD_GLOB.COLORS.main_1,2);
    }
}

let all_buttons:Button[] = [];
export class Button{
    state:0|1|2 = 0;
    constructor(public dx:number, public dy:number, public obj:Circle, public rad:number){
    }
}
