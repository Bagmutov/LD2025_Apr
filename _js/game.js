import { LD_GLOB } from "./main.js";
import { drawCircle } from "./tools.js";
export var GAME_LD;
(function (GAME_LD) {
    let big_objects = [];
    let small_objects = [];
    function initGame() {
        clearAll();
        addBigObject(300, 300, 30);
        addBigObject(350, 300, 30);
        addBigObject(450, 320, 30);
        let obj = addSmallObject(150, 150);
        obj.effect = explosion;
        obj.addSpeed(10, 11);
        for (let obj of big_objects) {
        }
        function explosion(obj) {
            const POWER = 6;
            obj.addSpeed(Math.sign(obj.x - this.x) * POWER, Math.sign(obj.y - this.y) * POWER);
            delObject(this);
        }
    }
    GAME_LD.initGame = initGame;
    let stepN = 0;
    function step() {
        stepN++;
        let ind = 0;
        for (let ind = 0; ind < big_objects.length; ind++) {
            const obj = big_objects[ind];
            obj.x += obj.vx; // изменить координату объекта
            obj.y += obj.vy;
            obj.vx *= .95;
            obj.vy *= .95;
            for (let ind2 = ind + 1; ind2 < big_objects.length; ind2++) { // Столкновение двух объектов
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
    GAME_LD.step = step;
    function addBigObject(x, y, rad) {
        let obj = new BigObject(x, y, rad);
        big_objects.push(obj);
        return obj;
    }
    GAME_LD.addBigObject = addBigObject;
    function addSmallObject(x, y) {
        let obj = new SmallObject(x, y);
        small_objects.push(obj);
        return obj;
    }
    GAME_LD.addSmallObject = addSmallObject;
    function delObject(obj) {
        let arr;
        if (obj instanceof SmallObject)
            arr = small_objects;
        else
            arr = big_objects;
        let ind = arr.indexOf(obj);
        if (ind < 0)
            return;
        arr.splice(ind, 1);
    }
    GAME_LD.delObject = delObject;
    function clearAll() {
        big_objects = [];
        small_objects = [];
    }
    GAME_LD.clearAll = clearAll;
    function drawGame(ctx) {
        for (let obj of big_objects) {
            obj.drawMe(ctx);
        }
        for (let obj of small_objects) {
            obj.drawMe(ctx);
        }
    }
    GAME_LD.drawGame = drawGame;
})(GAME_LD || (GAME_LD = {}));
export class BigObject {
    constructor(x, y, rad) {
        this.vx = 0;
        this.vy = 0;
        this.color = LD_GLOB.COLORS.main_2;
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.rad2 = rad * rad;
    }
    drawMe(ctx) {
        drawCircle(ctx, this.x, this.y, this.rad, this.color);
    }
    checkCollision(obj2) {
        return (Math.sqrt(dist2(obj2.x - this.x, obj2.y - this.y)) < this.rad + obj2.rad);
    }
    addSpeed(vx, vy) {
        this.vx += vx;
        this.vy += vy;
    }
}
export class SmallObject {
    constructor(x, y) {
        this.vx = 0;
        this.vy = 0;
        this.color = LD_GLOB.COLORS.main_6;
        this.ignore = null; //ignore this object when checking collisions
        this.effect = ((obj) => { });
        this.x = x;
        this.y = y;
    }
    drawMe(ctx) {
        drawCircle(ctx, this.x, this.y, 5, this.color);
    }
    checkCollision(obj2) {
        return (dist2(obj2.x - this.x, obj2.y - this.y) < obj2.rad2);
    }
    addSpeed(vx, vy) {
        this.vx += vx;
        this.vy += vy;
    }
}
export function dist2(dx, dy) { return dx * dx + dy * dy; }
//# sourceMappingURL=game.js.map