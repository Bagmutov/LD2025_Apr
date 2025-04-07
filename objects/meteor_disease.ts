import { Circle } from "./circle.js";
import { Vector } from "./vector.js";
import { GAME_CONFIG, GAME_LD } from "../game.js";
import { arrFindMin, dist2 } from "../tools.js";
import { LD_GLOB, playSound } from "../main.js";
import { Planet } from "./planet.js";
import { Launchee } from "./abilities/launchee.js";
import { Building } from "./buildings/building.js";

export class MeteorDisease extends Launchee {
  velocity: Vector;
  diseaseAdd: number;

  constructor(
    coordinates: Vector,
    type: GAME_CONFIG.MeteorDiseaseType,
    public parent: Planet = null
  ) {
    let config = GAME_CONFIG.MeteorDiseaseConfig[type];
    super(
      config.radius,
      LD_GLOB.getImage(config.image),
      parent,
      config.phisicMode,
      config.vel,
      config.stability,
      coordinates
    );
    this.diseaseAdd = config.diseaseAdd;
  }

  step(delta: number) {
    super.step(delta);
    if (dist2(this.coordinates.x, this.coordinates.y) > 2000 * 2000)
      GAME_LD.delCircleObject(this);

    let collisions = GAME_LD.getColisions(this, GAME_LD.Layers.Planet);
    if (collisions.length != 0 && collisions[0] != this.parent) {
      this.destroy();
      const planet = (collisions[0] as Planet);
      planet.build(GAME_LD.buildings[GAME_CONFIG.BuildingType.disease1]);
      // GAME_LD.delCircleObject(planet);
      planet.diseaseValue += this.diseaseAdd;
    }
  }
}

//set from_planet OR from_xhy and to_xy
export function launchDisease(from_planet:Planet=null, from_xy:Vector=null, to_xy:Vector=null){
  playSound('disease1',.2);
  let building: Building;
  if(from_planet){
    if(GAME_LD.planets.indexOf(from_planet)<0 || !from_planet.building || !from_planet.building.config.evil) return;
    from_xy = from_planet.coordinates;
    to_xy = from_planet.coordinates;
    building = from_planet.building;
  } else{
    building = GAME_LD.buildings[GAME_CONFIG.BuildingType.disease1];
  }
  let min=arrFindMin(GAME_LD.planets,(el)=>(
    el.building&&el.building.config.evil)?1000*1000:
          dist2(el.coordinates.x-to_xy.x,el.coordinates.y-to_xy.y)+Math.random()*90000
  );
  let dxy = min.o.coordinates.sub(from_xy);
  console.log(building.config)
  let met = building.buildLaunchee(from_planet || null);
  GAME_LD.addCircleObject(met);
  met.launch(dxy.normalize(), 1);
}
