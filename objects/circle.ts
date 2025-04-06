import { GAME_LD } from "../game.js";
import { drawCircle, dist2, makeCopy } from "../tools.js";
import { Vector } from "./vector.js";

export enum PhisicMode {
  none,
  gravity,
  braking,
  standart,
}


export class Circle {
  coordinates: Vector;
  radius: number;
  image: HTMLImageElement;
  phisicMode: PhisicMode;
  velocity: Vector = new Vector(0, 0);
  my_array: (typeof this)[] = null; // set this when obj is created. Then use it when deleting obj.
  stability: number;

  constructor(
    coordinates: Vector,
    radius: number,
    image: HTMLImageElement,
    useGravity: PhisicMode,
    stability: number,
  ) {
    this.coordinates = coordinates;
    this.radius = radius;
    this.image = image;
    this.phisicMode = useGravity;
    this.stability = stability;
  }

  draw(dst: CanvasRenderingContext2D) {
    dst.drawImage(
      this.image,
      this.coordinates.x - this.radius,
      this.coordinates.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }

  step(delta: number) {
    if (this.phisicMode == PhisicMode.gravity) {
      this.addVelocity(GAME_LD.getAcseleration(this.coordinates));
    } else if (this.phisicMode == PhisicMode.braking){
      this.addVelocity(this.velocity.multiply(-.01));
    }
    this.coordinates = this.coordinates.add(this.velocity.multiply(delta));
  }

  // launchObject(obj: Circle, vel: Vector = null) {
  //   GAME_LD.addCircleObject(obj);
  //   if (vel) obj.addVelocity(vel);
  //   obj.coordinates = new Vector(this.coordinates.x, this.coordinates.y);
  // }
  addParent(obj: Circle) {
    GAME_LD.addCircleObject(obj);
  }

  checkCollision(other: Circle): boolean {
    return (
      Math.sqrt(
        dist2(
          other.coordinates.x - this.coordinates.x,
          other.coordinates.y - this.coordinates.y
        )
      ) <
      this.radius + other.radius
    );
  }

  addVelocity(dxy: Vector) {
    if (this.phisicMode == PhisicMode.none) return;
    this.velocity = this.velocity.add(dxy);
  }
  destroy() {
    GAME_LD.delCircleObject(this);
  }
}
