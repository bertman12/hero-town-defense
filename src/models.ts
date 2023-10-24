import { Point } from "w3ts";
import { UNIT_IDS, BUILDING_IDS, DESTRUCTABLE_ID, TERRAIN_CODE, CUSTOM_UID } from "./enums";

/**
 * The data model most other procedural interfaces are predicated on.
 */
export interface PointClusterConfig {
    /**
     * Points are created relative to the origin point
     */
    originLoc: Point, 
    /**
     * Min distance where points cannot be created
     */
    minTileDistanceFromOrigin: number, 
    /**
     * Max distance where points can be created from the origin point
     */
    maxTileDistanceFromOrigin: number, 
    /**
     * Number of points to be created
     */
    numberOfPoints: number,
    /**
     * Controls how far away from the cluster's origin each point will be able to spawn 
     */
    maxTileDistanceFromClusterOrigin?: number
}

export type EntityType  = 'Town' | 'Landmark' | 'Boss' | 'Unit' | 'Camp' | 'Shop' | 'Terrain Feature';



export interface GeneratedEntity {
    /**
     * Controls what kind of will be created.
     */
    type: EntityType
    /**
     * The boundary which defines where no other entity can be created
     * Perhaps should be calculated based on the point cluster config used to create the entity, it would make sense anyways
     */
    tileBoundRadius: number,
    /**
     * Spawning location for entity
     */
    origin: Point,
    /**
     * Defines a specific tile set to use for this entity. Tilesets possible are restricted by the entity type.
     */
    tileSetId: number,
    /**
     * @deprecated Controls what trees spawn around the entity
     */
    treeSetId: number,
    /**
     * Decides what destructables will spawn around the entity
     */
    destructableSetId: number
}

export interface TileSetType{
    terrainCodes: number[],
}

export interface TileConfig {
    /**
     * Id number that associates with this tile configuration
     */
    tileConfigId: number,
    /**
     * Tile terrain code
     */
    terrainCode: number,
    /**
     * Different style for tile
     */
    tileVariations?: number,
    /**
     * Describes area the tile spawns in and the number of spawn points
     */
    clusterConfig: PointClusterConfig,
    /**
     * The number of time this tile cluster will be created
     */
    pointClusterCount: number,
    /**
     * Options, default is 1
     */
    tileArea?: number

}

export interface DestructableConfig {
    /**
     * Id number that associates with this destructable configuration
     */
    destructableConfigId: number,
    /**
     * Destructable code
     */
    destructableCode: number,
    /**
     * Used for selecting a random and valid variation number for the destructable so they do not all look the same 
     */
    destructableVariations: number,
    /**
     * Different style for tile
     */
    destructableScale?: number,
    /**
     * Describes area the destructable spawns in and the number of spawn points
     */
    clusterConfig: PointClusterConfig,
    /**
     * The number of clusters to be created
     */
    pointClusterCount: number,
}


export interface UnitConfig {
    unitConfigId: number,
    unitCode: number,
    clusterConfig: PointClusterConfig,
    pointClusterCount: number
}
