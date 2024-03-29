import { UNIT_IDS, UPGRADE_ID, artifactItemIdSet} from './../enums';
import { townsCreated } from "../mapGenerator";
import { ABILITY_ID, ITEM_ID } from "../enums";
import { Item, MapPlayer, Trigger, Unit } from "w3ts";

export const playerStates = new Map<number, PlayerState>();

//Keeps track of a particular player's state
export class PlayerState {

    // artifactNames: ArtifactType[] = [];
    artifactItemsOwned: Item[] = [];

    constructor(public player: MapPlayer){}

    // addArtifact(artifactType: ArtifactType, equippingUnit: Unit){
    //     //When you add an artifact, setup the trigger for the artifact pedestal for the
    //     this.artifactNames.push(artifactType);
    //     this.initializeArtifact(artifactType, equippingUnit);
        
    // }

    // private initializeArtifact(artifactName: ArtifactType,  equippingUnit: Unit){
    //     ARTIFACT_CONSTANTS[artifactName].artifactPedestalEquipTrigger(equippingUnit);
    // }

    // private removeArtifact(artifactName: ArtifactType){

    // }

}

//This object will keep track of the artifact and it's associated affects

// /**
//  * Anything relevant to the function or what an artifact does ought to be stored here.
//  */
type ArtifactType = keyof typeof ARTIFACT_CONSTANTS;

type ArtifactHostTransitionFn = (unit: Unit) => void;

// /**
//  * Artifact Constants
//  */
const ARTIFACT_CONSTANTS = {
    [ITEM_ID.demonCrown]: {
        artifactItemNumber: ITEM_ID.demonCrown,
        artifactCreationAbilityId: ABILITY_ID.demonCrownCreate,
        pedestalEquipAbility: ABILITY_ID.demonCrownDarkPortal,
        artifactHeroEquipTrigger: (unit: Unit) => null,
        artifactHeroUnequipTrigger: (unit: Unit) => null,
        artifactPedestalEquipTrigger: demonCrownPedestalEquipTrigger as ArtifactHostTransitionFn,
        artifactPedestalUnequipTrigger: (unit: Unit) => null,
        artifactDestructionTrigger: () => {},
    },
}

function demonCrownPedestalEquipTrigger(equippingUnit: Unit){
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

// /**
//  * There may exists several artifacts at any time that span many different holders across time.
//  * 
//  * I want to track who is holding an artifact and apply the artifact bonus appropriately. 
//  */

const acquiredArtifactInstancesSet = new Set<Item>();


// /**
//  * Setup at game start
//  * 
//  * Watches the transfer of artifacts from owner to owner.
//  */
export function setup_trackArtifactHolders(){
    //Depending on who holds the artifact, a trigger ought to be set.
    //We need to know the currently holder of the artifact. 
    //Then we listen to the item unequipped event and
    //Or we listen to any item equipped event, and if the item equipped is an item artifact instance, then we set that equipping unit to be the holder and apply the bonuses for the correct player.
    
    //When an artifact is created we track the item, 
    //we check a list of artifacts to see if the item is an artifact, if so then we store it in memory. 
    //If it's sold or destroyed, then it's reference is removed from memory.
    
    print("setup_trackArtifactHolders has ran!");
    let trig_artifactHostAcquisition = Trigger.create();

    trig_artifactHostAcquisition.registerAnyUnitEvent(EVENT_PLAYER_UNIT_PICKUP_ITEM);

    trig_artifactHostAcquisition.addCondition(() => itemIsArtifact(Item.fromEvent()));

    trig_artifactHostAcquisition.addAction(() => {
        let item = Item.fromEvent();

        if(!item) return;
        print("Host acquire trig action.")

        artifactHostEventTransitionAction("acquire")
    })

    let trig_artifactHostLoss = Trigger.create();

    trig_artifactHostLoss.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DROP_ITEM);
    trig_artifactHostLoss.registerAnyUnitEvent(EVENT_PLAYER_UNIT_PAWN_ITEM);
    trig_artifactHostLoss.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SELL_ITEM);
    
    trig_artifactHostLoss.addCondition(() => itemIsArtifact(Item.fromEvent()));

    trig_artifactHostLoss.addAction(() => {
        let item = Item.fromEvent();

        if(!item) return;
        print("Host loss trig action.")

        artifactHostEventTransitionAction("removal")
    })

//     //Artifact removal trigger ...

}

function itemIsArtifact(item: Item | undefined){
    print("Checking if item is artifact!", item?.name, item?.typeId);
    print("Demon crown item ID from enum: ", ITEM_ID.demonCrown);
    // print("Item type id from the item itself");

   return item ? artifactItemIdSet.has(item.typeId) : false;
}

function artifactHostEventTransitionAction(transitionEvent: "acquire" | "removal"){
    let item = Item.fromEvent();
    let unit = Unit.fromEvent();
    
    print("Artifact Host Transition Event!");

    if(!unit || !item) return;

    print("Unit and Item confirmed");
    print(transitionEvent);

    let heroFn: ArtifactHostTransitionFn = () => {};
    let pedestalFn: ArtifactHostTransitionFn = () => {};

    switch (transitionEvent) {
        case "acquire":
            heroFn = ARTIFACT_CONSTANTS[item.typeId].artifactHeroEquipTrigger
            pedestalFn = ARTIFACT_CONSTANTS[item.typeId].artifactPedestalEquipTrigger
            break;
        case "removal":
            heroFn = ARTIFACT_CONSTANTS[item.typeId].artifactHeroUnequipTrigger
            pedestalFn = ARTIFACT_CONSTANTS[item.typeId].artifactPedestalUnequipTrigger
            break;
        default:
            break;
    }

    //Adding the artifact to our acquired collection
    acquiredArtifactInstancesSet.add(item);

    //If it's a hero, then apply artifact's hero equip effect for the holder
    if(unit.isHero()){
        print("Hero fn called!");
        heroFn(unit);
    }
    
    //If it's not a hero, check if it's the pedestal unit that is holding the artifact
    if(unit.typeId === UNIT_IDS.artifactPedestal){
        print("Pedestal fn called!");
        pedestalFn(unit);
    }

}