import { LD_GLOB, playSound } from "./main.js";
export function initInput() {
    window.addEventListener("keydown", keyDown);
    window.addEventListener("mousedown", mouseDown);
}
function keyDown(e) {
    switch (e.key) {
        case "Enter":
            playSound("bubble_high", 1);
            if (LD_GLOB.game_state == "menu")
                LD_GLOB.game_state = "game";
            else if (LD_GLOB.game_state == "game") {
                LD_GLOB.game_state = "menu";
            }
            break;
    }
}
function mouseDown(e) {
    if (LD_GLOB.game_state == "loading" && LD_GLOB.loaded)
        LD_GLOB.game_state = "menu";
}
//# sourceMappingURL=input.js.map