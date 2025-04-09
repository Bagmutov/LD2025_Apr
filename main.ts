import { GAME_LD } from "./game.js";
import { initInput } from "./input.js";
import { crtButton, drawButtons } from "./objects/button.js";
import { drawCircle, drawRoundRect, positionCanvas } from "./tools.js";

export namespace LD_GLOB {
  export let version = "0.1";
  export let canvas: HTMLCanvasElement;
  export let mainDst: CanvasRenderingContext2D;
  export let game_state: "loading" | "menu" | "game" = "loading";
  export let menu_text:string = "Paused. Press Enter.";
  export let loaded: boolean = false;
  export let loading_percent = 0;
  export let mute:boolean = false;
  export const COLORS = {
    main_1: "#112e50ff",
    main_2: "#0a4c69ff",
    main_3: "#0c747dff",
    main_4: "#0e917bff",
    main_5: "#0ab177ff",
    main_6: "#00d57aff",
    main_7: "#87efc4ff",
    red: "#F03030ff",
  };
  export let pervDraw: number;

  export function updateLoading() {
    loading_percent = Math.max(
      0,
      Math.min(1, (loaded_imgs + buffN) / (imageNames.length + soundNames.length))
    );
    if (loading_percent == 1) loaded = true;
  }
  export function getImage(name: imageNamesTp): HTMLImageElement {
    return images[name];
  }
  export function startMenu(){
    let rad = background.height * 0.01;
    background_ctx.drawImage(LD_GLOB.getImage('cosmos'),0,0, LD_GLOB.canvas.width, LD_GLOB.canvas.height)
    LD_GLOB.game_state = "menu";
  }
}

namespace LD_STARTER {
  export function initialization() {
    initCanvas();
    initBackground();
    initInput();
    initImages();
    console.log(`Starting LD 2025 v${LD_GLOB.version}`);
    loadingLoop();
  }
}
function loadingLoop() {
  // loops while the game loads
  drawLoadingScreen();
  if (LD_GLOB.game_state != "loading") {
    requestAnimationFrame(menuLoop);
  } else {
    requestAnimationFrame(loadingLoop);
  }
}
let game_load= false;
function menuLoop() {
  if (!game_load) {
    GAME_LD.init();
    game_load = true;
  }
  drawMenu();
  if (LD_GLOB.game_state == "game") {
    requestAnimationFrame(mainLoop);
  } else {
    requestAnimationFrame(menuLoop);
  }
}
function mainLoop() {
  drawGame();
  GAME_LD.stepGame();
  if (LD_GLOB.game_state == "game") {
    requestAnimationFrame(mainLoop);
  } else {
    requestAnimationFrame(menuLoop);
  }
}
let c_x = 0,
  c_y = 0,
  background: HTMLCanvasElement;
export let background_ctx: CanvasRenderingContext2D;
function drawLoadingScreen() {
  LD_GLOB.mainDst.drawImage(background, 0, 0);
  drawCircle(LD_GLOB.mainDst, c_x, c_y, c_x * 0.5 + 5, LD_GLOB.COLORS.main_5);
  drawCircle(
    LD_GLOB.mainDst,
    c_x,
    c_y,
    LD_GLOB.loading_percent * c_x * 0.5,
    LD_GLOB.loading_percent < 1 ? LD_GLOB.COLORS.main_6 : LD_GLOB.COLORS.main_7
  );
  LD_GLOB.mainDst.fillStyle = LD_GLOB.COLORS.main_7;
  if (LD_GLOB.loaded) {
    LD_GLOB.mainDst.fillText("Click here", c_x - 50, c_y + c_x * 0.6);
  } else LD_GLOB.mainDst.fillText("Loading...", c_x - 50, c_y + c_x * 0.6);
  LD_GLOB.updateLoading(); // TEMP
}
function drawMenu() {
  LD_GLOB.mainDst.drawImage(background, 0, 0);
  LD_GLOB.mainDst.fillStyle = LD_GLOB.COLORS.main_7;
  LD_GLOB.mainDst.fillText(LD_GLOB.menu_text, c_x - 80, c_y * 1.9);
  // LD_GLOB.mainctx.drawImage(LD_GLOB.getImage('face'),100,100);
  GAME_LD.drawGame(LD_GLOB.mainDst);
  drawButtons(LD_GLOB.mainDst);
}
function drawGame() {
  LD_GLOB.mainDst.drawImage(background, 0, 0);
  GAME_LD.drawGame(LD_GLOB.mainDst);
  drawButtons(LD_GLOB.mainDst);
}
function initCanvas() {
  LD_GLOB.canvas = <HTMLCanvasElement>document.getElementById("can");
  positionCanvas(LD_GLOB.canvas);
  LD_GLOB.mainDst = LD_GLOB.canvas.getContext("2d");
  LD_GLOB.mainDst.font = 25 + "px Shantell Sans";
  c_x = LD_GLOB.canvas.width / 2;
  c_y = LD_GLOB.canvas.height / 2;
}
function resizeCanvas() {
  LD_GLOB.canvas.width = window.innerWidth;
  LD_GLOB.canvas.height = window.innerHeight;
  background.width = window.innerWidth;
  background.height = window.innerHeight;
  LD_GLOB.mainDst.font = 25 + "px Shantell Sans";
  c_x = LD_GLOB.canvas.width / 2;
  c_y = LD_GLOB.canvas.height / 2;
  background_ctx.drawImage(LD_GLOB.getImage('cosmos'),0,0, LD_GLOB.canvas.width, LD_GLOB.canvas.height);
}

//     ----------------------- IMAGES --------------------------
const imageFolder = "./images/";
const imageNames = [
  "planet",
  "earth",
  "cosmos",
  // "planet_blue",
  "planet_blue2",
  "planet_yellow",
  "build0",
  "build1",
  "build2",
  "build3",
  "icon1",
  "icon2",
  "icon3",
  "disease",
  "disease_planet",
  "disease_meteor",
  "ship_broken",
  "hook_end",
] as const;
export type imageNamesTp = (typeof imageNames)[number];
const images: { [ind: string]: HTMLImageElement } = {};
let loaded_imgs = 0;
// Load images into an array
function onload_fun() {
  loaded_imgs++;
  console.log(`images loaded ${loaded_imgs} / ${imageNames.length}`);
  LD_GLOB.updateLoading();
  if (loaded_imgs === imageNames.length) {
    all_loaded();
  }
}
function initImages() {
  imageNames.forEach((name) => {
    const img = new Image();
    img.src = imageFolder + name + ".png";
    images[name] = img;
    img.onload = onload_fun;
  });
}
function all_loaded() {
  console.log(`all images loaded`);
}

function initBackground() {
  background = document.createElement("canvas");
  positionCanvas(background);
  background_ctx = background.getContext("2d");
  let rad = background.height * 0.01;
  drawRoundRect(
    background_ctx,
    0,
    0,
    0,
    LD_GLOB.canvas.width,
    LD_GLOB.canvas.height,
    LD_GLOB.COLORS.main_4
  );
  drawRoundRect(background_ctx, rad * 1, rad * 1, rad * 1, LD_GLOB.canvas.width - rad * 1 * 2, LD_GLOB.canvas.height - rad * 1 * 2, LD_GLOB.COLORS.main_3);
  drawRoundRect(background_ctx, rad * 2, rad * 2, rad * 2, LD_GLOB.canvas.width - rad * 2 * 2, LD_GLOB.canvas.height - rad * 2 * 2, LD_GLOB.COLORS.main_2);
  drawRoundRect(background_ctx, rad * 3, rad * 3, rad * 3, LD_GLOB.canvas.width - rad * 3 * 2, LD_GLOB.canvas.height - rad * 3 * 2, LD_GLOB.COLORS.main_1);
}

//     ----------------------- SOUND --------------------------

const soundNames = ["background", "build", "collis", "death", "disease1",
                    "disease2", "expl", "hook1", "hook2", "hook3","voice", "pip"] as const;
type soundNamesTp = (typeof soundNames)[number];
var audio_context: AudioContext;
window.addEventListener("load", initSounds, false);
window.addEventListener('resize', resizeCanvas);

function initSounds() {
  try {
    audio_context = new AudioContext();
    console.log("currTime:" + audio_context.currentTime);
    //Here path should be searching from .html, not .js. It works both ways locally, but only 1st one works from itch.
    buffOverall = soundNames.length;
    soundNames.forEach((name) => {
      loadSound(`./sound/${name}.mp3`, name);
    });
    // buffN+=999;
  } catch (e) {
    alert("Web Audio API is not supported in this browser");
  }
}

var all_buffers: { [ind: string]: AudioBuffer } = {};
var buffN = 0;
let buffOverall = 0;

function loadSound(url: string, buf_name: string) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  // Decode asynchronously
  request.onload = function () {
    audio_context.decodeAudioData(
      request.response,
      function (buffer) {
        all_buffers[buf_name] = buffer;
        buffN++;
        LD_GLOB.updateLoading();
        if (buffN == buffOverall)
          console.log("ALL SOUNDS LOADED in " + audio_context.currentTime);
      },
      (e) => {
        console.log("ERROR DECODING AUDIO");
      }
    );
    console.log("Sound Loaded curTime: " + audio_context.currentTime);
  };
  request.send();
}

export function playSound(
  sound_name: soundNamesTp,
  vol: number = 1,
  wait: number = 0,
  loop: boolean = false
): AudioBufferSourceNode {
  if(!audio_context || LD_GLOB.mute)return;
  // console.log(`${sound_name}`);
  let buffer: AudioBuffer = all_buffers[sound_name];
  var source = audio_context.createBufferSource(); // creates a sound source
  const gainNode = audio_context.createGain();

  source.buffer = buffer; // tell the source which sound to play
  source.connect(gainNode); // connect the source to the context's destination (the speakers)
  gainNode.connect(audio_context.destination);
  gainNode.gain.setValueAtTime(vol, audio_context.currentTime);

  // if(wait!=0)console.log('waiting sound: '+context.currentTime+' wait: '+wait);
  source.loop = loop;
  source.start(audio_context.currentTime + wait / 100); // play the source now
  return source;
}

window["starterLD"] = LD_STARTER.initialization;
