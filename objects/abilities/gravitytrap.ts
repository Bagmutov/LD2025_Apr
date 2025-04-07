import { Launchee } from "./launchee.js";
import { Planet } from "../planet.js";
import { Vector } from "../vector.js";
import { GAME_CONFIG, GAME_LD } from "../../game.js";
import { Circle, PhisicMode } from "../circle.js";
import { LD_GLOB } from "../../main.js";
import { Button, crtButton, delButton } from "../button.js";


export class GravityTrap extends Launchee {
  maxDist2: number;

  trapRadius: number;

  trapStregth: number;
  trapDelStregth: number;
  trapVelocityAdd: number;
  activeImage: HTMLImageElement;
  activeDuration: number;

  isActive = false;
  activateButton: Button;
  trapCircle: Circle;

  constructor(type: GAME_CONFIG.TrapType, planet: Planet) {
    let config = GAME_CONFIG.TrapConfig[type];
    super(
      config.radius,
      LD_GLOB.getImage(config.image),
      planet,
      config.phisicMode,
      config.speed,
      config.stability,
      planet.coordinates
    );
    this.maxDist2 = config.maxDist;
    this.trapRadius = config.trapRadius;
    this.trapStregth = config.trapStregth;
    this.trapVelocityAdd = config.trapVelocityAdd;
    this.activeImage = LD_GLOB.getImage(config.activeImage);
    this.activeDuration = config.activeDuration;
    this.trapDelStregth = config.trapDelStregth;

    this.activateButton = crtButton(this, 0, 0, this.radius + 5);
    this.activateButton.ms_down = () => {
      this.activate();
    };
  }

  detonationTimer = 6;
  step(delta: number) {
    if (this.isActive) {
      this.activeDuration -= delta;
      if (0 > this.activeDuration) {
        this.destroy();
      } else {
        let trapCollisions = GAME_LD.getColisions(
          this.trapCircle,
          GAME_LD.Layers.All
        );
        let meCollisions = GAME_LD.getColisions(this, GAME_LD.Layers.All);
        for (let circle of trapCollisions) {
          if (circle.stability < this.trapStregth) {

            if (circle instanceof Planet){
              console.log(circle);
              circle.diseaseValue = Math.max(circle.diseaseValue - .1, 0);
            }

            const dif = circle.coordinates.sub(this.coordinates);
            const pow =
              ((circle.radius + this.radius - dif.len()) *
                this.trapVelocityAdd) /
              this.trapRadius;
            circle.addVelocity(dif.normalize(pow));
          }
        }
        for (let circle of meCollisions) {
          if (circle.stability < this.trapDelStregth) {
            circle.destroy();
          }
        }
      }
      return;
    }

    super.step(delta);
    this.detonationTimer -= delta;
    let collisions = GAME_LD.getColisions(
      this,
      GAME_LD.Layers.Planet +
        GAME_LD.Layers.Meteor +
        GAME_LD.Layers.SpaseShip +
        GAME_LD.Layers.Disease
    );
    if (
      this.detonationTimer < 0 ||
      (collisions.length != 0 && collisions[0] != this.planet)
    ) {
      this.activate();
    }
  }

  activate() {
    this.isActive = true;
    this.image = this.activeImage;
    this.phisicMode = PhisicMode.none;
    this.trapCircle = new Circle(
      this.coordinates,
      this.trapRadius,
      this.image,
      this.phisicMode,
      this.stability
    );
    if (this.activateButton) delButton(this.activateButton);
  }
  destroy(): void {
    if (this.activateButton) delButton(this.activateButton);
    super.destroy();
  }
}