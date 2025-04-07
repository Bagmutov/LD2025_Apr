import { Circle } from "./circle.js";
import { Vector } from "./vector.js";
import { GAME_CONFIG, GAME_LD } from "../game.js";
import { dist2 } from "../tools.js";
import { LD_GLOB } from "../main.js";
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

  step(delta: number) {
    super.step(delta);
    
    let colisions = GAME_LD.getColisions(this, GAME_LD.Layers.Planet)
    if (colisions.length != 0){
      let colisionPlanet = colisions[0] as Planet, dif = this.coordinates.sub(colisionPlanet.coordinates);
      this.addVelocity(dif.multiply(30/this.radius));
      colisionPlanet.addVelocity(dif.multiply(-2/colisionPlanet.mass));
      // colisionPlanet.inventory.addResoursesMap(this.innerResource);
      // this.destroy(); 
    }
  }
}
