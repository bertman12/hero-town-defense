import { Destructable, File, FogModifier, Group, Point, Timer, TimerDialog, Trigger, Unit, Widget, Handle, Effect, Color, Item } from "w3ts";
import { Players } from "w3ts/globals";
import { UNIT_IDS, ZOMBIE_MUTATION_ID, SHRIFT_ABILITIES, ABILITY_ID, DESTRUCTABLE_ID, ITEM_ID } from "./enums";
import { OrderId } from "w3ts/globals/order";
import { playerStates } from "./player-utils/player-data";

export function setupAbilityTriggers(){
    trig_catastrophicBlink();
    trig_theGlutton();
    trig_CurseOfWildGrowth();
    trig_timeFreeze();
    trig_createDemonCrown();
    trig_demonCrown_sacrificePeasant();
}

function trig_catastrophicBlink(){  
    let trigger = new Trigger();
    
    trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT);

    trigger.addCondition(() => {
        let castUnit = Unit.fromEvent() as Unit;

        if(GetSpellAbility() === castUnit.getAbility(SHRIFT_ABILITIES.theUnbound)){
            return true;
        }

        return false
    });

    trigger.addAction(() => {
        //Select units in range of the caster;
        let castUnit = Unit.fromEvent() as Unit;
        let affectedUnits = new Group()
        let abilityLevel = castUnit.getAbilityLevel(SHRIFT_ABILITIES.theUnbound) ;

        //Play spell effect regardless of enemies being nearby
        let spellEffect = new Effect('Abilities\Spells\Human\Thunderclap\ThunderClapCaster.mdl', GetSpellTargetX(), GetSpellTargetY());
        spellEffect.scale = abilityLevel;
        spellEffect.playAnimation(ANIM_TYPE_SPELL);

        affectedUnits.enumUnitsInRange(GetSpellTargetX(), GetSpellTargetY(), 200 + 100*abilityLevel,  () => {
            let unit = Group.getFilterUnit() as Unit;
            
            if(!unit.isAlly(Players[0])){
                castUnit.damageTarget(unit.handle, 100 * abilityLevel, false, false, ATTACK_TYPE_HERO, DAMAGE_TYPE_NORMAL, WEAPON_TYPE_WHOKNOWS)
            }

            // let effect = new Effect('Abilities\Spells\Human\Thunderclap\ThunderClapCaster.mdl', GetSpellTargetX(), GetSpellTargetY());
            // effect.scale = castUnit.getAbilityLevel(SHRIFT_ABILITIES.theUnbound);
            // effect.playAnimation(ANIM_TYPE_SPELL);
            
            return true;    
        })
    });
}

let devouredUnits = 0;

/**
 * @todo show a tooltip of gained stats
 */
function trig_theGlutton(){
    let trigger = new Trigger()
    trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT);

    
    trigger.addCondition(() => {
        let castUnit = Unit.fromEvent() as Unit;

        if(GetSpellAbility() === castUnit.getAbility(SHRIFT_ABILITIES.theGlutton)){
            return true;
        }

        return false;
    })

    trigger.addAction(() => {

        //Select units in range of the caster;
        let castUnit = Unit.fromEvent() as Unit;

        let targetedUnit = Unit.fromHandle(GetSpellTargetUnit()) as Unit; 

        devouredUnits++;

        castUnit.maxLife += Math.ceil(targetedUnit.maxLife*0.1);
        castUnit.maxMana += Math.ceil(targetedUnit.maxMana*0.1);
        castUnit.setBaseDamage(castUnit.getBaseDamage(0) + targetedUnit.getBaseDamage(0),0);
        castUnit.armor += Math.ceil(targetedUnit.armor*0.10);
        castUnit.moveSpeed += Math.ceil(targetedUnit.moveSpeed*0.1);

        // castUnit.turnSpeed -= castUnit.turnSpeed*0.1;

        castUnit.setScale(1 + devouredUnits*0.25, 0, 0);
        
    });
}

/**
 * Cast entangle on all units in an area, then spawn a tree on the unit that will kill them instantly.
 */
function trig_CurseOfWildGrowth(){

    let t  = new Trigger();

    t.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT);

    t.addCondition(() => {
        let castUnit = Unit.fromEvent() as Unit;

        if(GetSpellAbility() === castUnit.getAbility(ABILITY_ID.curseOfWildGrowth)){
            print("Curse of wild growth used!");
            print("The caster: ",castUnit.name);

            let target = Unit.fromHandle(GetSpellTargetUnit()) as Unit;

            print("Curse target: ",target.name);

            return true;
        }

        return false;
    });

    t.addAction(() => {
        let castUnit = Unit.fromEvent() as Unit;
        
        castUnit.setVertexColor(100, 100, 100, 255);
        print("Your soul darkens...");

        let target = Unit.fromHandle(GetSpellTargetUnit()) as Unit;

        //Create the tree at target
        let d = new Destructable(DESTRUCTABLE_ID.summerTree, target.x, target.y, GetLocationZ(Location(target.x, target.y)), 0, 1, 0);
        
        d.setAnim('birth');

        //Create blight at target
        SetBlight(Players[24].handle, target.x, target.y, 260, true);

        let u = new Unit(Players[24], UNIT_IDS.treant, target.x, target.y,0);
        //Make treant invulnerable
        u.invulnerable = true;
        
        u.setScale(2,0,0);

        u.name = `${new Color(255, 0,0,255).code} Demon Treant|r`;

        u.setVertexColor(50,50,50,125);
        u.setAttackCooldown(0.2, 0);

        //Play evil laugh because you are evil.
        PlaySoundOnUnitBJ(gg_snd_SargerasLaugh, 100, castUnit.handle);

        //Make treant attack the unit
        u.issueTargetOrder(OrderId.Attack, target);

        new Timer().start(6, false, () => {
            ExplodeUnitBJ(u.handle);
        })

    });

}

function trig_timeFreeze(){
    let t  = new Trigger();

    t.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT);

    t.addCondition(() => {
        let castUnit = Unit.fromEvent() as Unit;

        if(GetSpellAbility() === castUnit.getAbility(ABILITY_ID.timeFreeze)){
            print("Time freeze used!");
            print("The caster: ",castUnit.name);

            let target = Unit.fromHandle(GetSpellTargetUnit()) as Unit;

            print("Curse target: ",target.name);

            return true;
        }

        return false;
    });

    t.addAction(() => {
        let castUnit = Unit.fromEvent();

        let target = Unit.fromHandle(GetSpellTargetUnit()) as Unit;
        //Give target blue tint
        target.setVertexColor(200, 0, 255, 100);

        target.paused = true;
        target.invulnerable = true;

        SetUnitTimeScale(target.handle, 0);

        let timer = new Timer().start(10, false, () => {
            target.paused = false;
            target.setVertexColor(255, 255, 255, 255);
            target.invulnerable = false;
            
            SetUnitTimeScale(target.handle, 1);
            
            timer.destroy();
        });
    
        PlaySoundOnUnitBJ(gg_snd_CharmTarget1, 100, target.handle);
    });
}

function trig_createDemonCrown(){
    let t  = new Trigger();
    
    t.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT);

    t.addCondition(() => {
        let castUnit = Unit.fromEvent() as Unit;
        if(GetSpellAbility() === castUnit.getAbility(ABILITY_ID.demonCrownCreate)){
            print("demon crown was cast!");
            return true;
        }

        return false;
    });

    t.addAction(() => {
        let artifactPedestal = Unit.fromEvent() as Unit;
        //add item to the unit inventory
        let p = artifactPedestal.owner;
        let item = new Item(ITEM_ID.demonCrown, 0,0);
        artifactPedestal.addItem(item);

        playerStates.get(p.id)?.addArtifact("demonCrown", artifactPedestal)
        
        print("Player state updated for ", p.name, ". Demon Crown added to player artifacts.");
    });
}

function trig_demonCrown_sacrificePeasant(){
    let t  = new Trigger();
    
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