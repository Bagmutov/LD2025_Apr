import { LD_GLOB } from "./main.js";
import { Meteor } from "./objects/meteor.js";
import { Planet } from "./objects/planet.js";
import { Vector } from "./objects/vector.js";
import { arrDel } from "./tools.js";
export var GAME_LD;
(function (GAME_LD) {
    GAME_LD.keyMap = {};
    GAME_LD.mouseMap = {};
    let planets = [];
    let meteors = [];
    let objects = []; // here will be all objects, with duplicates in planets, meteors etc
    function init() {
        GAME_LD.lastFrame = new Date().getTime();
        addCircleObject(new Planet(LD_GLOB.canvas.width * .6, LD_GLOB.canvas.height * .6, 50, LD_GLOB.getImage("planet"), 25, 5));
        addCircleObject(new Planet(LD_GLOB.canvas.width * .3, LD_GLOB.canvas.height * .3, 50, LD_GLOB.getImage("planet"), 25, 5));
        planets[0].addVelocity(new Vector(100, 0));
        planets[1].addVelocity(new Vector(-100, 0));
        addCircleObject(new Meteor(LD_GLOB.canvas.width / 2, LD_GLOB.canvas.height / 2 - 200, 10, LD_GLOB.getImage("planet"), 10, new Vector(100, 0)));
    }
    GAME_LD.init = init;
    function addCircleObject(obj) {
        if (objects.indexOf(obj) >= 0)
            throw new Error('Object is added to the scene a second time.');
        if (obj instanceof Planet) {
            planets.push(obj);
            obj.my_array = planets;
        }
        else if (obj instanceof Meteor) {
            meteors.push(obj);
            obj.my_array = meteors;
        }
        objects.push(obj);
    }
    GAME_LD.addCircleObject = addCircleObject;
    function delCircleObject(obj) {
        arrDel(objects, obj);
        if (obj.my_array)
            arrDel(obj.my_array, obj);
    }
    GAME_LD.delCircleObject = delCircleObject;
    function getAcseleration(point) {
        let res = new Vector(0, 0);
        for (let planet of planets) {
            let a = planet.coordinates
                .sub(point);
            if (a.x == 0)
                continue; // to avoid division by 0
            res = res.add(a.normalize().multiply(planets[0].G));
        }
        return res;
    }
    GAME_LD.getAcseleration = getAcseleration;
    function getColision(circle) {
        let colisions;
        for (let circle of objects) {
        }
    }
    GAME_LD.getColision = getColision;
    function drawGame(dst) {
        for (let planet of planets) {
            planet.draw(dst);
        }
        for (let meteor of meteors) {
            meteor.draw(dst);
        }
    }
    GAME_LD.drawGame = drawGame;
    function stepGame() {
        let delta = (new Date().getTime() - GAME_LD.lastFrame) / 1000;
        for (let obj of objects) {
            obj.step(delta);
        }
        GAME_LD.lastFrame = new Date().getTime();
    }
    GAME_LD.stepGame = stepGame;
})(GAME_LD || (GAME_LD = {}));
//# sourceMappingURL=game.js.map