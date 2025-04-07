import { Circle } from "./circle.js";
import { Vector } from "./vector.js";
import { GAME_CONFIG, GAME_LD } from "../game.js";
import { arrFindMin, dist2 } from "../tools.js";
import { LD_GLOB } from "../main.js";
import { Planet } from "./planet.js";

export class MeteorDisease extends Circle {
  velocity: Vector;

  constructor( coordinate: Vector, velocity: Vector, public parent:Planet) {
    let config = GAME_CONFIG.MeteorDiseaseConfig;
    super(coordinate, config.radius, LD_GLOB.getImage(config.image), config.phisicMode, config.stability);
    this.velocity = velocity;
  }

  step(delta: number) {
    super.step(delta);
    if(dist2(this.coordinates.x,this.coordinates.y)>2000*2000) GAME_LD.delCircleObject(this);
    
    let collisions = GAME_LD.getColisions(this, GAME_LD.Layers.Planet);
    if (collisions.length != 0 && collisions[0]!=this.parent){
      this.destroy();
      const planet = (collisions[0] as Planet);
      planet.build(GAME_LD.buildings[GAME_CONFIG.BuildingType.disease1]);
      // setTimeout(launchDisease,Math.random()*1000+1000,planet);
    }
  }
}

export function launchDisease(planet:Planet){
  if(GAME_LD.planets.indexOf(planet)>=0 && planet.building && planet.building.config.evil){
    let min=arrFindMin(GAME_LD.planets,(el)=>(
      el.building&&el.building.config.evil)?1000*1000:
      dist2(el.coordinates.x-planet.coordinates.x,el.coordinates.y-planet.coordinates.y)+Math.random()*90000
    );
    let dxy = min.o.coordinates.sub(planet.coordinates);
    let met = new MeteorDisease(planet.coordinates,dxy.normalize(GAME_CONFIG.MeteorDiseaseConfig.vel),planet);
    GAME_LD.addCircleObject(met);
    // setTimeout(launchDisease,Math.random()*1000+1000,planet);
  }
}
