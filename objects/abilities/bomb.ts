import { Launchee } from "./launchee.js";
import { Planet } from "../planet.js";
import { Vector } from "../vector.js";
import { GAME_CONFIG, GAME_LD } from "../../game.js";
import { Circle, PhisicMode } from "../circle.js";
import { LD_GLOB, playSound } from "../../main.js";
import { Button, crtButton, delButton } from "../button.js";
import { MeteorDisease } from "../meteor_disease.js";


export class Bomb extends Launchee {
  forwardSpeed: number;
  maxDist2: number;

  explosionRadius: number;
  blastWaveRadius: number;

  explosionStregth: number;
  blastWaveStregth: number;
  blastWaveVelocityAdd: number;

  explosionImages: HTMLImageElement[] = [];
  
  exploseFrame: number;
  exploseStart = false;
  explodeButton: Button;
  

  constructor(type: GAME_CONFIG.BombType, planet: Planet) {
    let config = GAME_CONFIG.BombConfig[type];
    super(
      config.radius,
      LD_GLOB.getImage(config.image),
      planet,
      config.phisicMode,
      config.speed,
      config.stability,
      planet.coordinates,
    );
    this.forwardSpeed = config.speed;
    this.maxDist2 = config.maxDist**2;
    this.explosionRadius = config.explosionRadius;
    this.blastWaveRadius = config.blastWaveRadius;
    this.explosionStregth = config.explosionStregth;
    this.blastWaveStregth = config.blastWaveStregth;
    this.blastWaveVelocityAdd = config.blastWaveVelocityAdd;
    for (let immageName of config.explosionImages){
      this.explosionImages.push(LD_GLOB.getImage(immageName));
    }
    this.explodeButton = crtButton(this, 0, 0, this.radius + 5);
    this.explodeButton.ms_down = () => {
      this.explode();
    }
    playSound('hook2',.1);
    setTimeout(()=>{playSound('pip',.1);},1000);
  }

  draw(dst: CanvasRenderingContext2D): void {
    if (!this.exploseStart){
      super.draw(dst);
      return;
    }
    if (this.exploseFrame < this.explosionImages.length){
      this.image = this.explosionImages[Math.floor(this.exploseFrame)];
      this.exploseFrame += 0.33333333333;
      super.draw(dst);
    }
  }

  detonationTimer = 2;
  step(delta: number) {
    if (this.exploseStart){
      if (this.exploseFrame >= this.explosionImages.length ){
        this.destroy();
      }
      return;
    } 
    // else if(this.coordinates.sub(this.planet.coordinates).len() < this.planet.radius+this.explosionRadius) {
    //   super.step(delta);
    //   return;
    // }
    super.step(delta);
    this.detonationTimer -= delta;
    let collisions = GAME_LD.getColisions(
      this,
      GAME_LD.Layers.Planet +
        GAME_LD.Layers.Meteor +
        GAME_LD.Layers.SpaseShip
        // GAME_LD.Layers.Disease
    );
    if (this.detonationTimer<0 || this.coordinates.sub(this.planet.coordinates).lenSq() > this.maxDist2 ||
      collisions.length != 0&&collisions[0]!=this.planet){
      this.explode();
    }
  }

  explode(){
    playSound('expl',.1);
    this.exploseStart = true;
    this.exploseFrame = 0;
    this.radius = this.explosionRadius;
    let objectsUnderExplosion = GAME_LD.getColisions(
      this,
      GAME_LD.Layers.All
    );
    for (let circle of objectsUnderExplosion){
      if (circle.stability < this.explosionStregth){
        circle.destroy();
      }
    }
    let blastWaveCircle = new Circle(
      this.coordinates,
      this.blastWaveRadius,
      this.image,
      PhisicMode.none,
      this.stability
    );
    let objectsUnderBlastWave = GAME_LD.getColisions(
      blastWaveCircle,
      GAME_LD.Layers.All
    );//  
    for (let circle of objectsUnderBlastWave){
      if (circle.stability < this.blastWaveStregth) {
        const dif = circle.coordinates.sub(this.coordinates);
        const pow = (circle.radius+this.blastWaveRadius-dif.len())*this.blastWaveVelocityAdd/this.blastWaveRadius;
        circle.addVelocity(dif.normalize(pow))
      }
      if(circle instanceof Bomb){
        setTimeout(()=>{if(!circle.exploseStart)circle.explode();},100);
      }
    }
  }
  destroy(): void {
    if(this.explodeButton)delButton(this.explodeButton);
    super.destroy();
  }
}