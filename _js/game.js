import { LD_GLOB } from "./main.js";
import { Planet } from "./objects/planet.js";
export var GAME_LD;
(function (GAME_LD) {
    let circles = [];
    function init() {
        circles.push(new Planet(LD_GLOB.canvas.width / 2, LD_GLOB.canvas.height / 2, 50, LD_GLOB.getImage("planet"), 25));
    }
    GAME_LD.init = init;
    function drawGame(dst) {
        for (let circle of circles) {
            circle.draw(dst);
        }
    }
    GAME_LD.drawGame = drawGame;
    function loop() { }
    GAME_LD.loop = loop;
})(GAME_LD || (GAME_LD = {}));
//# sourceMappingURL=game.js.map