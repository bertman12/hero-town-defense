// import { Unit } from "w3ts/handles/unit";
// /**
//  * 
// sUsing Unit Arrays instead of groups
// https://discord.com/channels/178569180625240064/311662737015046144/1063424868181360710


// Night 🥗  Salad — Today at 3:50 AM
//     Use normal arrays let array: Unit[] = [...]
//     No need to use groups anymore. The unit group enums like units in range or units owned by player and those stuff can be replaced by typescript functions that do thee same thing but return unit arrays, so you basically never use groups yourself
//     Thread
//     Use normal arrays `let array Unit `
// MindWorX — Today at 3:53 AM
//     If you're using TypeScript To Lua, you should be using Set<Unit>
//     Unless you need it ordered.

//  */

// export namespace UnitArrays {
//     let _enumGroupToUse: group;

//     function enumGroupToUse() {
//         if (!_enumGroupToUse) _enumGroupToUse = CreateGroup();
//         return _enumGroupToUse;
//     }

//     export function ArrayUnitsInRange(x: number, y: number, radius: number, filter?: (filterUnit: unit) => boolean) {
//         let array: Unit[] | null[] | undefined[] = [];
//         let filterEnum = Filter(() => {
//             if (filter == null || filter(GetFilterUnit()))
//                 array.push(Unit.fromHandle(GetFilterUnit()));
//             return false;
//         });
//         GroupEnumUnitsInRange(enumGroupToUse(), x, y, radius, filterEnum);
//         DestroyFilter(filterEnum);
//         return array;
//     }
    
//     export function ArrayUnitsInRect(region: rect, filter?: (filterUnit: unit) => boolean) {
//         let array: Unit[] = [];
//         let filterEnum = Filter(() => {
//             if (filter == null || filter(GetFilterUnit()))
//                 array.push(Unit.fromHandle(GetFilterUnit()));
//             return false;
//         });
//         GroupEnumUnitsInRect(enumGroupToUse(), region, filterEnum);
//         DestroyFilter(filterEnum);
//         return array;
//     }

//     export function ArrayUnitsOfPlayer(p: player, filter?: (filterUnit: unit) => boolean) {
//         let array: Unit[] = [];
//         let filterEnum = Filter(() => {
//             if (filter == null || filter(GetFilterUnit()))
//                 array.push(Unit.fromHandle(GetFilterUnit()));
//             return false;
//         });
//         GroupEnumUnitsOfPlayer(enumGroupToUse(), p, filterEnum);
//         DestroyFilter(filterEnum);
//         return array;
//     }
// }