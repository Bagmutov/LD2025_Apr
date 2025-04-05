import { GAME_LD } from "../game.js";
import { drawCircle, dist2, makeCopy } from "../tools.js";
import { Vector } from "./vector.js";

export class Circle {
  coordinates: Vector;
  radius: number;
  image: HTMLImageElement;
  velocity: Vector = new Vector(0,0);
  my_array:(typeof this)[] = null; // set this when obj is created. Then use it when deleting obj. 

  constructor(x: number, y: number, radius: number, image: HTMLImageElement) {
    this.coordinates = new Vector(x, y);
    this.radius = radius;
    this.image = image;
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

  step(delta:number){
    this.coordinates = this.coordinates.add(this.velocity.multiply(delta));
  }

  launchObject(obj:Circle, vel:Vector){
    GAME_LD.addCircleObject(obj);
    obj.addVelocity(vel);
    obj.coordinates = new Vector(this.coordinates.x, this.coordinates.y);
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

  addVelocity(dxy:Vector){
    this.velocity = this.velocity.add(dxy);
  }
}
