let config = {
    numberOfPoints: 10,
    minTileDistanceFromOrigin: 5,
    maxTileDistanceTiles: 10,
    originLoc: {
        x: 7150,
        y: -2150
    }
}

createPointCluster_Simple(config);


function createPointCluster_Simple(options){
//Only create trees within the tile range of the origin.
let {originLoc, minTileDistanceFromOrigin: minDistanceTiles, maxTileDistanceTiles: maxDistanceTiles, numberOfPoints: amount} = options;

const TILE_WIDTH = 130;

//The furthest a tree will spawn from the center of the cluster origin.
const maxDistanceFromClusterOrigin = TILE_WIDTH*3;

//Can be positive(right) or negative(left)
let xDirection = Math.cos(Math.random()*180);
let yDirection = Math.cos(Math.random()*180);

//Only allow the direction for be positive or negative 1
if(xDirection > 0) xDirection = 1;
if(xDirection <= 0) xDirection = -1;

if(yDirection > 0) yDirection = 1;
if(yDirection <= 0) yDirection = -1;

console.log()

const clusterOrigin = {
    x: originLoc.x + xDirection*minDistanceTiles*TILE_WIDTH + xDirection*maxDistanceTiles*TILE_WIDTH*Math.random(),
    y: originLoc.y + yDirection*minDistanceTiles*TILE_WIDTH + yDirection*maxDistanceTiles*TILE_WIDTH*Math.random()
}

//Start at the cluster origin, 
//If consumed region is empty then one tree at origin is created
//Otherwise check the selected origin to see if its in range of any consumed regions
//Search until selected tree point is not consumed already

let validPoints = [];

//Creates valid spawn points for an entity, given the set constraints from the options
for (let x = 0; x < amount; x++) {
    // [-1, 1]
    let entity_XDir = Math.cos(Math.random()*180);
    // [-1, 1]
    let entity_YDir = Math.cos(Math.random()*180);
    
    if(entity_XDir > 0) entity_XDir = 1;
    if(entity_XDir <= 0) entity_XDir = -1;

    if(entity_YDir > 0) entity_YDir = 1;
    if(entity_YDir <= 0) entity_YDir = -1;

    //A range of 0 -> maxDistanceFromClusterOrigin 
    
    //Location of tree
    //Since this can be in the opposite direction of the cluster origin x direction that means that trees might get placed towards the origin location, which would mean trees spawn on the town hall 
    //To fix this put a check in to ensure the value is not within the minimum range from the origin.

    //[clusterOrigin.x - maxDistanceFromClusterOrigin, clusterOrigin.x + maxDistanceFromClusterOrigin]
    let entity_X = entity_XDir*Math.random()*maxDistanceFromClusterOrigin + clusterOrigin.x;

    //Difference between the 2 values
    // x - y < min

    //x2 + y2 = c2
    //

    //Infinite loop when the distance from entityX and origin x is less than the min distance tiles
    //Needs to be recalculated
    let xAttempt = 0;

    //Whilst the absolute value of X is within the exclusion region of the origin, as specified by the min distance tiles parameter, change locX
    while (Math.abs(entity_X - originLoc.x) < minDistanceTiles*TILE_WIDTH || xAttempt >= 10) {
        //Recalculate the X direction in the scenario where the cluster origin x is right in the boundary of the min distance
        entity_XDir = Math.cos(Math.random()*180);
        if(entity_XDir > 0) entity_XDir = 1;
        if(entity_XDir <= 0) entity_XDir = -1;

        entity_X = entity_XDir*Math.random()*maxDistanceFromClusterOrigin + clusterOrigin.x;

        xAttempt++;

        let node = document.createElement('p');
        node.innerText = `X-Pos: ${entity_X}; Min X Dist: ${minDistanceTiles*TILE_WIDTH} ; AbsValue: ${Math.abs(entity_X - originLoc.x)}`
        document.getElementById('x-table').append(node);

        if(Math.abs(entity_X - originLoc.x) < minDistanceTiles*TILE_WIDTH){
            node.setAttribute('style', 'outline: 1px solid red;')
        }

        if(xAttempt === 10){
            console.log("Final X attempt comparison value: ", Math.abs(entity_X - originLoc.x) < minDistanceTiles*TILE_WIDTH); 
            break;
        }
        
    }

    // negative negative -> positive <
    
    // while (Math.sqrt((originLoc.x*originLoc.x) + (entity_X*entity_X)) < minDistanceTiles*TILE_WIDTH) {
    //     entity_X = entity_XDir*Math.random()*maxDistanceFromClusterOrigin + clusterOrigin.x
    // }

    let entity_Y = entity_YDir*Math.random()*maxDistanceFromClusterOrigin + clusterOrigin.y

    let yAttempt = 0;
    
    while (Math.abs(entity_Y - originLoc.y) < minDistanceTiles*TILE_WIDTH || yAttempt >= 10) {
        entity_YDir = Math.cos(Math.random()*180);
        if(entity_YDir > 0) entity_YDir = 1;
        if(entity_YDir <= 0) entity_YDir = -1;

        entity_Y = entity_YDir*Math.random()*maxDistanceFromClusterOrigin + clusterOrigin.y;
        yAttempt++;
        
        let node = document.createElement('p');
        node.innerText = `Y-Pos: ${entity_Y}; Min Y Dist: ${minDistanceTiles*TILE_WIDTH}; AbsValue: ${Math.abs(entity_Y - originLoc.y)}`
        document.getElementById('y-table').append(node);

        if(Math.abs(entity_Y - originLoc.y) < minDistanceTiles*TILE_WIDTH){
            node.setAttribute('style', 'outline: 1px solid red;')
        }

        if(yAttempt === 10){
            console.log("Final Y attempt comparison value: ", Math.abs(entity_Y - originLoc.y) < minDistanceTiles*TILE_WIDTH); 
            break;
        }
    }

    // while (Math.sqrt((originLoc.y*originLoc.y) + (entity_Y*entity_Y)) < minDistanceTiles*TILE_WIDTH) {
    //     entity_Y = entity_YDir*Math.random()*maxDistanceFromClusterOrigin + clusterOrigin.y
    // }
    
    // validPoints.push(new Point(entity_X, entity_Y));
}

return validPoints;
}