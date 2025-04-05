import { LD_GLOB } from "./main.js";
import { drawCircle, drawRoundRect } from "./tools.js";




export namespace GAME_LD {
    let big_objects: BigObject[] = [];
    let small_objects: SmallObject[] = [];
    export function initGame() {
        clearAll();
        addBigObject(300, 300, 30);
        addBigObject(350, 300, 30);
        addBigObject(450, 320, 30);

        let obj = addSmallObject(150, 150);
        obj.effect = explosion;
        obj.addSpeed(10, 11);

        for (let obj of big_objects) {
        }

        function explosion(this: SmallObject, obj: BigObject) {
            const POWER = 6;
            obj.addSpeed(Math.sign(obj.x - this.x) * POWER, Math.sign(obj.y - this.y) * POWER);
            delObject(this);
        }
    }

    let stepN = 0;

    export function step() {
        stepN++;
        let ind = 0;
        for (let ind = 0; ind < big_objects.length; ind++) {
            const obj = big_objects[ind];

            obj.x += obj.vx;  // изменить координату объекта
            obj.y += obj.vy;
            obj.vx *= .95;
            obj.vy *= .95;

            for (let ind2 = ind + 1; ind2 < big_objects.length; ind2++) {  // Столкновение двух объектов
                const obj2 = big_objects[ind2];
                if (obj.checkCollision(obj2)) {
                    obj2.addSpeed((obj2.x - obj.x) * .01, (obj2.y - obj.y) * .01);
                    obj.addSpeed((obj.x - obj2.x) * .01, (obj.y - obj2.y) * .01);
                }
            }

        }
        for (let sm of small_objects) {
            sm.x += sm.vx;
            sm.y += sm.vy;
            sm.vx *= .95;
            sm.vy *= .95;
            for (let obj2 of big_objects) {
                if (sm.ignore != obj2 && sm.checkCollision(obj2)) {
                    sm.effect.call(sm, obj2);
                }
            }
        }
    }

    export function addBigObject(x: number, y: number, rad: number): BigObject {
        let obj = new BigObject(x, y, rad);
        big_objects.push(obj);
        return obj;
    }

    export function addSmallObject(x: number, y: number): SmallObject {
        let obj = new SmallObject(x, y);
        small_objects.push(obj);
        return obj;
    }

    export function delObject(obj: SmallObject | BigObject) {
        let arr: (typeof obj)[];
        if (obj instanceof SmallObject) arr = small_objects;
        else arr = big_objects;
        let ind = arr.indexOf(obj);
        if (ind < 0) return;
        arr.splice(ind, 1);
    }

    export function clearAll() {
        big_objects = [];
        small_objects = [];
    }

    export function drawGame(ctx: CanvasRenderingContext2D) {
        for (let obj of big_objects) {
            obj.drawMe(ctx);
        }
        for (let obj of small_objects) {
            obj.drawMe(ctx);
        }
    }
}

export class BigObject {
    x: number;
    y: number;
    vx: number = 0;
    vy: number = 0;
    rad: number;
    rad2: number;//redius squared
    color: string = LD_GLOB.COLORS.main_2;

    constructor(x: number, y: number, rad: number) {
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.rad2 = rad * rad;
    }

    drawMe(ctx: CanvasRenderingContext2D) {
        drawCircle(ctx, this.x, this.y, this.rad, this.color);
    }

    checkCollision(obj2: BigObject): boolean {
        return (Math.sqrt(dist2(obj2.x - this.x, obj2.y - this.y)) < this.rad + obj2.rad);
    }

    addSpeed(vx: number, vy: number) {
        this.vx += vx;
        this.vy += vy;
    }
}
export class SmallObject {
    x: number;
    y: number;
    vx: number = 0;
    vy: number = 0;
    color: string = LD_GLOB.COLORS.main_6;
    ignore: BigObject = null; //ignore this object when checking collisions

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    effect: (obj2: BigObject) => void = ((obj) => { });

    drawMe(ctx: CanvasRenderingContext2D) {
        drawCircle(ctx, this.x, this.y, 5, this.color);
    }

    checkCollision(obj2: BigObject): boolean {
        return (dist2(obj2.x - this.x, obj2.y - this.y) < obj2.rad2);
    }

    addSpeed(vx: number, vy: number) {
        this.vx += vx;
        this.vy += vy;
    }
}

export function dist2(dx: number, dy: number) { return dx * dx + dy * dy; }