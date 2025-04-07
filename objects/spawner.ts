import { GAME_CONFIG, GAME_LD } from "../game.js";
import { LD_GLOB } from "../main.js";
import { Meteor } from "./meteor.js";
import { launchDisease, MeteorDisease } from "./meteor_disease.js";
import { Vector } from "./vector.js";



export class Spawner{
    xy_spawn:Vector;
    vel_spawn:Vector;
    constructor(public obj_type:'meteor'|'disease', public target:Vector, public met_type:GAME_CONFIG.MeteorType = null){
        let side_dist = Math.min(target.x,target.y,LD_GLOB.canvas.width-target.x,LD_GLOB.canvas.height-target.y);
        const offscreen = GAME_CONFIG.SpawnerConfig.offscreen_dist;
        if(side_dist==target.x){
            this.xy_spawn = new Vector(-offscreen,target.y);
        }else if(side_dist==target.y){
            this.xy_spawn = new Vector(target.x,-offscreen);
        }else if(side_dist==LD_GLOB.canvas.width-target.x){
            this.xy_spawn = new Vector(LD_GLOB.canvas.width+offscreen,target.y);
        }else {
            this.xy_spawn = new Vector(target.x,LD_GLOB.canvas.height+offscreen);
        }
        this.vel_spawn = this.target.sub(this.xy_spawn)
                        .normalize((obj_type=='meteor')?GAME_CONFIG.SpawnerConfig.met_vel:GAME_CONFIG.SpawnerConfig.disease_vel);
    }
    spawn(){
        if(this.obj_type=='meteor'){
            let met = new Meteor(this.xy_spawn, this.met_type, this.vel_spawn, );
            GAME_LD.addCircleObject(met);
        }else{
            launchDisease(null, this.xy_spawn, this.target);
            // let met = new MeteorDisease(this.xy_spawn, this.vel_spawn, )
            // GAME_LD.addCircleObject(met);
        }

    }
}