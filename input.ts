import { GAME_LD } from "./game.js";
import { LD_GLOB, playSound } from "./main.js";

export function initInput() {
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
  window.addEventListener("mousedown", mouseDown);
  window.addEventListener("mouseup", mouseUp);
}

function keyDown(e: KeyboardEvent) {
  if (e.key == "Enter") {
    playSound("bubble_high", 1);
    GAME_LD.lastFrame = new Date().getTime();
    if (LD_GLOB.game_state == "menu") {
      LD_GLOB.game_state = "game";
    } else if (LD_GLOB.game_state == "game") {
      LD_GLOB.game_state = "menu";
    }
  }

  if (e.key in GAME_LD.keyMap) {
    GAME_LD.keyMap[e.key] = true;
  }
}

function keyUp(e: KeyboardEvent) {
  if (e.key in GAME_LD.keyMap) {
    GAME_LD.keyMap[e.key] = false;
  }
}

function mouseDown(e: MouseEvent) {
  if (LD_GLOB.game_state == "loading" && LD_GLOB.loaded) {
    LD_GLOB.game_state = "menu";
  }
}

function mouseUp(e: MouseEvent) {}
