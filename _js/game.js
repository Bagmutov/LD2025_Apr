import { LD_GLOB, playSound } from "./main.js";
import { Meteor } from "./objects/meteor.js";
import { Planet } from "./objects/planet.js";
import { Vector } from "./objects/vector.js";
import { PhisicMode } from "./objects/circle.js";
import { arrDel } from "./tools.js";
import { Building } from "./objects/buildings/building.js";
import { Bomb } from "./objects/abilities/bomb.js";
import { launchDisease, MeteorDisease } from "./objects/meteor_disease.js";
import { Spawner } from "./objects/spawner.js";
import { clearButtons } from "./objects/button.js";
import { SpaceShip } from "./objects/abilities/spaseShip.js";
import { Hook } from "./objects/abilities/hook.js";
export var GAME_CONFIG;
(function (GAME_CONFIG) {
    let PlanetType;
    (function (PlanetType) {
        PlanetType["planet"] = "planet";
        PlanetType["startPlanet"] = "startPlanet";
        PlanetType["diseasePlanet"] = "diseasePlanet";
    })(PlanetType = GAME_CONFIG.PlanetType || (GAME_CONFIG.PlanetType = {}));
    let MeteorType;
    (function (MeteorType) {
        MeteorType["smallMeteor"] = "smallMeteor";
        MeteorType["mediumMeteor"] = "mediumMeteor";
        MeteorType["largeMeteor"] = "largeMeteor";
    })(MeteorType = GAME_CONFIG.MeteorType || (GAME_CONFIG.MeteorType = {}));
    let HookType;
    (function (HookType) {
        HookType["hookTier1"] = "hookTier1";
        HookType["hookTier2"] = "hookTier2";
        HookType["hookTier3"] = "hookTier3";
    })(HookType = GAME_CONFIG.HookType || (GAME_CONFIG.HookType = {}));
    let BombType;
    (function (BombType) {
        BombType["bombTier1"] = "bombTier1";
        BombType["bombTier2"] = "bombTier2";
        BombType["bombTier3"] = "bombTier3";
    })(BombType = GAME_CONFIG.BombType || (GAME_CONFIG.BombType = {}));
    let TrapType;
    (function (TrapType) {
        TrapType["standartTrap"] = "standartBomb";
    })(TrapType = GAME_CONFIG.TrapType || (GAME_CONFIG.TrapType = {}));
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
        BuildingType[BuildingType["bombTier2"] = 4] = "bombTier2";
        BuildingType[BuildingType["bombTier3"] = 5] = "bombTier3";
        BuildingType[BuildingType["trapTier1"] = 6] = "trapTier1";
        BuildingType[BuildingType["starting"] = 7] = "starting";
        BuildingType[BuildingType["disease1"] = 8] = "disease1";
        BuildingType[BuildingType["disease2"] = 9] = "disease2";
        BuildingType[BuildingType["disease3"] = 10] = "disease3";
    })(BuildingType = GAME_CONFIG.BuildingType || (GAME_CONFIG.BuildingType = {}));
    let AbilityType;
    (function (AbilityType) {
        AbilityType["hook"] = "hook";
        AbilityType["bomb"] = "bomb";
        AbilityType["trap"] = "trap";
        AbilityType["spaseShip"] = "spaseShip";
        AbilityType["diesese"] = "diesese";
    })(AbilityType = GAME_CONFIG.AbilityType || (GAME_CONFIG.AbilityType = {}));
    GAME_CONFIG.PlanetConfig = {
        [PlanetType.planet]: {
            stability: 5,
            radius: 40,
            image: "planet",
            mass: 200,
            diseaseValue: 0,
            startBuilding: null,
            phisicMode: PhisicMode.braking,
        },
        [PlanetType.startPlanet]: {
            stability: 7,
            radius: 50,
            image: "planet",
            mass: 200,
            diseaseValue: 0,
            startBuilding: BuildingType.starting,
            phisicMode: PhisicMode.braking,
        },
        [PlanetType.diseasePlanet]: {
            stability: 7,
            radius: 40,
            image: "planet",
            mass: 200,
            diseaseValue: 10,
            startBuilding: BuildingType.disease1,
            phisicMode: PhisicMode.braking,
        },
    };
    GAME_CONFIG.MeteorConfig = {
        [MeteorType.smallMeteor]: {
            stability: 1,
            radius: 8,
            image: "planet_blue",
            phisicMode: PhisicMode.gravity,
            innerResource: new Map([
                ["iron" /* ResourceType.iron */, 2],
                ["gold" /* ResourceType.gold */, 0],
            ]),
        },
        [MeteorType.mediumMeteor]: {
            stability: 2,
            radius: 12,
            image: "planet_blue",
            phisicMode: PhisicMode.gravity,
            innerResource: new Map([
                ["iron" /* ResourceType.iron */, 3],
                ["gold" /* ResourceType.gold */, 1],
            ]),
        },
        [MeteorType.largeMeteor]: {
            stability: 3,
            radius: 20,
            image: "planet_yellow",
            phisicMode: PhisicMode.gravity,
            innerResource: new Map([
                ["iron" /* ResourceType.iron */, 2],
                ["gold" /* ResourceType.gold */, 4],
            ]),
        },
    };
    GAME_CONFIG.HookConfig = {
        [HookType.hookTier1]: {
            stability: 10,
            radius: 10,
            image: "hook_end",
            forwardSpeed: 400,
            backwardSpeed: 400,
            powerLavel: 1,
            maxLenth: 250,
            phisicMode: PhisicMode.standart
        },
        [HookType.hookTier2]: {
            stability: 10,
            radius: 20,
            image: "hook_end",
            forwardSpeed: 800,
            backwardSpeed: 1000,
            powerLavel: 3,
            maxLenth: 400,
            phisicMode: PhisicMode.standart
        },
        [HookType.hookTier3]: {
            stability: 10,
            radius: 30,
            image: "hook_end",
            forwardSpeed: 1500,
            backwardSpeed: 2000,
            powerLavel: 10,
            maxLenth: 1000,
            phisicMode: PhisicMode.standart
        },
    };
    GAME_CONFIG.BombConfig = {
        [BombType.bombTier1]: {
            stability: 10,
            radius: 15,
            image: "build2",
            phisicMode: PhisicMode.braking,
            speed: 200,
            maxDist: 9999,
            explosionRadius: 30,
            blastWaveRadius: 100,
            explosionStregth: 2,
            blastWaveStregth: 4,
            blastWaveVelocityAdd: 50,
            explosionImages: ["build0", "build2"],
            itemCost: new Map([
                ["iron" /* ResourceType.iron */, 2],
                ["gold" /* ResourceType.gold */, 0],
            ]),
        },
        [BombType.bombTier2]: {
            stability: 10,
            radius: 20,
            image: "build2",
            phisicMode: PhisicMode.braking,
            speed: 300,
            maxDist: 9999,
            explosionRadius: 40,
            blastWaveRadius: 200,
            explosionStregth: 3,
            blastWaveStregth: 6,
            blastWaveVelocityAdd: 150,
            explosionImages: ["build0", "build2"],
            itemCost: new Map([
                ["iron" /* ResourceType.iron */, 4],
                ["gold" /* ResourceType.gold */, 0],
            ]),
        },
        [BombType.bombTier3]: {
            stability: 10,
            radius: 20,
            image: "build2",
            phisicMode: PhisicMode.braking,
            speed: 500,
            maxDist: 9999,
            explosionRadius: 50,
            blastWaveRadius: 250,
            explosionStregth: 8,
            blastWaveStregth: 12,
            blastWaveVelocityAdd: 200,
            explosionImages: ["build0", "build2"],
            itemCost: new Map([
                ["iron" /* ResourceType.iron */, 6],
                ["gold" /* ResourceType.gold */, 1],
            ]),
        },
    };
    GAME_CONFIG.TrapConfig = {
        [TrapType.standartTrap]: {
            stability: 10,
            radius: 20,
            image: "build0",
            phisicMode: PhisicMode.braking,
            speed: 200,
            maxDist: 9999,
            trapRadius: 300,
            trapStregth: 10,
            trapDelStregth: 5,
            trapVelocityAdd: 10,
            activeImage: 'build1',
            activeDuration: 4,
            itemCost: new Map([
                ["gold" /* ResourceType.gold */, 5],
                ["iron" /* ResourceType.iron */, 10],
            ])
        },
    };
    GAME_CONFIG.SpaceShipConfig = {
        [SpaceShipType.standartSpaseShip]: {
            stability: 1,
            radius: 10,
            image: 'icon3',
            image_broken: 'ship_broken',
            forwardSpeed: 400,
            powerLavel: 4,
            phisicMode: PhisicMode.gravity
        }
    };
    GAME_CONFIG.Other = {
        spaceship_cost: new Map([
            ["iron" /* ResourceType.iron */, 2],
            ["gold" /* ResourceType.gold */, 0],
        ]),
        space_icon_name: 'icon3',
        space_icon_rad: 15,
        space_img_name: 'build3',
        space_img_rad: 15,
        space_build_image: null,
    };
    let MeteorDiseaseType;
    (function (MeteorDiseaseType) {
        MeteorDiseaseType["tier1"] = "tier1";
        MeteorDiseaseType["tier2"] = "tier2";
        MeteorDiseaseType["tier3"] = "tier3";
    })(MeteorDiseaseType = GAME_CONFIG.MeteorDiseaseType || (GAME_CONFIG.MeteorDiseaseType = {}));
    GAME_CONFIG.MeteorDiseaseConfig = {
        [MeteorDiseaseType.tier1]: {
            radius: 10,
            image: "disease",
            phisicMode: PhisicMode.standart,
            stability: 3,
            vel: 20,
            diseaseAdd: 3,
        },
        [MeteorDiseaseType.tier2]: {
            radius: 5,
            image: "disease",
            phisicMode: PhisicMode.standart,
            stability: 2,
            vel: 200,
            diseaseAdd: 2,
        },
        [MeteorDiseaseType.tier3]: {
            radius: 20,
            image: "disease",
            phisicMode: PhisicMode.standart,
            stability: 7,
            vel: 40,
            diseaseAdd: 10,
        },
    };
    GAME_CONFIG.SpawnerConfig = {
        met_vel: 100,
        disease_vel: 100,
        offscreen_dist: 100
    };
    GAME_CONFIG.BuildingConfig = {
        [BuildingType.starting]: {
            radius: 15,
            image_build: "build0",
            image_icon: "icon1",
            abilityType: null,
            abilityConfig: null,
            cost: new Map([
                ["iron" /* ResourceType.iron */, 0],
                ["gold" /* ResourceType.gold */, 0],
            ]),
            nextUpgrades: [BuildingType.hookTier1, BuildingType.bombTier1],
        },
        [BuildingType.hookTier1]: {
            radius: 15,
            image_build: "build1",
            image_icon: "icon1",
            abilityType: AbilityType.hook,
            abilityConfig: HookType.hookTier1,
            cost: new Map([
                ["iron" /* ResourceType.iron */, 0],
                ["gold" /* ResourceType.gold */, 3],
            ]),
            nextUpgrades: [BuildingType.hookTier2],
        },
        [BuildingType.hookTier2]: {
            radius: 15,
            image_build: "build1",
            image_icon: "icon1",
            abilityType: AbilityType.hook,
            abilityConfig: HookType.hookTier2,
            cost: new Map([
                ["iron" /* ResourceType.iron */, 0],
                ["gold" /* ResourceType.gold */, 6],
            ]),
            nextUpgrades: [BuildingType.hookTier3],
        },
        [BuildingType.hookTier3]: {
            radius: 15,
            image_build: "build1",
            image_icon: "icon1",
            abilityType: AbilityType.hook,
            abilityConfig: HookType.hookTier3,
            cost: new Map([
                ["iron" /* ResourceType.iron */, 0],
                ["gold" /* ResourceType.gold */, 10],
            ]),
            nextUpgrades: [],
        },
        [BuildingType.bombTier1]: {
            radius: 15,
            image_build: "build2",
            image_icon: "icon2",
            abilityType: AbilityType.bomb,
            abilityConfig: BombType.bombTier1,
            cost: new Map([
                ["iron" /* ResourceType.iron */, 0],
                ["gold" /* ResourceType.gold */, 4],
            ]),
            nextUpgrades: [BuildingType.trapTier1, BuildingType.bombTier2],
        },
        [BuildingType.bombTier2]: {
            radius: 15,
            image_build: "build2",
            image_icon: "icon2",
            abilityType: AbilityType.bomb,
            abilityConfig: BombType.bombTier2,
            cost: new Map([
                ["iron" /* ResourceType.iron */, 0],
                ["gold" /* ResourceType.gold */, 8],
            ]),
            nextUpgrades: [BuildingType.trapTier1, BuildingType.bombTier3],
        },
        [BuildingType.bombTier3]: {
            radius: 15,
            image_build: "build2",
            image_icon: "icon2",
            abilityType: AbilityType.bomb,
            abilityConfig: BombType.bombTier3,
            cost: new Map([
                ["iron" /* ResourceType.iron */, 5],
                ["gold" /* ResourceType.gold */, 20],
            ]),
            nextUpgrades: [],
        },
        [BuildingType.trapTier1]: {
            radius: 15,
            image_build: "build2",
            image_icon: "icon2",
            abilityType: AbilityType.trap,
            abilityConfig: TrapType.standartTrap,
            cost: new Map([
                ["iron" /* ResourceType.iron */, 10],
                ["gold" /* ResourceType.gold */, 10],
            ]),
            nextUpgrades: [],
        },
        [BuildingType.disease1]: {
            evil: true,
            radius: 15,
            image_build: "disease",
            image_icon: "ship_broken",
            abilityType: AbilityType.diesese,
            abilityConfig: MeteorDiseaseType.tier1,
            cost: null,
            nextUpgrades: [],
        },
        [BuildingType.disease2]: {
            evil: true,
            radius: 15,
            image_build: "disease",
            image_icon: "ship_broken",
            abilityType: AbilityType.diesese,
            abilityConfig: MeteorDiseaseType.tier2,
            cost: null,
            nextUpgrades: [],
        },
        [BuildingType.disease3]: {
            evil: true,
            radius: 15,
            image_build: "disease",
            image_icon: "ship_broken",
            abilityType: AbilityType.diesese,
            abilityConfig: MeteorDiseaseType.tier3,
            cost: null,
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
        Items: 1 << 2,
        SpaseShip: 1 << 3,
        Disease: 1 << 4,
        All: 1 << 5,
    };
    GAME_LD.planets = [];
    GAME_LD.meteors = [];
    GAME_LD.spaceships = [];
    GAME_LD.items = [];
    GAME_LD.meteorsDis = [];
    let meteorSpawners = [];
    GAME_LD.diseasedPlanets = []; //This is horrible. We assume obj wouldn't loose diseased building ever
    let diseaseSpawners = [];
    GAME_LD.max_meteors = 20; //Just change it when creating lvls
    let objects = []; // here will be all objects, with duplicates in planets, meteors etc
    // export let startBuilding;
    GAME_LD.buildings = {};
    function getRandomVector(border) {
        return new Vector(border + Math.random() * (LD_GLOB.canvas.width - border * 2), border + Math.random() * (LD_GLOB.canvas.height - border * 2));
    }
    function init() {
        GAME_LD.lastFrame = new Date().getTime();
        GAME_CONFIG.Other.space_build_image = LD_GLOB.getImage(GAME_CONFIG.Other.space_img_name);
        for (let key in Object.keys(GAME_CONFIG.BuildingType)
            .filter((v) => isNaN(Number(v)))) { //creates one building of each type
            GAME_LD.buildings[key] = new Building(key);
        }
        addSpawner(new Spawner('disease', getRandomVector(0)));
        addSpawner(new Spawner('meteor', getRandomVector(0), GAME_CONFIG.MeteorType.smallMeteor));
        addSpawner(new Spawner('meteor', getRandomVector(0), GAME_CONFIG.MeteorType.mediumMeteor));
        addSpawner(new Spawner('meteor', getRandomVector(0), GAME_CONFIG.MeteorType.largeMeteor));
        let obj = new Planet(new Vector(LD_GLOB.canvas.width - 100, LD_GLOB.canvas.height - 100), GAME_CONFIG.PlanetType.startPlanet);
        obj.inventory.addResource("iron" /* ResourceType.iron */, 6);
        obj.inventory.addResource("gold" /* ResourceType.gold */, 0);
        addCircleObject(obj);
        obj = new Planet(new Vector(120, 120), GAME_CONFIG.PlanetType.diseasePlanet);
        addCircleObject(obj);
        for (let i = 0; i < 12; i++) {
            let col = true, count = 0;
            let planet = new Planet(getRandomVector(100), GAME_CONFIG.PlanetType.planet);
            while (col && count < 20) {
                planet.coordinates = getRandomVector(100);
                col = (GAME_LD.getColisions(planet, GAME_LD.Layers.Planet).length > 0);
                count++;
            }
            addCircleObject(planet);
        }
        for (let i = 0; i < 3; i++) {
            addCircleObject(new Meteor(getRandomVector(50), GAME_CONFIG.MeteorType.smallMeteor, new Vector(Math.random() * 100 - 50, Math.random() * 100 - 50)));
        }
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
            GAME_LD.meteors.push(obj);
            obj.my_array = GAME_LD.meteors;
        }
        else if (obj instanceof MeteorDisease) {
            GAME_LD.meteorsDis.push(obj);
            obj.my_array = GAME_LD.meteorsDis;
        }
        else if (obj instanceof SpaceShip) {
            GAME_LD.spaceships.push(obj);
            obj.my_array = GAME_LD.spaceships;
        }
        else if (obj instanceof Hook || obj instanceof Bomb) {
            GAME_LD.items.push(obj);
            obj.my_array = GAME_LD.items;
        }
        objects.push(obj);
    }
    GAME_LD.addCircleObject = addCircleObject;
    function addPlanetsInDiseased(obj) {
        if (GAME_LD.diseasedPlanets.indexOf(obj) >= 0) {
            return;
        }
        GAME_LD.diseasedPlanets.push(obj);
        GAME_LD.checkWinLoseConditions();
    }
    GAME_LD.addPlanetsInDiseased = addPlanetsInDiseased;
    function delPlanetsFromDiseased(obj) {
        arrDel(GAME_LD.diseasedPlanets, obj);
        GAME_LD.checkWinLoseConditions();
    }
    GAME_LD.delPlanetsFromDiseased = delPlanetsFromDiseased;
    function delCircleObject(obj) {
        arrDel(objects, obj);
        if (obj.my_array)
            arrDel(obj.my_array, obj);
    }
    GAME_LD.delCircleObject = delCircleObject;
    function addSpawner(spw) {
        if (spw.obj_type == 'meteor')
            meteorSpawners.push(spw);
        else
            diseaseSpawners.push(spw);
    }
    GAME_LD.addSpawner = addSpawner;
    function getAcseleration(point) {
        let res = new Vector(0, 0);
        for (let planet of GAME_LD.planets) {
            let dir = planet.coordinates
                .sub(point);
            let len = dir.len();
            if (len == 0)
                continue; // to avoid division by 0
            let a = dir.multiply(planet.mass * 150 / Math.max(1000000, Math.pow(len, 3))); //*500 **3
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
            for (let obj of GAME_LD.meteors) {
                if (circle.checkCollision(obj))
                    colisions.push(obj);
            }
        }
        if ((layer & GAME_LD.Layers.Disease) != 0) {
            for (let obj of GAME_LD.meteorsDis) {
                if (circle.checkCollision(obj))
                    colisions.push(obj);
            }
        }
        if ((layer & GAME_LD.Layers.SpaseShip) != 0) {
            for (let obj of GAME_LD.spaceships) {
                if (circle.checkCollision(obj))
                    colisions.push(obj);
            }
        }
        if ((layer & GAME_LD.Layers.Items) != 0) {
            for (let obj of GAME_LD.items) {
                if (circle.checkCollision(obj))
                    colisions.push(obj);
            }
        }
        if ((layer & GAME_LD.Layers.All) != 0) {
            for (let obj of objects) {
                if (circle.checkCollision(obj))
                    colisions.push(obj);
            }
        }
        return colisions;
    }
    GAME_LD.getColisions = getColisions;
    function checkWinLoseConditions() {
        let player_planets = 0;
        GAME_LD.planets.forEach(el => { if (el.building && !el.building.config.evil)
            player_planets += 1; });
        let is_all_spaseShipDie = false;
        for (let s of GAME_LD.spaceships) {
            is_all_spaseShipDie = is_all_spaseShipDie || !s.broken;
        }
        if (player_planets == 0 && is_all_spaseShipDie) {
            restart();
            LD_GLOB.menu_text = 'Humanity is dead. Press Enter.';
            playSound('death', .1);
        }
        if (GAME_LD.diseasedPlanets.length == 0) {
            restart();
            LD_GLOB.menu_text = "The space is ours! Victory!";
        }
    }
    GAME_LD.checkWinLoseConditions = checkWinLoseConditions;
    function restart() {
        clearAll();
        LD_GLOB.game_state = 'menu';
        init();
    }
    GAME_LD.restart = restart;
    function clearAll() {
        while (objects.length)
            delCircleObject(objects[0]);
        clearButtons();
        diseaseSpawners = [];
        meteorSpawners = [];
        GAME_LD.diseasedPlanets = [];
        stepN = 0;
        diseaseTimer = DISEASE_WAIT;
        meteorTimer = 0;
        backmusicTimer = 0;
    }
    GAME_LD.clearAll = clearAll;
    function drawGame(dst) {
        for (let planet of GAME_LD.planets) {
            planet.draw(dst);
        }
        for (let object of objects) {
            object.draw(dst);
        }
        for (let meteor of GAME_LD.meteors) {
            meteor.draw(dst);
        }
        // dst.fillStyle = LD_GLOB.COLORS.red;
        // for (let planet1 of diseasedPlanets) {
        //   for (let planet2 of diseasedPlanets){
        //     if (planet1 != planet2){
        //       drawLine(
        //         dst,
        //         planet1.coordinates.x,
        //         planet1.coordinates.y,
        //         planet2.coordinates.x,
        //         planet2.coordinates.y,
        //         null,
        //         10
        //       )
        //     }
        //   }
        // }
        //FOR DEBUG:
        // dst.fillStyle='#ffffff';
        // for(let sp of meteorSpawners){
        //   dst.fillRect(sp.target.x,sp.target.y,3,3);
        // }
        // dst.fillStyle='#ffaaff';
        // for(let sp of diseaseSpawners){
        //   dst.fillRect(sp.target.x,sp.target.y,3,3);
        // }
        dst.fillStyle = LD_GLOB.COLORS.main_5;
        dst.fillText(`R : Restart`, 30, 40);
        dst.fillText(`M : Mute`, 30, 60);
        // dst.fillText(`plnt:${planets.length}`,10,40);
        // dst.fillText(`met:${meteors.length}`,10,60);
        // dst.fillText(`dis:${meteorsDis.length}`,10,80);
        // dst.fillText(`ships:${spaceships.length}`,10,100);
        // dst.fillText(`items:${items.length}`,10,120);
    }
    GAME_LD.drawGame = drawGame;
    const DISEASE_WAIT = 5;
    let stepN = 0;
    let diseaseTimer = DISEASE_WAIT;
    let meteorTimer = 0;
    const SONG_LEN = 120;
    let backmusicTimer = 2;
    const OFF_BORD = GAME_CONFIG.SpawnerConfig.offscreen_dist + 100;
    function stepGame() {
        let delta = (new Date().getTime() - GAME_LD.lastFrame) / 1000;
        stepN++;
        for (let obj of objects) {
            obj.step(delta);
        }
        if (stepN % 50 == 0) {
            for (let cir of objects)
                if (cir.coordinates.x < -OFF_BORD || cir.coordinates.y < -OFF_BORD ||
                    cir.coordinates.x > LD_GLOB.canvas.width + OFF_BORD || cir.coordinates.y > LD_GLOB.canvas.height + OFF_BORD) {
                    GAME_LD.delCircleObject(cir);
                }
        }
        if (stepN % 10 == 0) {
            for (let pl of GAME_LD.planets) {
                // if(pl.coordinates.x<pl.radius && pl.velocity.x<0) pl.addVelocity(new Vector(-pl.velocity.x*1.3,0));
                // if(pl.coordinates.y<pl.radius && pl.velocity.y<0) pl.addVelocity(new Vector(0,-pl.velocity.y*1.3));
                // if(LD_GLOB.canvas.width-pl.coordinates.x<pl.radius && pl.velocity.x>0) pl.addVelocity(new Vector(-pl.velocity.x*1.3,0));
                // if(LD_GLOB.canvas.height-pl.coordinates.y<pl.radius && pl.velocity.y>0) pl.addVelocity(new Vector(0,-pl.velocity.y*1.3));
                if (pl.coordinates.x < pl.radius)
                    pl.addVelocity(new Vector(33, 0));
                if (pl.coordinates.y < pl.radius)
                    pl.addVelocity(new Vector(0, 33));
                if (LD_GLOB.canvas.width - pl.coordinates.x < pl.radius)
                    pl.addVelocity(new Vector(-33, 0));
                if (LD_GLOB.canvas.height - pl.coordinates.y < pl.radius)
                    pl.addVelocity(new Vector(0, -33));
            }
        }
        meteorTimer -= delta;
        if (meteorTimer < 0) {
            meteorTimer = Math.max(1, 4 - .5 * meteorSpawners.length) + Math.random() * 5;
            if (meteorSpawners.length > 0 && GAME_LD.meteors.length < GAME_LD.max_meteors)
                meteorSpawners[~~(Math.random() * meteorSpawners.length)].spawn();
        }
        diseaseTimer -= delta;
        if (diseaseTimer < 0) {
            diseaseTimer = Math.max(1, 10 - .7 * GAME_LD.diseasedPlanets.length) + Math.random() * 5;
            if (GAME_LD.diseasedPlanets.length > 0)
                launchDisease(GAME_LD.diseasedPlanets[~~(GAME_LD.diseasedPlanets.length * Math.random())]);
            else if (diseaseSpawners.length)
                diseaseSpawners[~~(Math.random() * diseaseSpawners.length)].spawn();
        }
        backmusicTimer -= delta;
        if (backmusicTimer < 0) {
            if (!GAME_LD.backsnd) {
                GAME_LD.backsnd = playSound('background', 1);
                if (GAME_LD.backsnd)
                    GAME_LD.backsnd.onended = () => { GAME_LD.backsnd = null; };
                backmusicTimer = SONG_LEN + 0;
            }
            else
                backmusicTimer += 10;
            console.log(`back`);
        }
        GAME_LD.lastFrame = new Date().getTime();
    }
    GAME_LD.stepGame = stepGame;
})(GAME_LD || (GAME_LD = {}));
//# sourceMappingURL=game.js.map