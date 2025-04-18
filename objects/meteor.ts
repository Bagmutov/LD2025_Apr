import { Circle } from "./circle.js";
import { Vector } from "./vector.js";
import { GAME_CONFIG, GAME_LD } from "../game.js";
import { dist2 } from "../tools.js";
import { LD_GLOB, playSound } from "../main.js";
import { ResourceType } from "./resource/resource.js";
import { Planet } from "./planet.js";

export class Meteor extends Circle {
  velocity: Vector;
  innerResource: Map<ResourceType, number>;
  
  constructor(
    coordinate: Vector,
    type: GAME_CONFIG.MeteorType,
    velocity: Vector
  ) {
    let config = GAME_CONFIG.MeteorConfig[type]
    super(coordinate, config.radius, LD_GLOB.getImage(config.image), config.phisicMode, config.stability);
    this.velocity = velocity;
    this.innerResource = config.innerResource;
  }

  snd_obj:Planet;
  step(delta: number) {
    super.step(delta);
    let vel = this.velocity.len();
    // if(vel>200)this.velocity = this.velocity.normalize(200);
    
    let colisions = GAME_LD.getColisions(this, GAME_LD.Layers.Planet)
    if (colisions.length != 0){
      let colisionPlanet = colisions[0] as Planet, dif = this.coordinates.sub(colisionPlanet.coordinates);
      this.addVelocity(dif.multiply(10/this.radius));
      this.velocity=this.velocity.multiply(.97);
      colisionPlanet.addVelocity(dif.multiply(-2/colisionPlanet.mass));
      
      if(this.snd_obj != colisionPlanet){
        playSound('collis',.1);
        this.snd_obj = colisionPlanet;
        setTimeout(()=>{this.snd_obj=null;},200);
      }
      // colisionPlanet.inventory.addResoursesMap(this.innerResource);
      // this.destroy(); 
    }
  }
}
