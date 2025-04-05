import { GAME_LD } from "./game.js";
import { LD_GLOB } from "./main.js";
import { mouseDownButtons, mouseMoveButtons, mouseUpButtons } from "./objects/button.js";
export function initInput() {
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousedown", mouseDownButtons);
    window.addEventListener("mousemove", mouseMoveButtons);
    window.addEventListener("mouseup", mouseUpButtons);
}
function keyDown(e) {
    if (e.key == "Enter") {
        // playSound("bubble_high", 1);
        GAME_LD.lastFrame = new Date().getTime();
        if (LD_GLOB.game_state == "menu") {
            LD_GLOB.game_state = "game";
        }
        else if (LD_GLOB.game_state == "game") {
            LD_GLOB.game_state = "menu";
        }
    }
    if (e.key in GAME_LD.keyMap) {
        GAME_LD.keyMap[e.key] = true;
    }
}
function keyUp(e) {
    if (e.key in GAME_LD.keyMap) {
        GAME_LD.keyMap[e.key] = false;
    }
}
function mouseDown(e) {
    if (LD_GLOB.game_state == "loading" && LD_GLOB.loaded) {
        LD_GLOB.game_state = "menu";
    }
}
//# sourceMappingURL=input.js.map