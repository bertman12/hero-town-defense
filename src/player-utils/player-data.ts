import { UPGRADE_ID } from './../enums';
import { townsCreated } from "../mapGenerator";
import { ABILITY_ID, ITEM_ID } from "../enums";
import { Item, MapPlayer, Trigger, Unit } from "w3ts";

export const playerStates = new Map<number, PlayerState>();

//Keeps track of a particular player's state
export class PlayerState {

    artifactNames: ArtifactName[] = [];
    artifactItemsOwned: Item[] = [];

    constructor(public player: MapPlayer){}

    addArtifact(artifactName: keyof typeof artifactDataSheet, equippingUnit: Unit){
        //When you add an artifact, setup the trigger for the artifact pedestal for the
        this.artifactNames.push(artifactName);
        this.initializeArtifact(artifactName, equippingUnit);
        
    }

    private initializeArtifact(artifactName: ArtifactName,  equippingUnit: Unit){
        artifactDataSheet[artifactName].artifactPedestalEquipTrigger(this.player, equippingUnit);
    }

    private removeArtifact(artifactName: keyof typeof artifactDataSheet){

    }

}

//This object will keep track of the artifact and it's associated affects

/**
 * Anything relevant to the function or what an artifact does ought to be stored here.
 */
type ArtifactName = keyof typeof artifactDataSheet;

/**
 * Artifact Constants
 */
const artifactDataSheet = {
    demonCrown: {
        artifactItemNumber: ITEM_ID.demonCrown,
        artifactCreationAbilityId: ABILITY_ID.demonCrownCreate,
        pedestalEquipAbility: ABILITY_ID.demonCrownDarkPortal,
        artifactHeroEquipTrigger: (player: MapPlayer) => null,
        artifactHeroUnequipTrigger: (player: MapPlayer) => null,
        artifactPedestalEquipTrigger: demonCrownPedestalEquipTrigger,
        artifactPedestalUnequipTrigger: (player: MapPlayer) => null,
        artifactDestructionTrigger: (player: MapPlayer) => null,
    },
}

function demonCrownPedestalEquipTrigger(this: typeof artifactDataSheet.demonCrown, player: MapPlayer, equippingUnit: Unit){
    //Add the dark portal ability to all towns
    print("demon crown pedestal equip trigger");

    townsCreated.forEach(town => {
        if(town.owner === player){
            town.addAbility(this.pedestalEquipAbility);
            print("Found a player owner for the town, adding demon crown ability");
        }
    });

    player.addTechResearched(UPGRADE_ID.demonCrownSacrifice, 1);


    let t = Trigger.create();

        t.registerUnitEvent(equippingUnit, EVENT_UNIT_PICKUP_ITEM);
        
        t.addAction(() => {
            let u = Unit.fromEvent();
        });
}

function trackArtifactHolder(){
    //Depending on who holds the artifact, a trigger ought to be set.
    let i = Item.create(0,0,0);
    
}