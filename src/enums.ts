/**
 * The different types a zombie can mutate into.
 */
export enum ZOMBIE_MUTATION_ID { 
    rage = 0
}

export enum PLAYER_HERO_ID  {
    theGlutton = FourCC('H001'),
}

export enum UNIT_IDS {
    rifleman = FourCC('hrif'),
    footman = FourCC('hfoo'),
    sapper = FourCC('ngsp'),
    paladin = FourCC('Hpal'),

    zombie = FourCC('n000'),
    abomination = FourCC('u000'),
    demonSeer = FourCC('O000'),
    banditLord = FourCC('nbld'),
    bandit = FourCC('nban'),
    banditAssassin = FourCC('nass'),
    banditBrigand = FourCC('nbrg'),
    orcCatapult = FourCC('ocat'),
    dwarfCart = FourCC('h00E'),
    peasant = FourCC('h00J'),
    mason = FourCC('h00I'),
    villagerLumberjack = FourCC('n009'),
    villagerElfFemale = FourCC('nhef'),
    villagerElfMale = FourCC('nhem'),

    treant = FourCC('efon'),
    earthernGoliath = FourCC("e002"),
    
    // customPaladin = FourCC('H000'),
    theGlutton = FourCC('H001'),
    heraldOfTheArcane = FourCC('H00M'),
    artifactPedestal = FourCC('h00O'),
}

export enum BUILDING_IDS {
    townHall = FourCC('h004'),
    castle = FourCC('h003'),
    keep = FourCC('h007'),
    orcFortress = FourCC('ofrt'),
    orcGreatHall = FourCC('ogre'),
    orcStrongHold = FourCC('ostr'),
    orcBarracks = FourCC('obar'),
    humanBarracks = FourCC('hbar'),
    arcaneObservatory = FourCC('haro'),
    farm = FourCC('hhou'),

}

export enum START_ITEM_IDS{
    ringOfDivinity = FourCC("I002"),
    eternalTango = FourCC("I001"),
    staffOfWildGrowth = FourCC("I003"),
}


export enum TOWN_UIDS {
    townHall = FourCC('h004'),
    orcGreatHall = FourCC('ogre'),
}

export enum MINIMAP_ICONS {
    neutralBuilding = 'UI\Minimap\MiniMap-NeutralBuilding.mdl',
    unit = 'UI\MiniMap\MiniMapIcon\MiniMapUnitIcon.mdl',
    controlPoint = 'UI\Minimap\MiniMap-ControlPoint.mdl'
}

export enum LANDMARK_IDS {
    heroicStatue = FourCC('h006'),
    heroicStatueShield = FourCC('h009'),
    theKeeper = FourCC('h008'),
}

export enum SHOP_UIDS {
    shop1 = FourCC('n002'),
    mercenaryCampLordaeron = FourCC('nmer'),
}

export enum ABILITY_ID {
    scry = FourCC('AHta'),
    curseOfWildGrowth = FourCC('A00D'),
    timeFreeze = FourCC('A00G'),
    demonCrownDarkPortal = FourCC("A00L"),
    demonCrownCreate = FourCC("A00K"),
    demonCrownSacrificePeasant = FourCC("A00M")
}

export enum SHRIFT_ABILITIES {
    //"U" The unbound
    theUnbound = FourCC('A000'),
    //"G" The glutton - adds all the stats of the devoured target to the user.
    theGlutton = FourCC("A001"),
    _theGluttonCargo = FourCC("A002"),
    //"F" - spawn trees that stun units, then treants spawn.
    // theForest = FourCC("A001"),
}

export const ABILITY_SETS = {
    A : [SHRIFT_ABILITIES.theGlutton, SHRIFT_ABILITIES.theUnbound]
}

/**
 * Custom unit ids
 */
export enum CUSTOM_UID {
    soul = FourCC('e001'),
    positionalTarget = FourCC('h005')
}

export enum TERRAIN_CODE {
    //Lordaeron Summer - 12 prefix
    dirt = 1281651316,
    grass = 1281847923,
    darkGrass = 1281847908,
    grassyDirt = 1281651303,
    roughDirt = 1281651311,
    rocks = 1282568043,
    //Village Tileset - 14 prefix
    stonePath = 1450407024,
    cobblePath = 1449353840,
    crops = 1449357936,
    //Nope
    // blightMaybe = 12816513,
    // blight_ = 1282568043
}
/**
 *  "Terrain 0 number:, 1281651316Terrain 1 number:, 1282568043Terrain 2 number:, 1281651311Terrain 3 number:, 1281651311Terrain 4 number:, 1281651311Terrain 5 number:, 1281651316Terrain 6 number:, 1281651316Terrain 7 number:, 1281651316Terrain 8 number:, 12816513" )
	call Preload( "16Terrain 9 number:, 1281651316"
 * 
 */

export enum SHAPE_CODE {
    circle = 0,
    square = 0,
}

export enum DESTRUCTABLE_ID {
    winterTree = FourCC('WTtw'),
    summerTree = FourCC('LTlt'),
    volcano = FourCC('Volc'),
    outlandTreeWall = FourCC('OTtw'),
    
    orgrimmarGate = FourCC('YTcn'),
    //Current usage
    // rock = FourCC('B001'),
    damagedShip = FourCC('NTbd'),
    originSpawn = FourCC('B002'), 
    attemptedOriginSpawn = FourCC('B003'), 

    rock = FourCC('B004'),
    flowers = FourCC('B000'),
    shrubs = FourCC('B001'),
    // testRock = FourCC('B001'),
}

export enum UPGRADE_ID {
    demonCrownSacrifice = FourCC("R003")
}

export const TERRAIN_VARIANCES = {
    1281651316 : 18,
    1281847923 : 18,
    1281847908 : 18,
    1281651303 : 18,
    1281651311 : 18,
    1282568043 : 18,
    1449357936 : 18,
    1450407024 : 2,
    1449353840 : 2,
} 

export enum ITEM_ID{
    eternalTango = FourCC('I001'),
    demonCrown = FourCC('I004'),
}

/**
 * Subset of special items from set of all items.
 */
export const artifactItemIdSet = new Set([ITEM_ID.demonCrown]);

/**
 * Set of entities that players can capture.
 */
export const capturableUnitIdSet = new Set([
    BUILDING_IDS.townHall, 
    BUILDING_IDS.orcGreatHall, 
    LANDMARK_IDS.heroicStatue, 
    LANDMARK_IDS.heroicStatueShield, 
    LANDMARK_IDS.theKeeper,
]);

export const economyUnitIncomes = {
    town: 50,
    villager: 5
}

/**
 * Used to identify which unit types can provide periodic income and how much income they provide per unit
 */
export const economyUnitSet = new Set([
    {
        code: BUILDING_IDS.townHall,
        income: economyUnitIncomes.town,
        alias: "Town"
    },
    {
        code: UNIT_IDS.villagerElfFemale,
        income: economyUnitIncomes.villager,
        alias: "Villager"
    },
    {
        code: UNIT_IDS.villagerElfMale,
        income: economyUnitIncomes.villager,
        alias: "Villager"
    },
    {
        code: UNIT_IDS.villagerLumberjack,
        income: economyUnitIncomes.villager,
        alias: "Villager",
    },

]);

export const economyUnitCodes = new Set([BUILDING_IDS.townHall, UNIT_IDS.villagerElfFemale, UNIT_IDS.villagerElfMale, UNIT_IDS.villagerLumberjack])

/**
 * "Terrain 0 number:, 1281651316
 * Terrain 1 number:, 1281847923Terrain 2 number:, 1281847908Terrain 3 number:, 1281651303Terrain 4 number:, 1281651311Terrain 5 number:, 1281651316
 * Terrain 6 number:, 1281651316Terrain 7 number:, 1281651316Terrain 8 number:, 12816513"
 */
