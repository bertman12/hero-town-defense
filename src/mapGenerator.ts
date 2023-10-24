import { DestructableConfig, EntityType, TileConfig } from './models';
import { ITEM_ID, LANDMARK_IDS, MINIMAP_ICONS, SHOP_UIDS, START_ITEM_IDS, TERRAIN_VARIANCES, TOWN_UIDS } from './enums';
import { destructableSets, ENTITY_COUNT, TILE_WIDTH } from "./gameConstants";
import { BUILDING_IDS, DESTRUCTABLE_ID, TERRAIN_CODE, UNIT_IDS } from "./enums";
import { GeneratedEntity } from "./models";
import { generateRandomName } from "./utils/names";
import { createPointCluster_Simple, getRandomPointInMap } from "./utils/points";
import { Camera, Destructable, FogModifier, Point, Rectangle, Timer, Unit } from "w3ts";
import { Players } from "w3ts/globals";
import { tileSets } from './gameConstants';
import { chooseRandomEnumValue } from './utils/enumUtils';
import { getUsersPlaying } from './player-utils/utils';
import { checkDestructablesInRegion } from './utils/terrain';

/**
 * All Towns created
 */
export const townsCreated:Unit[] = []

/**
 * Track all entities during creation.
 */
export const entities: GeneratedEntity[] = [];

const MAX_ENTITY_CREATION_ATTEMPTS = 1000;
const MAP_EDGE_BUFFER_DISTANCE = 400;

/**
 * Based on these chances, create an algorithm that creates a random number and weighs it against these chances for each type, then decide.
 */
const entityTypeChances = {
    'Town': 1,
    'Landmark': 0.3,
    'Shop': 0.1,
    'Terrain Feature': 0.6,
    // 'Camp': 0.25
}

/**
 * Used to store where the destructables will be created.
 */
let destructableTasks: any[] =  [];

/**
 * 
 */
let farmLandSpawnPoints: any[] = [];

/**
 * Perhaps instead of always creating a town, we should randomly decide what to create, like landmarks, etc.
 * 
 * @todo modify the execution order of creation - Should be
 * 1: terrain deformations
 * 2: destructables
 * 3: units
 */
export function generateWorld(){

    let clearFogState = new FogModifier(Players[0], FOG_OF_WAR_VISIBLE, 0,0, 25000, true, true);
    clearFogState.start();

    /**
     * May implement this in the future to prevent further entity creation or attempts
     */
    let terminateEntityCreation = false;

    /**
     * @One Handling the creation of all spawn points for destructables and entities
     */

    //Create an finite amount of entities - add break condition if attempts get to high
    for (let x = 0; x < ENTITY_COUNT; x++) {

        if(terminateEntityCreation) break;

        //Start a timer to spread the creation of entities over time
        let t = new Timer().start(1, false,() => {

            //Check every point in the array, if none of them make the new point invalid then add the point
            //Otherwise repeat the cycle

            let validPoint = true;
            
            let entity:GeneratedEntity = generateEntityType() as GeneratedEntity;
            
            let breakpointAttempts = 0;

            do{
                //sets ability tooltip
                // BlzSetAbilityIcon
                

                /**
                 * Exit the loop once you have exceeded the max attempts to find a point to spawn the entity 
                 */
                if(breakpointAttempts >= MAX_ENTITY_CREATION_ATTEMPTS){
                    break;
                }

                //Reset to true after a full loop
                validPoint = true;

                //Compare the new point against all other points
                for (let x = 0; x < entities.length; x++) {
                    //set to entity and then use the entity tile bound radius for the next condition.
                    const pointToTest = entities[x].origin;
                    //Add condition to not select point if the comparison entity point is breaking it's boundary range 

                    /**
                     * Checking the generated entity point against all other entity points to ensure that the new entity spawn is not breaking its own max tile boundary. 
                     * This prevents spawning an entity on top of or close to another entity outside the boundaries set.
                     */
                    if((pointToTest.x - entity.origin.x)*(pointToTest.x - entity.origin.x) + (pointToTest.y - entity.origin.y)*(pointToTest.y - entity.origin.y)  < (TILE_WIDTH*entity.tileBoundRadius)*(TILE_WIDTH*entity.tileBoundRadius)){
                        // entity.origin = new Point(Math.cos(180*Math.random())*(GetCameraBoundMaxX() - MAP_EDGE_BUFFER_DISTANCE), Math.cos(180*Math.random())*(GetCameraBoundMaxY() -MAP_EDGE_BUFFER_DISTANCE));
                        
                        //Reassign a new point for the entity and try to place it again.
                        entity.origin = getRandomPointInMap();
                        
                        validPoint = false;
                        break;
                    }
                }

                breakpointAttempts++;
            
            /**
             * Exit the loop only when you have  found a point that does not conflict with the boundaries set by the generated entity.
             * Exit loop if the attempts to find a new point is not successful after a specified amount of attempts.
             */
            } while (!validPoint && breakpointAttempts < MAX_ENTITY_CREATION_ATTEMPTS);

            /**
             * If you have exceeded the max attempts to create the entity, then do not attempt to create any more entities.
             * This only stops the timer for the current entity
             */
            if(breakpointAttempts >= MAX_ENTITY_CREATION_ATTEMPTS){
                t.destroy();
                print(`Unable to find a valid location for entity ${entity.type}`);
                // print("Unable to created entity number: ", x);

                /**
                 * @test Marks where entities failed to be created
                 */
                // let d = new Destructable(DESTRUCTABLE_ID.attemptedOriginSpawn, entity.origin.x, entity.origin.y, 1000, 0, 1, 0);

                return;                
            }

            //If the entity is successful in being created, then you may add it to the array of entities
            entities.push(entity);

            /**
             * @test Marks where entities successfully are created
             */
            // let d = new Destructable(DESTRUCTABLE_ID.originSpawn, entity.origin.x, entity.origin.y, 1000, 0, 1, 0);

            t.destroy();
        });
    }

    let tInfoTimer = new Timer().start(2, false, () => {

        print("Creating hills...");
        tInfoTimer.destroy();
    })


    

    /**
     * @Two Handling terrain deformations
     */

    //Terrain deformations need to occur where the destructables spawn, in order to look decent, however we to determine the entities destructable locations before creating them and use those points to make the terrain deformations
    let terrainDeformTimer = new Timer().start(5, false, () => {
        
        /**
         * We are creating the points where destructables will spawn for each entity
         * We are also doing our terrain deformations before the destructables will be spawned. 
         */
        entities.forEach(entity => {
            /**
             * Based on the destructable set, using the entity origin, we create a point cluster for each cluster count in the config
             * Then we create a terrain deformation at an arbitrary point in the set of the cluster origin
             * Then we store the point and the modified destructable config which will then be used when generating destructables.
             */
            destructableSets[`${entity.type}`][entity.destructableSetId].forEach((destructableConfig: DestructableConfig) => {
                destructableConfig.clusterConfig.originLoc = entity.origin;
                
                //Create points for each cluster count for the config
                for (let x = 0; x < destructableConfig.pointClusterCount; x++) {
                
                    let points = createPointCluster_Simple(destructableConfig.clusterConfig);
    
                    //The point we chose doesn't really matter, it is just a random point made around the cluster origin
                    TerrainDeformCrater(points[0].x, points[0].y, 400, -(100 + Math.random()*150), 5, true);
    
                    points.forEach(point => {
                        //Start a timer to get accurate unit z location after terrain deformations
                        let t = new Timer().start(1,false, () => {
                            //Since ill be iterating over the same destructable config in the same order, then I don't need to store teh config
                            destructableTasks.push({point, config: destructableConfig});
                        });
                    });
                }

            });

        });
        terrainDeformTimer.destroy();
    });

    /**
     * @Three Handling destructables
     */
    let dPrepTimer = new Timer().start(7, false, () => {
        print("Creating Destructables and Doodads and Units... prepare for some lag!");
        dPrepTimer.destroy();
    })

    let destructableTimer = new Timer().start(10, false, () => {

        //We are creating destructables at the predefined points now
        destructableTasks.forEach((data: {point: Point, config: DestructableConfig}) => {
            //May add timer here if I want to create destructables over time instead of instantly
            let randomVariation = Math.floor(Math.random()*data.config.destructableVariations);

            let d = new Destructable(data.config.destructableCode, data.point.x, data.point.y, GetLocationZ(Location(data.point.x, data.point.y)), 0, 1, randomVariation);
            d.setAnim('birth');

            //For the trees
            // if(data.config.destructableCode === DESTRUCTABLE_ID.summerTree){
            // }
            SetTerrainType(data.point.x, data.point.y, TERRAIN_CODE.darkGrass, 0, 2, 0);

        });

        entities.forEach(entity => {
            createEntity(entity);
        });

        /**
         * @step Assigning towns to players
         */
        getUsersPlaying().forEach((player, index) =>{
            let t = townsCreated[index];

            t.setOwner(player, true);

            // t.addItemById(START_ITEM_IDS.eternalTango);
            // t.addItemById(START_ITEM_IDS.ringOfDivinity);
            // t.addItemById(START_ITEM_IDS.staffOfWildGrowth);

            let u = new Unit(player, UNIT_IDS.heraldOfTheArcane, t.x, t.y, 0,0);
            u.setHeroLevel(10, false);
            //Paladin on crack
            // SetUnitTimeScale(u.handle, 100);
            // u.name = "Crackhead"

            u.addItemById(ITEM_ID.eternalTango);
            
            PanCameraToForPlayer(player.handle, t.x, t.y);
        });

        destructableTimer.destroy();
    });

    let dCompletedInfoTimer = new Timer().start(15, false, () => {
        print("Number of entities: ", entities.length);
        print("Number of destructables and doodads: ", destructableTasks.length);
        
        dCompletedInfoTimer.destroy();
    });

    /**
     * @step Creating farm lands.
     */
    let farmlandSpawnTimer = new Timer().start(16, false, () => {
        print("Farm land created.");
        print(`Number of farmland spawns: ${farmLandSpawnPoints.length}`);

        farmLandSpawnPoints.forEach(data => {
            SetTerrainType(data.point.x, data.point.y, data.config.terrainCode, 0 , data.config.tileArea ?? 1, 0);
            checkDestructablesInRegion(data.point, 600, true);
            // new Destructable(DESTRUCTABLE_ID.originSpawn, data.point.x, data.point.y, 1000, 0, 1, 0);
        });

        clearFogState.destroy();
        farmlandSpawnTimer.destroy();
    });

}

/**
 * Generates a random entity type. 
 * 
 * When entities are created they chose from a set of valid tilesets and destructable sets from a pool available to their own entity type.
 * Ex: 'Town' type has unique sets of tiles and destructables only available for the 'Town'  entity type 
 */
function generateEntityType():GeneratedEntity | null {
    // let randomChoiceNumber = (Math.random());

    //Get max value in object
    //We must now pick a number that has an upper bound equal to the max value in the object.
    let randomChoiceNumber = (Math.random());

    let _entity = null;
    let entityOriginPoint = getRandomPointInMap();

    /**
     * @todo maybe make it so that the destructable and tile set id's are able to choose sets that are outside of the entity type, for the scenario where I like the sets from another entity type but the only way to use those sets would be to
     * duplicate them into the current entity type's set, which goes against DRY 
     */
    if(randomChoiceNumber < entityTypeChances.Town){
        _entity = {
            origin: entityOriginPoint,
            type: 'Town',
            tileBoundRadius: 18,
            tileSetId: Math.floor(Math.random()*Object.keys(tileSets['Town']).length),
            treeSetId: 0,
            destructableSetId: 0
        } 
    }

    if(randomChoiceNumber < entityTypeChances['Terrain Feature']){
        _entity = {
            origin: entityOriginPoint,
            type: 'Terrain Feature',
            tileBoundRadius: 30,
            tileSetId: Math.floor(Math.random()*Object.keys(tileSets['Terrain Feature']).length),
            treeSetId: 0,
            destructableSetId: 0
        } 
    }
    
    if(randomChoiceNumber < entityTypeChances.Landmark){
        _entity = {
            origin: entityOriginPoint,
            type: 'Landmark',
            tileBoundRadius: 5,
            tileSetId: Math.floor(Math.random()*Object.keys(tileSets['Landmark']).length),
            treeSetId: 0,
            destructableSetId: 0
        } 
    }
    
    if(randomChoiceNumber < entityTypeChances.Shop){
        _entity = {
            origin: entityOriginPoint,
            type: 'Shop',
            tileBoundRadius: 3,
            tileSetId: Math.floor(Math.random()*Object.keys(tileSets['Shop']).length),
            treeSetId: 0,
            destructableSetId: 0
        } 
    }

    if(!_entity) print("Entity was not generated!");

    return _entity as GeneratedEntity;
}

function createEntity(entity: GeneratedEntity){
    let createdEntity = null;

    switch (entity.type) {
        case 'Town':
            // createdEntity = new Unit(Players[9], chooseRandomEnumValue(TOWN_UIDS), entity.origin.x, entity.origin.y, Math.random()*360);
            createdEntity = new Unit(Players[9], TOWN_UIDS.townHall, entity.origin.x, entity.origin.y, Math.random()*360);
            createdEntity.name = generateRandomName(entity.type);
            
            townsCreated.push(createdEntity);
            
            //Add something to the town. 

            // for (let x = 0; x < 2; x++) {
            //     new Unit(Players[9], UNIT_IDS.footman, (entity.origin.x + 300 - 100*x), (entity.origin.y + 300 + 100*x), 0)
            //     new Unit(Players[9], UNIT_IDS.rifleman, (entity.origin.x - 300 + 100*x), (entity.origin.y - 300 - 100*x), 0)
            // }

            break;
        case 'Landmark':
            createdEntity = new Unit(Players[9], chooseRandomEnumValue(LANDMARK_IDS), entity.origin.x, entity.origin.y, -90);
            createdEntity.name = generateRandomName(entity.type);
        print("Landmark created!");
            break;
        case 'Shop':
            //player 25 = neutral
            createdEntity = new Unit(Players[25], chooseRandomEnumValue(SHOP_UIDS), entity.origin.x, entity.origin.y, Math.random()*360);
            createdEntity.name = generateRandomName(entity.type);

            CreateMinimapIcon(entity.origin.x, entity.origin.y, 255, 255, 255, MINIMAP_ICONS.neutralBuilding , FOG_OF_WAR_FOGGED);
            
            break;
        default:
            break;
    }
    
    //Create tiles from each tile config; String interpolation
    tileSets[`${entity.type}`][entity.tileSetId].forEach((tileConfig: TileConfig) => {
        //Give the origin for the tileset creation
        tileConfig.clusterConfig.originLoc = entity.origin;
        
        for (let x = 0; x < tileConfig.pointClusterCount; x++) {
            let points = createPointCluster_Simple(tileConfig.clusterConfig);

            points.forEach(point => {
                //@ts-ignore
                let randomTileVariant = returnDiminishingChoice(TERRAIN_VARIANCES[tileConfig.terrainCode]);

                //Save the crop tile position.
                if(tileConfig.terrainCode === TERRAIN_CODE.crops) farmLandSpawnPoints.push({point, config: tileConfig}); 

                SetTerrainType(point.x, point.y, tileConfig.terrainCode, randomTileVariant , tileConfig.tileArea ?? 1, 0);
            });   
        }
    });
}

function createDestructableCluster(config: DestructableConfig){

    let points = createPointCluster_Simple(config.clusterConfig);

    // TerrainDeformCrater(points[0].x, points[0].y, 400, -(100 + Math.random()*150), 5, true);

    points.forEach(point => {
        //Start a timer to get accurate unit z location after terrain deformations
        let t = new Timer().start(1,false, () => {

            let randomVariation = Math.floor(Math.random()*config.destructableVariations);

            let d = new Destructable(config.destructableCode, point.x, point.y, GetLocationZ(Location(point.x, point.y)), 0, 1, randomVariation);
            
            
            d.setAnim('birth');
            t.destroy();
        });

        // SetTerrainType(point.x, point.y, TERRAIN_CODE.darkGrass, 0, 2, 0);
    });
}

/**
 * costly algorithm - use wisely
 * @param numberOfChoices 
 * @returns 
 */
function returnDiminishingChoice(numberOfChoices: number){
    if(numberOfChoices < 3) return 0;

    //The greatest the chance will be for a number item to be picked
    let maximumSuccessChance = 0.75*numberOfChoices; 

    for (let x = 0; x < numberOfChoices; x++) {
        // The selected range keeps getting smaller as you reach the higher variance numbers which means its harder for those numbers to get chosen
        let selectedRange = maximumSuccessChance/(x + 1);

        //Random number [0, numberOfChoices], inclusive
        //Recalculate the random number every loop so there is a chance for other variants to be chosen
        let randNumber = Math.random()*numberOfChoices;
            
        if(randNumber < selectedRange){
            // print("Selected variant: ", x);
            // print("Selection range: ", selectedRange);
            // print("Max success chance: ", maximumSuccessChance);
            // print("The random number chosen: ", randNumber);
            
            return x;
        }
        
    }

    //Always return 0 so there is always a variant number returned back
    return 0;

    //0 -> 18 number has to be less than 18
    //1 -> 9 number has to be less than 9
    //2 -> 6 number has to be less than 6
    //3 -> 4.5 number has to be less than 4.5
    //4 -> 3.6 number has to be less than 3.6
    //17 -> 1.05 number has to be less than 1.05
    //Goal
    
    //The closer to 0 the greater the chance of selection
    // 13.75 75% chance for the first tile variant to be picked
    // 1/n^2
    //If number is 0 then pick a number from this large range for it to be chosen
    //If number is 5 then pick a random number in this smaller range for it to be chosen
    //If its not chosen then find the number above it and try to pick that number, continue process until 0 is reached.

    //Make the lower numbered variants more common, and others less common , otherwise it looks fucking weird in game. 
    // 75% change
    //Distribute the chance over 18 variants, 
    //variant number
    /**
     * variant number n = 0
     * selection chance is 100% - 1/(n + 1) 25% total chance
     * as n increases, the chance for selection decreases
     * 
     * We have to return a number from the set of choices, so how does the random number translate to the available choice numbers?
     */
}