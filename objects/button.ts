import { arrFindMin, dist2, drawCircle, isRightMB } from "../tools.js";
import { Circle } from "./circle.js";
import { LD_GLOB } from "../main.js";
import { GAME_CONFIG, GAME_LD } from "../game.js";

// USE:
//  let but = addButton(my_planet,15,15,20);
//  but.ms_click = function(){ ... }
// OR:
//  let but = addButton(null,15,15,20);
//  but.ms_down = function(){ ... }
//  but.ms_move = function(dx,dy){ ... }
//  but.ms_up = function(){ ... }
//
//  delButton(but);



export function crtButton(obj:Circle, dx:number, dy:number, rad:number, icon:HTMLImageElement=null):Button{
    let but = new Button(dx,dy,obj,rad,icon);
    all_buttons.push(but);
    return but;
}
export function delButton(but:Button){
    let ind = all_buttons.indexOf(but);
    if(ind>=0)all_buttons.splice(ind,1);
}

let ms_dwn_but:Button = null, ms_dwn_xy:{x:number,y:number}=null, ms_over_but:Button = null;
export function mouseDownButtons(e:MouseEvent){
    if(isRightMB(e)){
        if(ms_dwn_but){
            ms_dwn_but.ms_down(e)
            ms_dwn_but = null;
            ms_dwn_xy=null;
        }
    }else if(ms_over_but){
        ms_dwn_but = ms_over_but;
        ms_dwn_but.state = 2;
        ms_dwn_xy = {x:e.clientX,y:e.clientY};
        if(ms_over_but.ms_down) ms_over_but.ms_down.call(ms_over_but);
    }
}
export function mouseMoveButtons(e:MouseEvent){
    if(ms_dwn_but){
        if(ms_over_but.ms_move) ms_over_but.ms_move.call(ms_over_but, e.clientX-ms_dwn_xy.x,e.clientY-ms_dwn_xy.y);
    }else{
        checkMsOver(e);
    }
}
function checkMsOver(e:MouseEvent){
    let res = arrFindMin(all_buttons, (but)=>dist2(but.x-e.clientX, but.y-e.clientY));
    if(res && res.o && res.d<res.o.rad2){
        ms_over_but = res.o;
        ms_over_but.state = 1;
    } else if(ms_over_but){
        ms_over_but.state = 0;
        ms_over_but = null;
    }
}
export function mouseUpButtons(e:MouseEvent){
    if(ms_dwn_but){
        ms_dwn_but.state = 0;
        if(ms_dwn_but.ms_up) ms_dwn_but.ms_up.call(ms_dwn_but);
        if(dist2(ms_dwn_but.x-e.clientX, ms_dwn_but.y-e.clientY)<ms_dwn_but.rad2 && ms_dwn_but.ms_click){
            ms_dwn_but.ms_click.call(ms_dwn_but);
            ms_dwn_but.state = 1;
        }
        ms_dwn_but = null;
        ms_dwn_xy = null;
    }
    ms_over_but = null;
    checkMsOver(e);
}
export function drawButtons(ctx:CanvasRenderingContext2D) {
    for(let but of all_buttons){
        if(but.icon) ctx.drawImage(but.icon,but.x-GAME_CONFIG.Other.space_icon_rad,but.y-GAME_CONFIG.Other.space_icon_rad);
        drawCircle(ctx,but.x,but.y,but.rad, LD_GLOB.COLORS.main_7,2+but.state);
    }
}
export function clearButtons(){
    while(all_buttons.length)delButton(all_buttons[0]);
}

let all_buttons:Button[] = [];
export class Button{
    state:0|1|2 = 0;
    get x():number{return (this.obj)?this.obj.coordinates.x+this.dx: this.dx};
    get y():number{return (this.obj)?this.obj.coordinates.y+this.dy: this.dy};
    get rad2():number{return this.rad*this.rad;}
    constructor(public dx:number, public dy:number, public obj:Circle, public rad:number, public icon:HTMLImageElement = null){

    }
    ms_down:(e:MouseEvent)=>void;
    ms_move:(dx:number, dy:number)=>void;
    ms_up:()=>void;
    ms_click:()=>void;
}
