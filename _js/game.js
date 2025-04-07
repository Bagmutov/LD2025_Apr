import { LD_GLOB } from "./main.js";
import { Meteor } from "./objects/meteor.js";
import { Planet } from "./objects/planet.js";
import { Vector } from "./objects/vector.js";
import { PhisicMode } from "./objects/circle.js";
import { arrDel } from "./tools.js";
import { Building } from "./objects/buildings/building.js";
import { launchDisease } from "./objects/meteor_disease.js";
export var GAME_CONFIG;
(function (GAME_CONFIG) {
    let PlanetType;
    (function (PlanetType) {
        PlanetType["planet"] = "planet";
        PlanetType["startPlanet"] = "startPlanet";
    })(PlanetType = GAME_CONFIG.PlanetType || (GAME_CONFIG.PlanetType = {}));
    let MeteorType;
    (function (MeteorType) {
        MeteorType["smallMeteor"] = "smallMeteor";
        MeteorType["mediumMeteor"] = "mediumMeteor";
        MeteorType["largeMeteor"] = "largeMeteor";
    })(MeteorType = GAME_CONFIG.MeteorType || (GAME_CONFIG.MeteorType = {}));
    let HookType;
    (function (HookType) {
        HookType["standartHook"] = "standartHook";
    })(HookType = GAME_CONFIG.HookType || (GAME_CONFIG.HookType = {}));
    let BombType;
    (function (BombType) {
        BombType["standartBomb"] = "standartBomb";
    })(BombType = GAME_CONFIG.BombType || (GAME_CONFIG.BombType = {}));
    let SpaceShipType;
    (function (SpaceShipType) {
        SpaceShipType["standartSpaseShip"] = "standartSpaseShip";
    })(SpaceShipType = GAME_CONFIG.SpaceShipType || (GAME_CONFIG.SpaceShipType = {}));
    let BuildingType;
    (function (BuildingType) {
        BuildingType[BuildingType["hookTier1"] = 0] = "hookTier1";
        BuildingType[BuildingType["hookTier2"] = 1] = "hookTier2";
        BuildingType[BuildingType["hookTier3"] = 2] = "hookTier3";
        BuildingType[BuildingType["bombTier1"] = 3] = "bombTier1";
        BuildingType[BuildingType["starting"] = 4] = "starting";
        BuildingType[BuildingType["disease1"] = 5] = "disease1";
    })(BuildingType = GAME_CONFIG.BuildingType || (GAME_CONFIG.BuildingType = {}));
    let AbilityType;
    (function (AbilityType) {
        AbilityType["hook"] = "hook";
        AbilityType["bomb"] = "bomb";
        AbilityType["spaseShip"] = "spaseShip";
    })(AbilityType = GAME_CONFIG.AbilityType || (GAME_CONFIG.AbilityType = {}));
    GAME_CONFIG.PlanetConfig = {
        [PlanetType.planet]: {
            stability: 5,
            radius: 60,
            image: "planet",
            mass: 200,
            startBuilding: null,
            phisicMode: PhisicMode.braking,
        },
        [PlanetType.startPlanet]: {
            stability: 7,
            radius: 70,
            image: "planet",
            mass: 200,
            startBuilding: BuildingType.starting,
            phisicMode: PhisicMode.braking,
        },

    };
    GAME_CONFIG.MeteorConfig = {
        [MeteorType.smallMeteor]: {
            stability: 1,
            radius: 8,
            image: "planet",
            phisicMode: PhisicMode.gravity,
            innerResource: new Map([
                ["gold" /* ResourceType.gold */, 0],
                ["iron" /* ResourceType.iron */, 10],
            ]),
        },
        [MeteorType.mediumMeteor]: {
            stability: 2,
            radius: 12,
            image: "planet",
            phisicMode: PhisicMode.gravity,
            innerResource: new Map([
                ["gold" /* ResourceType.gold */, 0],
                ["iron" /* ResourceType.iron */, 10],
            ]),
        },
        [MeteorType.largeMeteor]: {
            stability: 3,
            radius: 20,
            image: "planet",
            phisicMode: PhisicMode.gravity,
            innerResource: new Map([
                ["gold" /* ResourceType.gold */, 0],
                ["iron" /* ResourceType.iron */, 1],
            ]),
        },
    };
    GAME_CONFIG.HookConfig = {
        [HookType.standartHook]: { stability: 10, radius: 10, image: "planet", forwardSpeed: 800, backwardSpeed: 1000, powerLavel: 10, maxLenth: 300, phisicMode: PhisicMode.standart },
    };
    GAME_CONFIG.BombConfig = {
        [BombType.standartBomb]: {
            stability: 10,
            radius: 20,
            image: 'bomb',
            phisicMode: PhisicMode.standart,
            speed: 400,
            maxDist: 1000,
            explosionRadius: 40,
            blastWaveRadius: 70,
            explosionStregth: 1,
            blastWaveStregth: 8,
            blastWaveVelocityAdd: 200,
            explosionImages: ['bombe1', 'bombe2'],
        },
    };
    GAME_CONFIG.SpaceShipConfig = {
        [SpaceShipType.standartSpaseShip]: {
            stability: 10,
            radius: 10,
            image: 'planet',
            forwardSpeed: 400,
            powerLavel: 4,
            phisicMode: PhisicMode.standart
        }
    };
    GAME_CONFIG.Other = {
        spaceship_cost: new Map([
            ["gold" /* ResourceType.gold */, 0],
            ["iron" /* ResourceType.iron */, 1],
        ]),
        space_icon_name: 'icon3',
        space_icon_rad: 15,
        space_img_name: 'build3',
        space_img_rad: 15,
        space_build_image: null,
    };
    GAME_CONFIG.MeteorDiseaseConfig = {
        radius: 10,
        image: 'disease',
        phisicMode: PhisicMode.standart,
        stability: 1,
        vel: 20
    };
    GAME_CONFIG.BuildingConfig = {
        [BuildingType.starting]: {
            radius: 15,
            image_build: "build0",
            image_icon: "icon1",
            abilityType: null,
            abilityConfig: null,
            cost: new Map([
                ["gold" /* ResourceType.gold */, 0],
                ["iron" /* ResourceType.iron */, 0],
            ]),
            nextUpgrades: [BuildingType.hookTier1, BuildingType.bombTier1],
        },
        [BuildingType.hookTier1]: {
            radius: 15,
            image_build: "build1",
            image_icon: "icon1",
            abilityType: AbilityType.hook,
            abilityConfig: HookType.standartHook,
            cost: new Map([
                ["gold" /* ResourceType.gold */, 10],
                ["iron" /* ResourceType.iron */, 10],
            ]),
            nextUpgrades: [BuildingType.hookTier2],
        },
        [BuildingType.hookTier2]: {
            radius: 15,
            image_build: "build1",
            image_icon: "icon1",
            abilityType: AbilityType.hook,
            abilityConfig: HookType.standartHook,
            cost: new Map([
                ["gold" /* ResourceType.gold */, 10],
                ["iron" /* ResourceType.iron */, 10],
            ]),
            nextUpgrades: [BuildingType.hookTier3],
        },
        [BuildingType.hookTier3]: {
            radius: 15,
            image_build: "build1",
            image_icon: "icon1",
            abilityType: AbilityType.hook,
            abilityConfig: HookType.standartHook,
            cost: new Map([
                ["gold" /* ResourceType.gold */, 10],
                ["iron" /* ResourceType.iron */, 10],
            ]),
            nextUpgrades: [],
        },
        [BuildingType.bombTier1]: {
            radius: 15,
            image_build: "build1",
            image_icon: 'bomb',
            abilityType: AbilityType.bomb,
            abilityConfig: BombType.standartBomb,
            cost: new Map([
                ["gold" /* ResourceType.gold */, 10],
                ["iron" /* ResourceType.iron */, 10],
            ]),
            nextUpgrades: [],
        },
        [BuildingType.disease1]: {
            evil: true,
            radius: 15,
            image_build: "disease",
            image_icon: 'bomb',
            abilityType: null,
            abilityConfig: null,
            cost: new Map([
                ["gold" /* ResourceType.gold */, 10],
                ["iron" /* ResourceType.iron */, 10],
            ]),
            nextUpgrades: [],
        },
    };
})(GAME_CONFIG || (GAME_CONFIG = {}));
export var GAME_LD;
(function (GAME_LD) {
    GAME_LD.keyMap = {};
    GAME_LD.mouseMap = {};
    GAME_LD.Layers = {
        None: 0,
        Planet: 1 << 0,
        Meteor: 1 << 1,
        Hook: 1 << 2,
        SpaseShip: 1 << 3,
        Bomb: 1 << 4,
    };
    GAME_LD.planets = [];
    let meteors = [];
    GAME_LD.diseasedPlanets = []; //This is horrible. We assume obj wouldn't loose diseased building ever
    let objects = []; // here will be all objects, with duplicates in planets, meteors etc
    // export let startBuilding;
    GAME_LD.buildings = {};
    function init() {
        GAME_LD.lastFrame = new Date().getTime();
        GAME_CONFIG.Other.space_build_image = LD_GLOB.getImage(GAME_CONFIG.Other.space_img_name);
        for (let key in Object.keys(GAME_CONFIG.BuildingType)
            .filter((v) => isNaN(Number(v)))) { //creates one building of each type
            GAME_LD.buildings[key] = new Building(key);
        }
        addCircleObject(new Planet(new Vector(LD_GLOB.canvas.width * .6, LD_GLOB.canvas.height * .6), GAME_CONFIG.PlanetType.startPlanet));
        addCircleObject(new Planet(new Vector(LD_GLOB.canvas.width * .3, LD_GLOB.canvas.height * .3), GAME_CONFIG.PlanetType.planet));
        let obj = new Planet(new Vector(LD_GLOB.canvas.width * .2, LD_GLOB.canvas.height * .2), GAME_CONFIG.PlanetType.planet);
        obj.build(GAME_LD.buildings[GAME_CONFIG.BuildingType.disease1]);
        addCircleObject(obj);
        obj = new Planet(new Vector(LD_GLOB.canvas.width * .2, LD_GLOB.canvas.height * .8), GAME_CONFIG.PlanetType.planet);
        obj.build(GAME_LD.buildings[GAME_CONFIG.BuildingType.starting]);
        addCircleObject(obj);
        addCircleObject(new Meteor(new Vector(LD_GLOB.canvas.width / 2, LD_GLOB.canvas.height / 2 - 200), GAME_CONFIG.MeteorType.mediumMeteor, new Vector(200, 30)));
    }
    GAME_LD.init = init;
    function addCircleObject(obj) {
        if (objects.indexOf(obj) >= 0)
            throw new Error('Object is added to the scene a second time.');
        if (obj instanceof Planet) {
            GAME_LD.planets.push(obj);
            obj.my_array = GAME_LD.planets;
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
        for (let planet of GAME_LD.planets) {
            let dir = planet.coordinates
                .sub(point);
            let len = dir.len();
            if (len == 0)
                continue; // to avoid division by 0
            let a = dir.multiply(planet.mass * 500 / Math.pow(len, 3));
            res = res.add(a);
        }
        return res;
    }
    GAME_LD.getAcseleration = getAcseleration;
    // layer: cумма нескольких collisionLayer
    function getColisions(circle, layer) {
        let colisions = [];
        if ((layer & GAME_LD.Layers.Planet) != 0) {
            for (let obj of GAME_LD.planets) {
                if (circle.checkCollision(obj))
                    colisions.push(obj);
            }
        }
        if ((layer & GAME_LD.Layers.Meteor) != 0) {
            for (let obj of meteors) {
                if (circle.checkCollision(obj))
                    colisions.push(obj);
            }
        }
        return colisions;
    }
    GAME_LD.getColisions = getColisions;
    function drawGame(dst) {
        for (let planet of GAME_LD.planets) {
            planet.draw(dst);
        }
        for (let object of objects) {
            object.draw(dst);
        }
        for (let meteor of meteors) {
            meteor.draw(dst);
        }
    }
    GAME_LD.drawGame = drawGame;
    let diseaseTimer = 1;
    function stepGame() {
        let delta = (new Date().getTime() - GAME_LD.lastFrame) / 1000;
        for (let obj of objects) {
            obj.step(delta);
        }
        diseaseTimer -= delta;
        if (diseaseTimer < 0) {
            diseaseTimer = Math.max(1, 4 - .5 * GAME_LD.diseasedPlanets.length) + Math.random() * 5;
            if (GAME_LD.diseasedPlanets.length > 0)
                launchDisease(GAME_LD.diseasedPlanets[~~(GAME_LD.diseasedPlanets.length * Math.random())]);
        }
        GAME_LD.lastFrame = new Date().getTime();
    }
    GAME_LD.stepGame = stepGame;
})(GAME_LD || (GAME_LD = {}));
//# sourceMappingURL=game.js.map