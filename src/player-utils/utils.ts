import { File, Point, Trigger, Unit, MapPlayer, Camera } from "w3ts";
import { Players } from "w3ts/globals";
import { BUILDING_IDS, capturableUnitIdSet, CUSTOM_UID, TERRAIN_CODE, UNIT_IDS } from "../enums";
// import { townsCreated } from "dynamicCreation";
import { PlayerState, playerStates } from "./player-data";

export let userPlayers = 0;

export const userPlayerIndexes:number[] = [];

const defenderSpawnCoords = {
    x: -15880,
    y: -16400
}

const attackerSpawnCoords = {
    x: 16500,
    y: -16850
}

export function getUsersPlaying(): MapPlayer[]{
    let arr:MapPlayer[] = [];

    Players.forEach((player) => {
        if(player.slotState === PLAYER_SLOT_STATE_PLAYING && (player.controller === MAP_CONTROL_USER)){
            arr.push(player);
        }
    });

    return arr;
}

export function forEachPlayerPlaying(cb: (player: MapPlayer) => void){
    Players.forEach((player) => {
        if(player.slotState === PLAYER_SLOT_STATE_PLAYING && (player.controller === MAP_CONTROL_USER)){
            cb(player);
        }
    });
}

export function initializePlayers(){
    //Register Triggers
    trig_controlTown();
    trig_checkFarmPlacement();


    //Give start resources
    Players.forEach((player, playerIndex) => {

        // SetPlayerUnitAvailableBJ(FourCC('h00J'), false, player.handle);
        // SetPlayerUnitAvailableBJ(FourCC('h00I'), false, player.handle);
        // playerStates.set(player.id, new PlayerState(player));

        player.setState(PLAYER_STATE_GIVES_BOUNTY, 1);
        player.setAlliance(Players[25], ALLIANCE_PASSIVE, true);

        if(player.slotState === PLAYER_SLOT_STATE_PLAYING && player.isPlayerAlly(Players[0]) && (player.controller === MAP_CONTROL_USER)){
            if(player.team === 0) {
                handleDefenderInitialization(player, playerIndex);
            }
            else if(player.team === 1){
                handleAttackerInitialization(player, playerIndex)
            }
        }
    });
}

//Move camera too
function trig_moveTrainedHeroToStartLoc(player: MapPlayer){
    let trigger = new Trigger()

    trigger.registerAnyUnitEvent( EVENT_PLAYER_UNIT_SELL)

    trigger.addAction(() => {
        print("Moved unit to the center of map!");
        let buyingUnit = Unit.fromHandle(GetBuyingUnit()) as Unit;
        print("Buying unit: ", buyingUnit.name);
        buyingUnit.kill();
        let createdUnit = Unit.fromHandle(GetSoldUnit()) as Unit;
        createdUnit.x = 0;
        createdUnit.y = -350;
        print("Created unit: ",createdUnit.name);
    });
}

function handleDefenderInitialization(player: MapPlayer, playerIndex: number){
    userPlayers++;

    userPlayerIndexes.push(playerIndex);

    player.setState(PLAYER_STATE_RESOURCE_GOLD, 500);
    player.setState(PLAYER_STATE_RESOURCE_LUMBER, 500);
    
    // trig_moveTrainedHeroToStartLoc(player);

    // new Unit(player, CUSTOM_UID.soul, defenderSpawnCoords.x, defenderSpawnCoords.y, 0);
}

function handleAttackerInitialization(player: MapPlayer, playerIndex: number){
    userPlayers++;

    userPlayerIndexes.push(playerIndex);

    player.setState(PLAYER_STATE_RESOURCE_GOLD, 1000);
    player.setState(PLAYER_STATE_RESOURCE_LUMBER, 500);
    // player.setState(PLAYER_STATE_RESOURCE_FOOD_CAP, 25);
    
    // trig_moveTrainedHeroToStartLoc(player);

    // new Unit(player, CUSTOM_UID.soul, attackerSpawnCoords.x, attackerSpawnCoords.y, 0);
}

/**
 * 
 */
function trig_controlTown(){
    let t = new Trigger();
    t.registerAnyUnitEvent(EVENT_PLAYER_UNIT_ATTACKED);

    t.addCondition(() => {
        //Works
        let u = Unit.fromHandle(GetAttackedUnitBJ())  as Unit;
        let a = Unit.fromHandle(GetAttacker())  as Unit;
        
        //Works
        // print(u.typeId, u.name);
        //Check by unit id instead of type
        if(capturableUnitIdSet.has(u.typeId) && (u.life < (0.20*u.maxLife))){
            u.setOwner(a.owner, true);
            u.life = u.maxLife;
        }

        // if(u.isUnitType(UNIT_TYPE_STRUCTURE) && u.isUnitType(UNIT_TYPE_TOWNHALL) && u.life < (0.20*u.maxLife)){
        //     u.setOwner(a.owner, true);
        //     u.life = u.maxLife;
        // }

        return true;
    })
}

/**
 * Ensures farms are only placed on crop tiles.
 */
function trig_checkFarmPlacement(){
    let t  = new Trigger();
    t.registerAnyUnitEvent(EVENT_PLAYER_UNIT_CONSTRUCT_START);
    
    t.addCondition(() => {
        //Get the building being built
        let u = Unit.fromEvent()  as Unit;

        // print("The unit: ", u.name);
        //Prints a message as a player.
        // BlzDisplayChatMessage(u.owner.handle, 0, 'Test');

        if(u.typeId === BUILDING_IDS.farm && GetTerrainType(u.x, u.y) === TERRAIN_CODE.crops){
            return true;
        }
        else if(u.typeId === BUILDING_IDS.farm && GetTerrainType(u.x, u.y) != TERRAIN_CODE.crops){
            let g = GetUnitGoldCost(u.typeId);
            let w = GetUnitWoodCost(u.typeId);

            let p = u.owner;

            adjustPlayerGoldAndLumber(p, g, w);

            print(`Farm must be built on farm land. Refunding ${g} gold and ${w} wood.`);
            u.destroy();
        }
        else if(u.typeId !== BUILDING_IDS.farm && GetTerrainType(u.x, u.y) === TERRAIN_CODE.crops){
            let g = GetUnitGoldCost(u.typeId);
            let w = GetUnitWoodCost(u.typeId);

            print(`Unable to build on farm land. Refunding ${g} gold and ${w} wood.`);
            let p = u.owner;
            
            adjustPlayerGoldAndLumber(p, g, w);
       
            u.destroy(); 
        }
        
        return false;
    });

}

export function adjustPlayerGoldAndLumber(player:MapPlayer, gold: number, lumber: number){
    if(player){
        if(gold) AdjustPlayerStateSimpleBJ(player.handle, PLAYER_STATE_RESOURCE_GOLD, gold);
        if(lumber) AdjustPlayerStateSimpleBJ(player.handle, PLAYER_STATE_RESOURCE_LUMBER, lumber);
        // print("Player state adjusted!");
    }
    else{
        print("Cannot add gold/wood for null player!"); 
    }

    return;
}
