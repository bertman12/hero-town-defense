import { TERRAIN_CODE, DESTRUCTABLE_ID } from '../enums';
import { PointClusterConfig } from '../models';
import { Destructable, Point } from 'w3ts';
import { TILE_WIDTH } from '../gameConstants';


/**
 * Finish the commented out portion of the code to check to see if an entity already exists in the position.
 * @param options 
 * @returns 
 */
function createPointCluster_Complex(options: PointClusterConfig){
    //Only create trees within the tile range of the origin.
    let {originLoc, minTileDistanceFromOrigin: minDistanceTiles, maxTileDistanceFromOrigin: maxDistanceTiles, numberOfPoints: amount} = options;

    let consumedRegions = [];

    //The furthest a tree will spawn from the center of the cluster origin.
    const maxDistanceFromClusterOrigin = TILE_WIDTH*3;

    //The closest one tree will be from one another
    const minNeighborDistance = 260;

    //Can be positive(right) or negative(left)
    let xDirection = Math.cos(Math.random()*180);
    let yDirection = Math.cos(Math.random()*180);
    
    const clusterOrigin = {
        x: originLoc.x + xDirection*minDistanceTiles*TILE_WIDTH + xDirection*maxDistanceTiles*TILE_WIDTH*Math.random(),
        y: originLoc.y + yDirection*minDistanceTiles*TILE_WIDTH + yDirection*maxDistanceTiles*TILE_WIDTH*Math.random()
    }
    
    print(`Cluster origin x: ${clusterOrigin.x}; Cluster origin y: ${clusterOrigin.y}`)
    
    //Start at the cluster origin, 
    //If consumed region is empty then one tree at origin is created
    //Otherwise check the selected origin to see if its in range of any consumed regions
    //Search until selected tree point is not consumed already

    let validPoints:Point[] = [];

    //Creates valid spawn points for an entity, given the set constraints from the options
    for (let x = 0; x < amount; x++) {
        // [-1, 1]
        let entity_XDir = Math.cos(Math.random()*180);
        // [-1, 1]
        let entity_YDir = Math.cos(Math.random()*180);
        
        //A range of 0 -> maxDistanceFromClusterOrigin 
        
        //Location of tree
        //Since this can be in the opposite direction of the cluster origin x direction that means that trees might get placed towards the origin location, which would mean trees spawn on the town hall 
        //To fix this put a check in to ensure the value is not within the minimum range from the origin.

        //[clusterOrigin.x - maxDistanceFromClusterOrigin, clusterOrigin.x + maxDistanceFromClusterOrigin]
        let entity_X = entity_XDir*Math.random()*maxDistanceFromClusterOrigin + clusterOrigin.x

        
        //Whilst the absolute value of X is within the exclusion region of the origin, as specified by the min distance tiles parameter, change locX
        while (Math.sqrt((originLoc.x*originLoc.x) + (entity_X*entity_X)) < minDistanceTiles*TILE_WIDTH) {
            entity_X = entity_XDir*Math.random()*maxDistanceFromClusterOrigin + clusterOrigin.x
        }

        let entity_Y = entity_YDir*Math.random()*maxDistanceFromClusterOrigin + clusterOrigin.y

        while (Math.sqrt((originLoc.y*originLoc.y) + (entity_Y*entity_Y)) < minDistanceTiles*TILE_WIDTH) {
            entity_Y = entity_YDir*Math.random()*maxDistanceFromClusterOrigin + clusterOrigin.y
        }
        
        validPoints.push(new Point(entity_X, entity_Y));

        // switch (entityType) {
        //     case 'Destructable':
        //         new Destructable(entityFourCC, entity_X , entity_Y , 500, 0, 1, 0);
        //         break;
        //     case 'Unit':
        //         // new Unit()
        //         break;
        
        //     default:
        //         break;
        // }

        // SetTerrainType(entity_X, entity_Y, FourCC('DarkGrass'), 0, 1, 0);

        /**
         * This logic is supposed to check to see if a tree has already been spawned near the point. Doesn't work for now
         * Infinite loop
         */

        //Check if any tree has already been spawned yet

        // if(consumedRegions.length < 1){
        //     new Destructable(FourCC('LTlt'), clusterOrigin.x, clusterOrigin.y, 500, 0, 1, 0);
        //     //Add point to array.
        //     consumedRegions.push(new Point(clusterOrigin.x, clusterOrigin.y));
        //     print("Creating tree at cluster origin!")
        //     print(Math.abs(-5));
        // }
        // else{
        //     //Probably needs to be recursive.
        //     //Check if the new selected point is in range +-130units of the consumed point for x and y
        //     let validPointFound = false;
        //     let maxAttempts = 0;

        //     do {
        //         let validX = true;
        //         let validY = true;

        //         consumedRegions.forEach(point => {
        //             let distanceX = (locX*locX) - (point.x*point.x);
        //             // let distanceX = Math.pow(locX, 2) - Math.pow(point.x, 2);
        //             let distanceY = (locY*locY) - (point.y*point.y)
        //             // let distanceY = Math.pow(locY, 2) - Math.pow(point.y, 2);
    
        //             let attempts = 0;
    
        //             // Validate X Point
        //             do {
        //                 if(Math.abs(distanceX) <= minNeighborDistance){
        //                     //Choses a random distance from the cluster origin
        //                     locX = locXDir*Math.random()*maxDistanceFromClusterOrigin;
        //                     distanceX = (locX*locX) - (point.x*point.x);
        //                     validX = true;
        //                 }else{
        //                     //Exit
        //                     validX = false
        //                 }
                        
        //                 attempts++;
    
        //             } while (!validX && attempts < 100);

        //             //Validate Y point
        //             do {
        //                 if(Math.abs(distanceY) <= minNeighborDistance){
        //                     locY = locYDir*Math.random()*maxDistanceFromClusterOrigin;
        //                     distanceY = (locY*locY) - (point.y*point.y);
        //                     validY = true;
        //                 }else{
        //                     //Exit
        //                     validY = false
        //                 }
                        
        //                 attempts++;
    
        //             } while (!validY && attempts < 100);


        //         });

        //         if(validX && validY) validPointFound = true;
                
        //         maxAttempts++;

        //         if(maxAttempts >= 10) print("Max attempts reached");

        //     } while (!validPointFound && maxAttempts < 10);

        //     if(validPointFound){
        //         new Destructable(FourCC('LTlt'), locX, locY, 500, 0, 1, 0);
        //         consumedRegions.push(new Point(locX, locY));

        //         print("Found valid point!, making a tree now!");
        //     }
        // }
    }

    return validPoints;
}

export function createPointCluster_Simple(options: PointClusterConfig){
    //Only create trees within the tile range of the origin.
    let {originLoc, minTileDistanceFromOrigin: minDistanceTiles, maxTileDistanceFromOrigin: maxDistanceTiles, numberOfPoints: amount} = options;

    //The furthest a tree will spawn from the center of the cluster origin.
    const maxDistanceFromClusterOrigin = TILE_WIDTH*(options.maxTileDistanceFromClusterOrigin ? options.maxTileDistanceFromClusterOrigin : 3);

    let xDirection = getRandomDirection();
    let yDirection = getRandomDirection();
    
    const clusterOrigin = {
        x: originLoc.x + xDirection*minDistanceTiles*TILE_WIDTH*Math.random() + xDirection*maxDistanceTiles*TILE_WIDTH*Math.random(),
        y: originLoc.y + yDirection*minDistanceTiles*TILE_WIDTH*Math.random() + yDirection*maxDistanceTiles*TILE_WIDTH*Math.random()
    }

    while(((clusterOrigin.x - originLoc.x)*(clusterOrigin.x - originLoc.x) + (clusterOrigin.y - originLoc.y)*(clusterOrigin.y - originLoc.y) < (minDistanceTiles*TILE_WIDTH)*(minDistanceTiles*TILE_WIDTH))){
        // print("Redo cluster origin");
        xDirection = getRandomDirection();
        clusterOrigin.x = originLoc.x + xDirection*minDistanceTiles*TILE_WIDTH*Math.random() + xDirection*maxDistanceTiles*TILE_WIDTH*Math.random();
        yDirection = getRandomDirection();
        clusterOrigin.y = originLoc.y + yDirection*minDistanceTiles*TILE_WIDTH*Math.random() + yDirection*maxDistanceTiles*TILE_WIDTH*Math.random();
    }

    let validPoints = [];

    //Creates valid spawn points for an entity, given the set constraints from the options
    for (let x = 0; x < amount; x++) {
        // [-1, 1]
        let entity_XDir = getRandomDirection();
        // [-1, 1]
        let entity_YDir = getRandomDirection();
        
        let entity_X = entity_XDir*Math.random()*maxDistanceFromClusterOrigin + clusterOrigin.x;
        let entity_Y = entity_YDir*Math.random()*maxDistanceFromClusterOrigin + clusterOrigin.y;
        
        while(((entity_X - originLoc.x)*(entity_X - originLoc.x) + (entity_Y - originLoc.y)*(entity_Y - originLoc.y) < (minDistanceTiles*TILE_WIDTH)*(minDistanceTiles*TILE_WIDTH))){
            // print("Redo point loc");
            entity_XDir = getRandomDirection();
            entity_X = entity_XDir*Math.random()*maxDistanceFromClusterOrigin + clusterOrigin.x;
            entity_YDir = getRandomDirection();
            entity_Y = entity_YDir*Math.random()*maxDistanceFromClusterOrigin + clusterOrigin.y;
        }
        
        validPoints.push(new Point(entity_X, entity_Y));
    }
    
    return validPoints;
}

/**
 * Returns -1, or 1 , mostly 50/50 chance to get either number
 * @returns 
 */
export function getRandomDirection(){
    let value = Math.cos(Math.random()*180);

    if(value > 0) value = 1;
    if(value <= 0) value = -1;

    return value;
}

/**
 * 
 * @param bufferDistance Subtracted from the map edge
 * @returns 
 */
export function getRandomPointInMap(mapEdgeBuffer?: number){
    if(!mapEdgeBuffer) mapEdgeBuffer = 0;
    
    let absX = GetCameraBoundMaxX();
    let absY = GetCameraBoundMaxY();

    // GetCameraBoundMinX() + (2*GetCameraBoundMaxX()) * Math.random();

    // (2*GetCameraBoundMaxX())*Math.random() - GetCameraBoundMaxX();

    // GetCameraBoundMinX() + (GetCameraBoundMaxX() - GetCameraBoundMinX()) * Math.random();

    let x = (2*absX)*Math.random() - absX - mapEdgeBuffer;
    let y = (2*absY)*Math.random() - absY - mapEdgeBuffer;

    let p = new Point(x,y);
    
    // print(`Random point: X:${p.x} Y:${p.y}`)
    return p;
}






