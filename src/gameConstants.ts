import { DestructableConfig, TileConfig } from './models';
import { Point } from "w3ts";
import { DESTRUCTABLE_ID, TERRAIN_CODE } from "./enums";

const DEFAULT_ORIGIN = new Point(0,0);

/**
 * Size in units of attack range
 */
export const TILE_WIDTH = 130;

/**
 * The number of entities to be spawned at game creation time
 */
export const ENTITY_COUNT = 150;

export const destructableTypes = { 
    flower: {
        code: FourCC('B000'),
        variations: 5,
    },
    rock: {
        code: FourCC('B004'),
        variations: 10
    },
    summerTree: {
        code: FourCC('LTlt'),
        variations: 10
    },
    shrubs: {
        code: DESTRUCTABLE_ID.shrubs,
        variations: 3
    }
}

const basicShrubConfig: DestructableConfig = {
    destructableConfigId: 0,
    destructableCode: destructableTypes.shrubs.code,
    destructableVariations: destructableTypes.shrubs.variations,
    destructableScale: 1,
    clusterConfig : {
        numberOfPoints: 5,
        minTileDistanceFromOrigin: 2,
        maxTileDistanceFromOrigin: 6,
        originLoc: DEFAULT_ORIGIN
    },
    pointClusterCount: 3,
}

const townCropConfig_singleSpawn: TileConfig = {
    tileConfigId: 0,
    terrainCode: TERRAIN_CODE.crops,
    tileVariations: 0,
    clusterConfig: {
        minTileDistanceFromOrigin: 3,
        maxTileDistanceFromOrigin: 3,
        numberOfPoints: 1,
        originLoc: DEFAULT_ORIGIN
    },
    //The number of time this tile cluster will be created
    pointClusterCount: 1,
    tileArea: 2
}

/**
 * Tile sets describe what tile will be used as well as quantity and distance from a point
 * 
 * Contains all tile sets for each entity type and the variation of sets for those entity types.
 */
export const tileSets:{[key:string]:{[key:string]: TileConfig[]}} = {
    //Tile set type
    Town: {
        //Tile set variation
        0: [
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grass,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 30,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grass,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 5,
                    maxTileDistanceFromOrigin:15,
                    numberOfPoints: 30,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 10
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.roughDirt,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grassyDirt,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.stonePath,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 0,
                    maxTileDistanceFromOrigin:2,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            townCropConfig_singleSpawn,
        ],
        //Tile set variation
        1: [
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grass,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 30,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grass,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 5,
                    maxTileDistanceFromOrigin:15,
                    numberOfPoints: 30,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 10
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.roughDirt,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 4
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grassyDirt,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            townCropConfig_singleSpawn,
        ],
        //Tile set variation
        2: [
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grass,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 30,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grass,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 5,
                    maxTileDistanceFromOrigin:15,
                    numberOfPoints: 30,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 10
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.roughDirt,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 4
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grassyDirt,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            townCropConfig_singleSpawn,
        ],
        3: [
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grass,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 30,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grass,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 5,
                    maxTileDistanceFromOrigin:15,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 10
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.roughDirt,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grassyDirt,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.stonePath,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 0,
                    maxTileDistanceFromOrigin:2,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            townCropConfig_singleSpawn,
        ],
    },

    Landmark: {
        //Tile set variation
        0: [
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grass,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.cobblePath,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 0,
                    maxTileDistanceFromOrigin:2,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 2
            }
        ],
        //Tile set variation
        1: [
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grass,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.roughDirt,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 0,
                    maxTileDistanceFromOrigin:2,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 2
            }
        ],
        //Tile set variation
        2: [
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grass,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            
        ],
    },
    'Terrain Feature' : {
        0: [
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grass,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 0,
                    maxTileDistanceFromOrigin:26,
                    numberOfPoints: 50,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 150,
                tileArea: 1
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.darkGrass,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 0,
                    maxTileDistanceFromOrigin:26,
                    numberOfPoints: 30,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 25,
                tileArea: 1
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grassyDirt,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 0,
                    maxTileDistanceFromOrigin:26,
                    numberOfPoints: 15,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 10
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.roughDirt,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 0,
                    maxTileDistanceFromOrigin:26,
                    numberOfPoints: 15,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 10
            },
        ]
    },
    Shop: {
        0: [
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grass,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.cobblePath,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 0,
                    maxTileDistanceFromOrigin:2,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 2
            }
        ],
        //Tile set variation
        1: [
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grass,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.roughDirt,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 0,
                    maxTileDistanceFromOrigin:2,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 2
            }
        ],
        //Tile set variation
        2: [
            {
                tileConfigId: 0,
                terrainCode: TERRAIN_CODE.grass,
                tileVariations: 0,
                clusterConfig: {
                    minTileDistanceFromOrigin: 1,
                    maxTileDistanceFromOrigin:5,
                    numberOfPoints: 20,
                    originLoc: DEFAULT_ORIGIN
                },
                //The number of time this tile cluster will be created
                pointClusterCount: 3
            },
            
        ],
    }
}

/**
 * Contains all destructable sets for each entity type and the variation of sets for those entity types.
 * 
 */
export const destructableSets:{[key:string]:{[key:string]: DestructableConfig[]}} = {
    Town: {
        0: [
            {
                destructableConfigId: 0,
                destructableCode: destructableTypes.summerTree.code,
                destructableVariations: destructableTypes.summerTree.variations,
                destructableScale: 1,
                clusterConfig : {
                    numberOfPoints: 10,
                    minTileDistanceFromOrigin: 5,
                    maxTileDistanceFromOrigin: 10,
                    originLoc: DEFAULT_ORIGIN
                },
                pointClusterCount: 5,
            },
            {
                destructableConfigId: 0,
                destructableCode: destructableTypes.flower.code,
                destructableVariations: destructableTypes.flower.variations,
                destructableScale: 1,
                clusterConfig : {
                    numberOfPoints: 3,
                    minTileDistanceFromOrigin: 0,
                    maxTileDistanceFromOrigin: 10,
                    originLoc: DEFAULT_ORIGIN
                },
                pointClusterCount: 2,
            },
            basicShrubConfig
        ]
    },
    Landmark: {
        0: [
            {
                destructableConfigId: 0,
                destructableCode: destructableTypes.summerTree.code,
                destructableVariations: destructableTypes.summerTree.variations,
                destructableScale: 1,
                clusterConfig : {
                    numberOfPoints: 10,
                    minTileDistanceFromOrigin: 5,
                    maxTileDistanceFromOrigin: 10,
                    originLoc: DEFAULT_ORIGIN
                },
                pointClusterCount: 5,
            },
            {
                destructableConfigId: 0,
                destructableCode: destructableTypes.flower.code,
                destructableVariations: destructableTypes.flower.variations,
                destructableScale: 1,
                clusterConfig : {
                    numberOfPoints: 3,
                    minTileDistanceFromOrigin: 0,
                    maxTileDistanceFromOrigin: 10,
                    originLoc: DEFAULT_ORIGIN
                },
                pointClusterCount: 2,
            },
            basicShrubConfig
        ]
    },
    'Terrain Feature': {
        0: [
            {
                destructableConfigId: 0,
                destructableCode: destructableTypes.summerTree.code,
                destructableVariations: destructableTypes.summerTree.variations,
                destructableScale: 1,
                clusterConfig : {
                    numberOfPoints: 10,
                    minTileDistanceFromOrigin: 5,
                    maxTileDistanceFromOrigin: 10,
                    originLoc: DEFAULT_ORIGIN
                },
                pointClusterCount: 5,
            },
            {
                destructableConfigId: 0,
                destructableCode: destructableTypes.summerTree.code,
                destructableVariations: destructableTypes.summerTree.variations,
                destructableScale: 1,
                clusterConfig : {
                    numberOfPoints: 10,
                    minTileDistanceFromOrigin: 0,
                    maxTileDistanceFromOrigin: 10,
                    originLoc: DEFAULT_ORIGIN
                },
                pointClusterCount: 11,
            },
            {
                destructableConfigId: 0,
                destructableCode: destructableTypes.rock.code,
                destructableVariations: destructableTypes.rock.variations,
                destructableScale: 1,
                clusterConfig : {
                    numberOfPoints: 2,
                    minTileDistanceFromOrigin: 0,
                    maxTileDistanceFromOrigin: 15,
                    originLoc: DEFAULT_ORIGIN,
                },
                pointClusterCount: 4,
            },
            {
                destructableConfigId: 0,
                destructableCode: destructableTypes.flower.code,
                destructableVariations: destructableTypes.flower.variations,
                destructableScale: 1,
                clusterConfig : {
                    numberOfPoints: 3,
                    minTileDistanceFromOrigin: 0,
                    maxTileDistanceFromOrigin: 10,
                    originLoc: DEFAULT_ORIGIN
                },
                pointClusterCount: 20,
            }
        ]
    },
    Shop: {
        0: [
            {
                destructableConfigId: 0,
                destructableCode: destructableTypes.summerTree.code,
                destructableVariations: destructableTypes.summerTree.variations,
                destructableScale: 1,
                clusterConfig : {
                    numberOfPoints: 5,
                    minTileDistanceFromOrigin: 3,
                    maxTileDistanceFromOrigin: 5,
                    originLoc: DEFAULT_ORIGIN
                },
                pointClusterCount: 2,
            },
            {
                destructableConfigId: 0,
                destructableCode: destructableTypes.flower.code,
                destructableVariations: destructableTypes.flower.variations,
                destructableScale: 1,
                clusterConfig : {
                    numberOfPoints: 3,
                    minTileDistanceFromOrigin: 0,
                    maxTileDistanceFromOrigin: 10,
                    originLoc: DEFAULT_ORIGIN
                },
                pointClusterCount: 1,
            }
        ]
    }
}

