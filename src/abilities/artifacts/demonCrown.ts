import { ABILITY_ID, ITEM_ID, UPGRADE_ID } from "src/enums";
import { townsCreated } from "src/mapGenerator";
import { Trigger, Unit, Item } from "w3ts";
import { ARTIFACT_CONSTANTS } from "./artifact_constants";

export function demonCrownSetup(){
    trig_create_item();
    trig_sacrificePeasant();
}

function trig_create_item(){
    let t  = Trigger.create();
    
    t.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT);

    t.addCondition(() => {
        let castUnit = Unit.fromEvent() as Unit;
        if(GetSpellAbility() === castUnit.getAbility(ABILITY_ID.demonCrownCreate)){
            print("Demon crown was created!");
            return true;
        }

        return false;
    });

    t.addAction(() => {
        let artifactPedestal = Unit.fromEvent() as Unit;
        //add item to the unit inventory
        let item = new Item(ITEM_ID.demonCrown, 0,0);
        artifactPedestal.addItem(item);
        print("Item was created and added to pedestal.");
    });
}

function trig_sacrificePeasant(){
    let t  = Trigger.create();
    
    t.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT);

    t.addCondition(() => {
        let castUnit = Unit.fromEvent() as Unit;

        if(GetSpellAbility() === castUnit.getAbility(ABILITY_ID.demonCrownSacrificePeasant)){
            return true;
        }

        return false;
    });

    t.addAction(() => {
        let u = Unit.fromEvent() as Unit;
        u.kill();

        // nslm nkob nska nsty nspr nubk nspd uske uskm nvdl
        const randomChoice = ["nslm", "nkob", "nska", "nsty", "nspr", "nubk", "nspd", "uske", "uskm", "nvdl"];
        const choice = Math.floor(math.random(0,randomChoice.length));
        
        const demon = Unit.create(u.owner, FourCC(randomChoice[choice]), u.x, u.y);
        if(demon) demon.name = randomChoice[choice];
    
    });
}

export function trig_pedestalEquip(equippingUnit: Unit){
    //Add the dark portal ability to all towns
    print("Demon crown pedestal equip trigger");

    let player = equippingUnit.owner;

    townsCreated.forEach(town => {
        if(town.owner === player){
            town.addAbility(ARTIFACT_CONSTANTS[ITEM_ID.demonCrown].pedestalEquipAbility);
            print("Found a player owner for the town, adding demon crown ability");
        }
    });

    player.addTechResearched(UPGRADE_ID.demonCrownSacrifice, 1);
}
