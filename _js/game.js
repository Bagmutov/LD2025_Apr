import { LD_GLOB } from "./main.js";
import { Meteor } from "./objects/meteor.js";
import { Planet } from "./objects/planet.js";
import { Vector } from "./objects/vector.js";
export var GAME_LD;
(function (GAME_LD) {
    GAME_LD.keyMap = {};
    GAME_LD.mouseMap = {};
    let planet;
    let meteors = [];
    let objects;
    function init() {
        GAME_LD.lastFrame = new Date().getTime();
        planet = new Planet(LD_GLOB.canvas.width / 2, LD_GLOB.canvas.height / 2, 50, LD_GLOB.getImage("planet"), 25, 5);
        meteors.push(new Meteor(LD_GLOB.canvas.width / 2, LD_GLOB.canvas.height / 2 - 200, 10, LD_GLOB.getImage("planet"), 10, new Vector(1, 0)));
    }
    GAME_LD.init = init;
    function getAcseleration(point) {
        let a = planet.coordinates
            .sub(point)
            .normalize()
            .multiply(planet.G);
        return a;
    }
    GAME_LD.getAcseleration = getAcseleration;
    function getColision(circle) {
        let colisions;
        for (let circle of objects) {
        }
    }
    GAME_LD.getColision = getColision;
    function drawGame(dst) {
        planet.draw(dst);
        for (let meteor of meteors) {
            meteor.draw(dst);
        }
    }
    GAME_LD.drawGame = drawGame;
    function loop() {
        let t = (new Date().getTime() - GAME_LD.lastFrame) / 1000;
        GAME_LD.lastFrame = new Date().getTime();
    }
    GAME_LD.loop = loop;
})(GAME_LD || (GAME_LD = {}));
//# sourceMappingURL=game.js.map