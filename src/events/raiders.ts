import { generateRandomName } from '../utils/names';
import { UNIT_IDS } from "../enums";
import { getRandomPointInMap, getRandomDirection } from "../utils/points";
import { Group, Item, Point, Timer, Unit } from "w3ts";
import { Players } from "w3ts/globals";
import { OrderId } from "w3ts/globals/order";
import { Units } from 'war3-objectdata-th';

/**
 * @todo in the future, configure the number of units spawned based on map time/player state.
 */
export function spawnRaiders(){
    let spawn = getRandomPointInMap(); 
    
    let g = new Group();

    let bl = new Unit(Players[20], UNIT_IDS.banditLord, spawn.x, spawn.y, 0);
    
    let bl_name = generateRandomName('Unit');

    bl.name += ` ${bl_name}`;

    //cloak of flames    
    bl.addItemById(FourCC('clfm'));
    //orb of darkness
    bl.addItemById(FourCC('odef'));

    g.addUnit(bl);

    for (let x = 0; x < 5; x++) {
        g.addUnit(new Unit(Players[20], UNIT_IDS.bandit, spawn.x, spawn.y, 0));
    }

    for (let x = 0; x < 3; x++) {
        g.addUnit(new Unit(Players[20], UNIT_IDS.banditBrigand, spawn.x, spawn.y, 0));
    }
    
    for (let x = 0; x < 2; x++) {
        g.addUnit(new Unit(Players[20], UNIT_IDS.banditAssassin, spawn.x, spawn.y, 0));
    }
    
    let firstAttackPoint = getRandomPointInMap();
    
    g.orderPoint(OrderId.Attack, firstAttackPoint);

    let randomTimeOffset = Math.floor(Math.random()*10);

    // print(`Lord ${bl_name} and his raiders are pillaging the lands!`);
    new Timer().start(10 + randomTimeOffset , true, () => {
        g.orderPoint(OrderId.Attack, getRandomPointInMap());
    });

}

const zombieSet_1 = [
    {
        creepTypeCode: UNIT_IDS.zombie,
        count: 15
    }
];

/**
 * abstract the spawn enemy function to randomly decide an enemy event config object then use that 
 * Make function to add random items to an enemy boss 
 */
export function spawnWanderingCreeps(creepSet?: {creepTypeCode: number, count: number}[]){
    let spawn = getRandomPointInMap();

    let g = new Group();
    
    print("A plague has caused zombies to rise and attack...");

    zombieSet_1.forEach(cSet => {
        for (let x = 0; x < cSet.count; x++) {
            g.addUnit(new Unit(Players[20], cSet.creepTypeCode, spawn.x, spawn.y, 0))
        }
    });

    let firstAttackPoint = getRandomPointInMap();
    
    g.orderPoint(OrderId.Attack, firstAttackPoint);

    new Timer().start(10, true, () => {
        // print("Group size: ",g.size);
        g.orderPoint(OrderId.Attack, getRandomPointInMap());
    });

}