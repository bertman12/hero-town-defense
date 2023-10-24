import { Destructable, File, FogModifier, Group, Point, Timer, TimerDialog, Trigger, Unit, Widget, Handle, Effect, TextTag } from "w3ts";
import { Players } from "w3ts/globals";
import { OrderId } from "w3ts/globals/order";
import { addScriptHook, W3TS_HOOK } from "w3ts/hooks";
import { UNIT_IDS, ZOMBIE_MUTATION_ID, SHRIFT_ABILITIES } from "./enums";
import { entities } from "./mapGenerator";
import { checkDestructablesInRegion } from "./utils/terrain";
import { spawnDemonSeer } from "./events/demonSeer";
import { spawnRaiders, spawnWanderingCreeps } from "./events/raiders";
import { spawnGoliath } from "./events/goliath";

/**
 * Player 21 = Attacker forces.
 */

/**
 * The round count will be used to modify the base zombie stats when they are spawned.
 */
let waveCount = 0;
// let waveTag:TextTag;

export function initAttackerForces(){
    print("Attacker forces imminent!");

    spawnDemonSeer();

    spawnRaiders();
    // spawnRaiders();
    // spawnRaiders();


    //fuck up the players
    new Timer().start(45, true, () => {
      spawnGoliath();
    })

    new Timer().start(60, true, () => {
      spawnWanderingCreeps();
    })

    

    // spawnEnemyForce();
    // let waveTimer = new Timer();
    // waveTimer.start(30, true, handleSpawnEnemyWave);
}

function handleSpawnEnemyWave(){
    // waveTag.setText(`Wave: ${waveCount} `, 0, false);

    for (let x = 0; x <= waveCount; x++) {
      spawnEnemy(UNIT_IDS.zombie);
      
      //Spawns abom every 3 waves after wave 5 and only on odd waves counts
      if((waveCount > 5) && !(waveCount%3)){
        spawnEnemy(UNIT_IDS.abomination);
      }
    }
    
    print(`Incoming wave ${waveCount}`);
    waveCount++;
    
}

function spawnEnemy(unitId: number){

    let unit = new Unit(Players[12], unitId, -1000,0,0);

    unit.name += ` - Round ${waveCount}`;

    unit.issuePointOrder(OrderId.Attack, new Point(0,0));

    unit.maxLife += waveCount*25;
    unit.life += waveCount*25;

    //Adds 1 armor every 2 waves
    unit.armor += Math.floor(waveCount/2);

    let randomNumber = Math.random()*10;

    if(randomNumber > 9){
      mutateEnemy(unit)
    }

}

function mutateEnemy(unit: Unit){
    print("MUTATED ZOMBIE CREATED!!!!");
  
    unit.maxLife += 600;
    
    unit.life += 600;
    
    unit.setScale(1.5, 0, 0);
  
    unit.setVertexColor(255, 0, 0, 255);
  
    unit.setAttackCooldown(0.8, 0);
  
    unit.armor += 12;
  
    unit.moveSpeed += 100;
  
    unit.name = `Mutated Zombie - Round ${waveCount}`;
}

const enemySpawnPoint = {
  x: -6350,
  y: -13550 
}

export function spawnEnemyForce(){
  let group = new Group();  
  
  for (let x = 0; x < 10; x++) {
      let unit = new Unit(Players[20], UNIT_IDS.abomination, enemySpawnPoint.x, enemySpawnPoint.y, 0);
      group.addUnit(unit);
  }

  group.orderPoint(OrderId.Attack, new Point(0,0));
  // SetTerrainType(0,0, 0,0,1200,0);
}

